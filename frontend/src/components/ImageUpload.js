import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { uploadImageFallback } from '../utils/uploadFallback';

const ImageUpload = ({ 
  onImageUpload, 
  currentImage, 
  placeholder = "Upload Image",
  folder = "general",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className = ""
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentImage);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('=== IMAGE UPLOAD DEBUG START ===');
    console.log('File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
    console.log('Storage object:', storage);
    console.log('Storage available:', !!storage);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      const errorMsg = 'Please select an image file (JPG, PNG, GIF)';
      console.log('Error:', errorMsg);
      setError(errorMsg);
      return;
    }

    // Validate file size - allow up to 5MB now with upgraded plan
    const maxSizeForUploads = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeForUploads) {
      const errorMsg = `File size must be less than 5MB`;
      console.log('Error:', errorMsg);
      setError(errorMsg);
      return;
    }

    setError(null);
    setUploading(true);
    console.log('Starting upload process...');

    try {
      console.log('Starting upload process...');
      
      // Compress image before upload for faster performance
      const compressedFile = await compressImage(file);
      console.log('Image compressed. Original size:', file.size, 'Compressed size:', compressedFile.size);

      // Check if Firebase Storage is initialized
      if (!storage) {
        console.log('Firebase Storage not available, using fallback...');
        const fallbackUrl = await uploadImageFallback(compressedFile, folder);
        onImageUpload(fallbackUrl);
        setPreview(fallbackUrl);
        return;
      }
      console.log('Image compressed. Original size:', file.size, 'Compressed size:', compressedFile.size);
      
      // Create preview
      const previewUrl = URL.createObjectURL(compressedFile);
      setPreview(previewUrl);

      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}_${compressedFile.name}`;
      const storageRef = ref(storage, `${folder}/${filename}`);
      
      console.log('Uploading to:', `${folder}/${filename}`);

      // Upload file with progress tracking
      const snapshot = await uploadBytes(storageRef, compressedFile);
      console.log('Upload successful, getting download URL...');
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Download URL obtained:', downloadURL);

      // Call parent component's callback
      onImageUpload(downloadURL);
      
      // Clean up preview URL
      URL.revokeObjectURL(previewUrl);
      setPreview(downloadURL);

    } catch (err) {
      console.error('Upload failed:', err);
      
      // Try fallback upload
      try {
        console.log('Trying fallback upload...');
        const compressedFile = await compressImage(file);
        const fallbackUrl = await uploadImageFallback(compressedFile, folder);
        onImageUpload(fallbackUrl);
        setPreview(fallbackUrl);
        return;
      } catch (fallbackErr) {
        console.error('Fallback upload also failed:', fallbackErr);
      }
      
      let errorMessage = 'Upload failed. ';
      
      if (err.code === 'storage/unauthorized') {
        errorMessage += 'Please enable Firebase Storage in Firebase Console.';
      } else if (err.code === 'storage/unknown') {
        errorMessage += 'Firebase Storage service not available.';
      } else if (err.message && err.message.includes('Firebase Storage not initialized')) {
        errorMessage += 'Firebase Storage not properly initialized.';
      } else {
        errorMessage += err.message || 'Please try again.';
      }
      
      setError(errorMessage);
      setPreview(currentImage); // Reset to original image
    } finally {
      setUploading(false);
    }
  };

  // Simple image compression function
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Resize to max 800px width/height for faster uploads
        const maxSize = 800;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(resolve, 'image/jpeg', 0.8); // 80% quality
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className={`image-upload-container ${className}`}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Image Preview */}
        <div 
          style={{
            width: '150px',
            height: '150px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9f9f9',
            backgroundImage: preview ? `url(${preview})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={() => document.getElementById(`file-input-${folder}`)?.click()}
        >
          {!preview && (
            <div style={{ textAlign: 'center', color: '#666' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📷</div>
              <div style={{ fontSize: '12px' }}>{placeholder}</div>
            </div>
          )}
          
          {/* Upload overlay with better feedback */}
          {uploading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
              <div>Uploading...</div>
              <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
                Please wait...
              </div>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          id={`file-input-${folder}`}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          disabled={uploading}
        />
      </div>

      {/* Error message */}
      {error && (
        <div style={{ 
          color: '#dc2626', 
          fontSize: '12px', 
          marginTop: '8px',
          maxWidth: '150px'
        }}>
          {error}
        </div>
      )}

      {/* File size tip */}
      <div style={{ 
        fontSize: '10px', 
        color: '#6b7280', 
        marginTop: '4px',
        textAlign: 'center',
        maxWidth: '150px'
      }}>
        📁 Max 5MB supported
      </div>

      {/* Upload button */}
      <button
        onClick={() => document.getElementById(`file-input-${folder}`)?.click()}
        disabled={uploading}
        style={{
          marginTop: '8px',
          padding: '6px 12px',
          backgroundColor: uploading ? '#ccc' : '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: uploading ? 'not-allowed' : 'pointer',
          width: '100%',
          maxWidth: '150px'
        }}
      >
        {uploading ? 'Uploading...' : 'Change Image'}
      </button>
    </div>
  );
};

export default ImageUpload;
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const FirebaseTest = () => {
  const [testResult, setTestResult] = useState('');
  const [uploading, setUploading] = useState(false);

  const testFirebaseStorage = async () => {
    setUploading(true);
    setTestResult('Testing Firebase Storage...\n');
    
    try {
      // Test 1: Check if storage is initialized
      console.log('Storage object:', storage);
      setTestResult(prev => prev + `✅ Storage object exists: ${!!storage}\n`);
      
      // Test 2: Create a simple test file
      const testContent = 'Hello Firebase Storage!';
      const testBlob = new Blob([testContent], { type: 'text/plain' });
      
      // Test 3: Try to upload the test file
      const testRef = ref(storage, `test/test-${Date.now()}.txt`);
      setTestResult(prev => prev + `📤 Uploading test file...\n`);
      
      const snapshot = await uploadBytes(testRef, testBlob);
      setTestResult(prev => prev + `✅ Upload successful! Snapshot: ${snapshot.ref.fullPath}\n`);
      
      // Test 4: Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      setTestResult(prev => prev + `✅ Download URL: ${downloadURL}\n`);
      
      // Test 5: Test image upload
      setTestResult(prev => prev + `🖼️ Testing image upload...\n`);
      
      // Create a simple 1x1 pixel PNG image
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, 1, 1);
      
      canvas.toBlob(async (imageBlob) => {
        try {
          const imageRef = ref(storage, `test-images/test-${Date.now()}.png`);
          const imageSnapshot = await uploadBytes(imageRef, imageBlob);
          const imageURL = await getDownloadURL(imageSnapshot.ref);
          setTestResult(prev => prev + `✅ Image upload successful: ${imageURL}\n`);
          setTestResult(prev => prev + `\n🎉 All Firebase Storage tests passed!`);
        } catch (imgError) {
          setTestResult(prev => prev + `❌ Image upload failed: ${imgError.message}\n`);
        }
        setUploading(false);
      }, 'image/png');
      
    } catch (error) {
      setTestResult(prev => prev + `❌ Error: ${error.message}\n`);
      setTestResult(prev => prev + `❌ Error code: ${error.code}\n`);
      setUploading(false);
    }
  };

  const checkFirebaseRules = () => {
    setTestResult(`
📋 Firebase Storage Rules Check:

1. Go to Firebase Console → Storage → Rules
2. Your rules should look like this for testing:

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}

3. Or for open access (less secure, for testing only):

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}

Current config from your firebase.js:
- Project ID: clubbee-123  
- Storage Bucket: clubbee-123.firebasestorage.app
`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Firebase Storage Debug Tool
      </h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={testFirebaseStorage}
          disabled={uploading}
          style={{ 
            backgroundColor: '#2563eb', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '4px', 
            border: 'none', 
            cursor: uploading ? 'not-allowed' : 'pointer',
            marginRight: '1rem'
          }}
        >
          {uploading ? 'Testing...' : 'Test Firebase Storage'}
        </button>
        
        <button 
          onClick={checkFirebaseRules}
          style={{ 
            backgroundColor: '#059669', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '4px', 
            border: 'none', 
            cursor: 'pointer'
          }}
        >
          Check Rules Setup
        </button>
      </div>
      
      <div style={{ 
        backgroundColor: '#f3f4f6', 
        padding: '1rem', 
        borderRadius: '4px',
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        minHeight: '200px'
      }}>
        {testResult || 'Click "Test Firebase Storage" to run diagnostics...'}
      </div>
    </div>
  );
};

export default FirebaseTest;
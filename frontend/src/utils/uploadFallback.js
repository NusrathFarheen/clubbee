// Simple image upload fallback for demo purposes
// This simulates image upload when Firebase Storage is not available

export const uploadImageFallback = async (file, folder = 'general') => {
  console.log('Using fallback image upload for demo...');
  
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create a blob URL as a fallback
  const blobUrl = URL.createObjectURL(file);
  
  // In a real app, you would upload to your own server here
  console.log('Fallback upload complete:', blobUrl);
  
  return blobUrl;
};

export const isFirebaseStorageAvailable = () => {
  try {
    // Check if Firebase Storage is properly configured
    return window.firebase && window.firebase.storage;
  } catch (error) {
    return false;
  }
};
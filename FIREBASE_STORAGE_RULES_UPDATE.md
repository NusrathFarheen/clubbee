# Firebase Storage Rules Update Instructions

## Current Issue
Firebase Storage rules are too restrictive and blocking image uploads from authenticated users.

## Steps to Update Rules

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `clubbee-123`
3. **Navigate to Storage**: 
   - Click "Storage" in the left sidebar
   - Click "Rules" tab at the top

4. **Update the Rules**: Replace the current rules with:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to read and write their own files
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    
    // Alternative: More specific rules for different file types
    // match /profile-pictures/{userId}/{allPaths=**} {
    //   allow read, write: if request.auth != null && request.auth.uid == userId;
    // }
    // 
    // match /event-images/{allPaths=**} {
    //   allow read: if true;
    //   allow write: if request.auth != null;
    // }
  }
}
```

5. **Publish the Rules**: Click "Publish" to save the changes

## What These Rules Do

- **`request.auth != null`**: Only authenticated users can upload/read files
- **`{allPaths=**}`**: Applies to all files and subfolders
- **`allow read, write`**: Permits both reading and writing operations

## More Restrictive Alternative (Optional)

If you want more security, you can use the commented rules that:
- Only allow users to manage their own profile pictures
- Allow anyone to read event images but only authenticated users to upload them

## Testing After Update

After updating the rules:
1. Try uploading a profile picture - should work now
2. Try creating an event with an image - should persist correctly
3. Check that images display properly in the UI

## Current Error We're Fixing

Before: `FirebaseError: Firebase Storage: User does not have permission to access 'profile-pictures/[uid]/[filename]'.`

After: Upload should succeed for authenticated users.
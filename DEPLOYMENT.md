# 🚀 CLUBBEE Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:
- [ ] GitHub repository with your code
- [ ] Firebase project set up
- [ ] MongoDB Atlas cluster created
- [ ] Vercel account
- [ ] Render account

## 🎯 Deployment Steps

### 1. **Backend Deployment (Render)**

1. **Create Render Account**: Go to [render.com](https://render.com) and sign up
2. **Connect GitHub**: Link your GitHub account to Render
3. **Create New Web Service**:
   - Select your `clubbee` repository
   - Choose `backend` folder as root directory
   - Set environment to `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Environment Variables** (Add these in Render dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clubbee-prod
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-key\n-----END PRIVATE KEY-----"
   FRONTEND_URL=https://your-vercel-domain.vercel.app
   ```

5. **Deploy**: Click "Create Web Service"

### 2. **Frontend Deployment (Vercel)**

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up
2. **Import Project**: 
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` folder as root directory

3. **Environment Variables** (Add these in Vercel dashboard):
   ```
   REACT_APP_API_URL=https://your-render-backend-url.onrender.com
   REACT_APP_ENVIRONMENT=production
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

4. **Deploy**: Click "Deploy"

### 3. **Database Setup (MongoDB Atlas)**

1. **Create Cluster**: Create a free MongoDB Atlas cluster
2. **Network Access**: Allow access from anywhere (0.0.0.0/0)
3. **Database User**: Create a user with read/write permissions
4. **Connection String**: Copy the connection string and update `MONGODB_URI`

### 4. **Firebase Configuration**

1. **Service Account**: Download Firebase Admin SDK service account key
2. **Extract Variables**: Get the required values and add to environment variables
3. **Firebase Rules**: Ensure Firestore/Storage rules are configured for production

## 🔧 Post-Deployment Configuration

### Update CORS Settings
After deploying, update your Render backend environment variables:
- `FRONTEND_URL=https://your-actual-vercel-domain.vercel.app`

### Custom Domain (Optional)
- **Vercel**: Add custom domain in project settings
- **Render**: Add custom domain in service settings

## 🧪 Testing Deployment

1. **Backend Health Check**: Visit `https://your-backend.onrender.com`
2. **Frontend**: Visit your Vercel domain
3. **API Connection**: Test login and data fetching
4. **Firebase**: Test authentication and data operations

## 📱 Monitoring

- **Vercel**: Monitor deployments and analytics in dashboard
- **Render**: Monitor service health and logs
- **MongoDB Atlas**: Monitor database performance

## 🚨 Troubleshooting

### Common Issues:
1. **CORS Errors**: Check `FRONTEND_URL` in backend environment
2. **API Not Found**: Verify `REACT_APP_API_URL` in frontend
3. **Database Connection**: Check MongoDB Atlas network access and credentials
4. **Firebase Errors**: Verify all Firebase environment variables

### Environment Variables Checklist:

**Backend (Render):**
- [ ] NODE_ENV=production
- [ ] PORT=10000
- [ ] MONGODB_URI
- [ ] FIREBASE_PROJECT_ID
- [ ] FIREBASE_CLIENT_EMAIL
- [ ] FIREBASE_PRIVATE_KEY
- [ ] FRONTEND_URL

**Frontend (Vercel):**
- [ ] REACT_APP_API_URL
- [ ] REACT_APP_ENVIRONMENT=production
- [ ] REACT_APP_FIREBASE_API_KEY
- [ ] REACT_APP_FIREBASE_AUTH_DOMAIN
- [ ] REACT_APP_FIREBASE_PROJECT_ID
- [ ] REACT_APP_FIREBASE_STORAGE_BUCKET
- [ ] REACT_APP_FIREBASE_MESSAGING_SENDER_ID
- [ ] REACT_APP_FIREBASE_APP_ID

## 🎉 Success!

Once deployed successfully, your Campus Club Management Suite will be live at:
- **Frontend**: https://your-domain.vercel.app
- **Backend**: https://your-backend.onrender.com

## 📞 Support

If you encounter issues, check:
1. Deployment logs in Vercel/Render dashboards
2. Browser console for frontend errors
3. Network tab for API call failures
4. Environment variables are correctly set
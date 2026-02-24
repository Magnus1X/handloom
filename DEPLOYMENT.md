# Deployment Guide

## Backend Deployment (Render)

1. **Connect GitHub Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `server` folder as root directory

2. **Configure Build Settings**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18.x

3. **Environment Variables**
   Add these in Render dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Note your backend URL (e.g., `https://your-app.onrender.com`)

## Frontend Deployment (Vercel)

1. **Connect GitHub Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `client` folder as root directory

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables**
   Add in Vercel dashboard:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Your frontend will be live at `https://your-app.vercel.app`

## Post-Deployment Steps

1. **Update CORS Origins**
   Update your backend to allow your Vercel domain in CORS settings

2. **Test the Application**
   - Verify API endpoints work
   - Test authentication flow
   - Check image uploads (Cloudinary)
   - Verify database connections

## Important Notes

- **Free Tier Limitations**: Render free tier sleeps after 15 minutes of inactivity
- **Environment Variables**: Never commit actual credentials to Git
- **Database**: Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- **HTTPS**: Both Render and Vercel provide HTTPS by default
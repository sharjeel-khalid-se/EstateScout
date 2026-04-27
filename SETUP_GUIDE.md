# EstateScout Setup Guide - Local Development

## Fixed Issues

✅ **API URL Typo**: Changed `estate-scout-backedn` to `estate-scout-backend`  
✅ **Frontend API Configuration**: Now uses environment variables with fallback to `http://localhost:5000/api`  
✅ **CORS Configuration**: Added support for Vite default ports (5173, 5174)  
✅ **Token Refresh Bug**: Fixed JWT refresh token handler  
✅ **.env Files Created**: Both frontend and backend now have proper environment files  

---

## Backend Setup

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Configure Environment Variables
Edit `Backend/.env` with your actual credentials:

```env
# MongoDB Connection String (Required - get from MongoDB Atlas)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/estatescout

# JWT Secrets (Generate random strong strings - minimum 32 characters)
JWT_ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_here_minimum_32_characters
JWT_REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_here_minimum_32_characters

# Cloudinary Configuration (Required for image uploads - get from Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Server Port
PORT=5000
```

### 3. Start Backend Server
```bash
npm start
```

The server should be running at `http://localhost:5000`

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd Frontend
npm install
```

### 2. Environment Variables
The `Frontend/.env` file is already configured for local development:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## Getting Required Credentials

### MongoDB Atlas
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string and add to `MONGO_URI`

### Cloudinary
1. Sign up at https://cloudinary.com
2. Get API credentials from dashboard
3. Add to `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`

### JWT Secrets
Generate random strings (min 32 chars):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Troubleshooting

### "Cannot connect to API"
- ✅ Backend running on port 5000?
- ✅ Frontend .env has `VITE_API_BASE_URL=http://localhost:5000/api`?
- ✅ Check browser console for actual error

### "CORS Error"
- ✅ Backend CORS now supports localhost:5173 (Vite default)
- ✅ Make sure backend is running

### "MongoDB connection failed"
- ✅ Check `MONGO_URI` in `.env`
- ✅ Verify MongoDB cluster is running
- ✅ Check IP whitelist in MongoDB Atlas

### "Cannot upload images"
- ✅ Verify Cloudinary credentials in `.env`
- ✅ Check Cloudinary account has upload permissions

---

## Running Both Servers

**Terminal 1 - Backend:**
```bash
cd Backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

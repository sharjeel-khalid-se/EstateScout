# Production Deployment Guide - EstateScout

## 🚨 Current CORS Error Fix

Your frontend is deployed to: `https://estate-scout-psi.vercel.app`  
Your backend is deployed to: `https://estate-scout-backend.vercel.app` (or custom domain)

**The issue:** The frontend API URL still had the typo and CORS wasn't allowing the production domain.

## ✅ What I Fixed

### 1. **Created `.env.production` for Frontend**
```env
VITE_API_BASE_URL=https://estate-scout-backend.vercel.app/api
```

### 2. **Updated Backend CORS**
Now allows:
- Local development (localhost:3000, 5173, 5174)
- Production Vercel frontend (estate-scout-psi.vercel.app)
- Dynamic `FRONTEND_URL` from environment variable

### 3. **Created `.env.example` files**
- Template for easy setup
- Clear documentation of required variables

---

## 🌐 Vercel Deployment Setup

### **Frontend Deployment (Estate Scout UI)**

1. **Go to Vercel Dashboard** → Your Frontend Project

2. **Set Environment Variables:**
   - Go to `Settings` → `Environment Variables`
   - Add: `VITE_API_BASE_URL` = `https://estate-scout-backend.vercel.app/api`
   - Make sure it's set for Production environment

3. **Ensure Build Command:**
   ```bash
   npm run build
   ```

4. **Redeploy** after adding environment variables

### **Backend Deployment (Express API)**

1. **Go to Vercel Dashboard** → Your Backend Project

2. **Set Environment Variables:**
   - `MONGO_URI` - Your MongoDB Atlas connection string
   - `JWT_ACCESS_TOKEN_SECRET` - Random 32+ char string
   - `JWT_REFRESH_TOKEN_SECRET` - Random 32+ char string
   - `CLOUDINARY_CLOUD_NAME` - From Cloudinary dashboard
   - `CLOUDINARY_API_KEY` - From Cloudinary dashboard
   - `CLOUDINARY_SECRET_KEY` - From Cloudinary dashboard
   - `FRONTEND_URL` = `https://estate-scout-psi.vercel.app` (your frontend URL)
   - `PORT` = `5000` (not required for Vercel, but good practice)

3. **Update `vercel.json` (if needed):**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ],
     "env": {
       "NODE_ENV": "production"
     }
   }
   ```

4. **Redeploy** after adding environment variables

---

## 🔑 Generate JWT Secrets

Run this in your terminal to generate secure random strings:

```bash
# For macOS/Linux
openssl rand -hex 32

# For Windows (PowerShell)
[Convert]::ToHexString((1..32 | ForEach-Object {Get-Random -Maximum 256}))

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🧪 Testing Deployment

After deployment, test these endpoints:

### **Auth Testing**
```bash
# Test Login
curl -X POST https://your-backend-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Should return token if user exists
```

### **CORS Testing**
Open browser DevTools → Network tab → Try login
- ✅ Should NOT see "CORS" errors
- ✅ Should see actual response (success or error)

### **Check Logs**
- **Frontend**: Vercel → Deployments → View logs
- **Backend**: Vercel → Deployments → View logs

---

## 🔧 Common Issues & Fixes

### **Issue: Still getting CORS errors**
**Fix:**
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Hard refresh: `Ctrl+Shift+R`
3. Verify `FRONTEND_URL` is set in backend
4. Check backend has redeployed with new env vars

### **Issue: API returns 404**
**Fix:**
1. Verify backend is running on Vercel
2. Check MongoDB connection string is correct
3. Check API routes exist at `/api/auth/*`

### **Issue: Authentication fails**
**Fix:**
1. Verify `JWT_ACCESS_TOKEN_SECRET` is set
2. Verify `JWT_REFRESH_TOKEN_SECRET` is set
3. Check MongoDB has user data

### **Issue: File uploads fail**
**Fix:**
1. Verify Cloudinary credentials
2. Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`
3. Check Cloudinary account has upload permissions

---

## 📋 Deployment Checklist

**Frontend:**
- [ ] `.env.production` file created
- [ ] `VITE_API_BASE_URL` set on Vercel
- [ ] Points to correct backend URL (no typos!)
- [ ] Build command set to `npm run build`
- [ ] Redeployed after env changes

**Backend:**
- [ ] All required env vars set on Vercel
- [ ] `MONGO_URI` connects to MongoDB
- [ ] `JWT` secrets are 32+ characters
- [ ] `CLOUDINARY` credentials verified
- [ ] `FRONTEND_URL` matches deployed frontend
- [ ] Redeployed after env changes

**Testing:**
- [ ] Login page loads
- [ ] Can register new account
- [ ] Can view properties
- [ ] Can view property details
- [ ] Can upload property images

---

## 📞 Still Having Issues?

Check:
1. Browser console for specific error messages
2. Network tab to see actual API responses
3. Vercel deployment logs for server errors
4. MongoDB Atlas for connection issues
5. Cloudinary dashboard for upload issues

**Get error details:**
- Right-click error in console
- Copy full error message
- Search for solution or ask for help

import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const uploadsDir = path.resolve(process.cwd(), "uploads");

export const hasCloudinaryConfig = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_SECRET_KEY,
);

if (hasCloudinaryConfig) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
}

// Only create uploads dir locally — Vercel's filesystem is read-only
if (!process.env.VERCEL && !hasCloudinaryConfig) {
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
}

const storage = hasCloudinaryConfig
    ? new CloudinaryStorage({
            cloudinary,
            params: {
                folder: "EstateScout",
                allowed_formats: ["jpg", "png", "jpeg"],
                transformation: [{ width: 500, height: 500, crop: "limit" }],
            },
        })
    : multer.diskStorage({
            destination: (_req, _file, callback) => {
                callback(null, uploadsDir);
            },
            filename: (_req, file, callback) => {
                const extension = path.extname(file.originalname);
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
            },
        });

const upload = multer({ storage });

export { cloudinary, upload, uploadsDir };
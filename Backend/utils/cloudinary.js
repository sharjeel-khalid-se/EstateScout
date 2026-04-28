import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const uploadsDir = path.resolve(process.cwd(), "uploads");
const hasCloudinaryConfig = Boolean(
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
} else {
    // Only create a local uploads directory when Cloudinary is NOT configured.
    // Vercel's serverless environment is read-only, so avoid mkdir there.
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
}

const storage = hasCloudinaryConfig
    ? new CloudinaryStorage({
            cloudinary,
            folder: "EstateScout",
            allowedFormats: ["jpg", "png", "jpeg"],
            transformation: [{ width: 500, height: 500, crop: "limit" }],
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

export { cloudinary, upload, hasCloudinaryConfig, uploadsDir };
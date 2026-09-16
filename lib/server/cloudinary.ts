import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadedAsset {
  url: string;
  originalName: string;
  size: number;
  mimetype: string;
}

/**
 * Uploads a web `File` straight from memory — Vercel's filesystem is read-only
 * apart from /tmp, so the Express version's temp-file dance is dropped here.
 */
export async function uploadToCloudinary(file: File, folder: string): Promise<UploadedAsset> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const isImage = file.type.startsWith('image/');
  const ext = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase() : '';
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: isImage ? 'image' : 'raw',
        public_id: isImage ? uniqueName : `${uniqueName}${ext}`,
        overwrite: false,
      },
      (err, res) => {
        if (err || !res) reject(err ?? new Error('Cloudinary upload failed'));
        else resolve(res as { secure_url: string });
      }
    );
    stream.end(buffer);
  });

  return {
    url: result.secure_url,
    originalName: file.name,
    size: file.size,
    mimetype: file.type,
  };
}

export default cloudinary;

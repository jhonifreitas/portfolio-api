import { storage } from 'firebase-admin';

class UploadStorage {
  uploadFile(path: string, file: Express.Multer.File): Promise<string> {
    const bucket = storage().bucket(process.env.BUCKET_URL);

    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No image file');
      }
      const newFileName = `${file.fieldname}_${Date.now()}`;

      const fileUpload = bucket.file(newFileName);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });

      blobStream.on('error', (error) => {
        console.error(error);
        reject('Something is wrong! Unable to upload at the moment.');
      });

      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const url = `https://storage.googleapis.com/${bucket.name}/${path}/${fileUpload.name}`;
        resolve(url);
      });

      blobStream.end(file.buffer);
    });
  }
}

export default new UploadStorage();

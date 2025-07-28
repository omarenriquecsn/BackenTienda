import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as Cloudinary } from 'cloudinary';
import * as bufferToStream from 'buffer-to-stream';

@Injectable()
export class fileUploadRepository {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | undefined> {
    return new Promise((resolve, reject) => {
      const uploadFile = Cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(new Error(error.message || 'Hubo un problema'));
          } else {
            resolve(result);
          }
        },
      );
      bufferToStream(file.buffer).pipe(uploadFile);
    });
  }
}

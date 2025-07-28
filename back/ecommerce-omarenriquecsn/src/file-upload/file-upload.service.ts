import { Injectable } from '@nestjs/common';
import { fileUploadRepository } from './file-upload.repository';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: fileUploadRepository,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async uploadProductImg(file: Express.Multer.File, productId: string) {
    try {
      const productDb = await this.productRepository.findOneBy({
        id: productId,
      });
      if (!productDb) {
        throw new Error('No existe el producto');
      }

      const uploadeImg = await this.fileUploadRepository.uploadImage(file);


      productDb.imgUrl = uploadeImg ? uploadeImg.secure_url : productDb.imgUrl;

      await this.productRepository.save(productDb);

      return productDb;
    } catch (err) {
      const errorMensage =
        err instanceof Error ? err.message : 'Error desconocido';
      return { message: 'No se cargo la imagen', error: errorMensage };
    }
  }
}

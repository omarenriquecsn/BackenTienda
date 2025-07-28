import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductDto } from '../dtos/Product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  prechargeProducts() {
    return this.productsRepository.prechargeProducts();
  }
  constructor(private productsRepository: ProductsRepository) {}
  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductsBiId(id: string): Promise<Product | null | undefined> {
    return this.productsRepository.getProductBiId(id);
  }

  getList(limit: number, pages: number) {
    return this.productsRepository.getList(limit, pages);
  }

  addProduct(product: ProductDto) {
    return this.productsRepository.addProduct(product);
  }

  updateProduct(id: string, value: ProductDto): Promise<string | undefined> {
    return this.productsRepository.updateProduct(id, value);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}

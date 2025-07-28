import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductDto } from '../dtos/Product.dto';
import { Category } from '../entities/Categories.entity';
import * as data from '../utils/Archivo actividad 3.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  //

  // public products: ProductDto[] = [
  //   {
  //     name: 'Laptop',
  //     description: 'Laptop de alto rendimiento',
  //     price: 1200,
  //     stock: 25,
  //     imgUrl: 'https://example.com/laptop.jpg',
  //   },
  //   {
  //     name: 'Smartphone',
  //     description: 'Teléfono inteligente de última generación',
  //     price: 800,
  //     stock: 25,
  //     imgUrl: 'https://example.com/smartphone.jpg',
  //   },
  //   {
  //     name: 'Auriculares',
  //     description: 'Auriculares inalámbricos con cancelación de ruido',
  //     price: 200,
  //     stock: 25,
  //     imgUrl: 'https://example.com/auriculares.jpg',
  //   },
  //   {
  //     name: 'Smartwatch',
  //     description: 'Reloj inteligente con monitor de salud',
  //     price: 250,
  //     stock: 25,
  //     imgUrl: 'https://example.com/smartwatch.jpg',
  //   },
  //   {
  //     name: 'Teclado Mecánico',
  //     description: 'Teclado para gaming con retroiluminación',
  //     price: 100,
  //     stock: 25,
  //     imgUrl: 'https://example.com/teclado.jpg',
  //   },
  //   {
  //     name: 'Cámara',
  //     description: 'Cámara digital con lente de alta calidad',
  //     price: 500,
  //     stock: 25,
  //     imgUrl: 'https://example.com/camara.jpg',
  //   },
  //   {
  //     name: 'Monitor',
  //     description: 'Monitor 4K UHD de 27 pulgadas',
  //     price: 300,
  //     stock: 25,
  //     imgUrl: 'https://example.com/monitor.jpg',
  //   },
  //   {
  //     name: 'Silla Gamer',
  //     description: 'Silla ergonómica para jugadores',
  //     price: 150,
  //     stock: 25,
  //     imgUrl: 'https://example.com/silla.jpg',
  //   },
  //   {
  //     name: 'Tablet',
  //     description: 'Tablet compacta para lectura y multimedia',
  //     price: 400,
  //     stock: 25,
  //     imgUrl: 'https://example.com/tablet.jpg',
  //   },
  //   {
  //     name: 'Mochila',
  //     description: 'Mochila resistente al agua para laptop',
  //     price: 80,
  //     stock: 25,
  //     imgUrl: 'https://example.com/mochila.jpg',
  //   },
  // ];

  async getProducts(): Promise<Product[]> {
    const newProduct2 = await this.productRepository.find({
      relations: ['category'],
    });
    return newProduct2;
  }

  async prechargeProducts() {
    try {
      for (const element of data) {
        const categoryDb: Category | null =
          await this.categoryRepository.findOne({
            where: { name: element.category },
          });

        const productDb = await this.productRepository.findOne({
          where: { name: element.name },
        });

        if (categoryDb && !productDb) {
          await this.productRepository.save({
            description: element.description,
            name: element.name,
            price: element.price,
            stock: element.stock,
            category: categoryDb,
            imgUrl:
              'https://www.google.com/imgres?q=url%20img&imgurl=https%3A%2F%2Fpng.pngtree.com%2Felement_our%2F20200702%2Fourmid%2Fpngtree-small-url-icon-opened-in-the-browser-image_2291957.jpg&imgrefurl=https%3A%2F%2Fes.pngtree.com%2Fso%2Furl&docid=fgEpiTOhCEFtaM&tbnid=Cp0ZC8r87xI3eM&vet=12ahUKEwjcw5Ww5qaMAxXiTDABHQ1BL5EQM3oECFQQAA..i&w=360&h=360&hcb=2&ved=2ahUKEwjcw5Ww5qaMAxXiTDABHQ1BL5EQM3oECFQQAA',
          });
        }
      }
    } catch (er) {
      const errorMesaage =
        er instanceof Error ? er.message : 'Error desconocido';
      return {
        message: 'No se precargaron los productos error:',
        error: errorMesaage,
      };
    }
  }

  async getProductBiId(id: string): Promise<Product | null | undefined> {
    return await this.productRepository.findOneBy({ id });
  }

  async getList(limit: number, pages: number) {
    const [data] = await this.productRepository.findAndCount({
      skip: (pages - 1) * limit,
      take: limit,
      relations: { category: true },
    });
    return data;
  }

  async addProduct(product: ProductDto): Promise<string> {
    const newProduct = await this.productRepository.save(product);
    return newProduct.id;
  }

  async updateProduct(
    id: string,
    value: ProductDto,
  ): Promise<string | undefined> {
    const product = await this.getProductBiId(id);
    if (product) {
      await this.productRepository
        .createQueryBuilder()
        .update(Product)
        .set(value)
        .where({ id })
        .execute();
      return product.id;
    }
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.getProductBiId(id);
    if (product) {
      await this.productRepository
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where({ id })
        .execute();
      return id;
    }
    throw new Error('Producto no encontrado');
  }
}

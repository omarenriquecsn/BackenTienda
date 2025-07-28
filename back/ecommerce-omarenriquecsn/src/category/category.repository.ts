import { Injectable } from '@nestjs/common';
import * as data from '../utils/Archivo actividad 3.json';
import { Category } from '../entities/Categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async addCategoriesPrecharge() {
    const categories: string[] = (await this.getCategories()).map(
      (category) => category.name,
    );
    for (const element of data) {
      if (!categories.includes(element.category)) {
        categories.push(element.category);

        await this.categoryRepository.save({ name: element.category });
      }
    }
    return 'Categorias Agregadas';
  }

  getCategories() {
    return this.categoryRepository.find({ relations: ['product'] });
  }

  async addCategoriy(name: string) {
    const newCategory = await this.categoryRepository.save({ name });
    return newCategory.id;
  }
}

import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  addCategory(name: string) {
    return this.categoryRepository.addCategoriy(name);
  }
  constructor(private readonly categoryRepository: CategoryRepository) {}
  addCategoriesPrecharge() {
    return this.categoryRepository.addCategoriesPrecharge();
  }

  getCategories() {
    return this.categoryRepository.getCategories();
  }
}

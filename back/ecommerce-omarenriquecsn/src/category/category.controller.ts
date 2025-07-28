import { Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('Categorias')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('seeder')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Precarga de Categorias'})
  addCategoryPrecharge() {
    return this.categoryService.addCategoriesPrecharge();
  }

  @Post(':name')
  @ApiOperation({ summary: 'Agregar Nueva Categoria' })
  @ApiBearerAuth()
  addCategory(@Param() name: string) {
    return this.categoryService.addCategory(name);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener Categorias' })
  getCategories() {
    return this.categoryService.getCategories();
  }
}

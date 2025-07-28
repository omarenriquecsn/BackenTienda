import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { ProductDto } from '../dtos/Product.dto';
import { RoleGuard } from '../Auth/guards/role.guard';
import { Roles } from '../enum/roles.enum';
import { Role } from '../decorators/roles/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Productos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  @ApiOperation({summary: 'Obtener Todos los Productos'})
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get('seeder')
  @ApiOperation({summary: 'Precarga de Productos a la Base de datos'})

  prechargeProducts() {
    return this.productsService.prechargeProducts();
  }

  @HttpCode(200)
  @ApiOperation({summary: 'Obtener Productos Paginados'})
  @Get('list')
  getList(@Query('limit') limit: number, @Query('pages') pages: number) {
    return this.productsService.getList(!limit ? 5 : limit, !pages ? 1 : pages);
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener Productos por ID'})
  getProductById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product | null | undefined> {
    return this.productsService.getProductsBiId(id);
  }

  @HttpCode(201)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Agregar un Nuevo Producto'})
  @ApiBearerAuth()
  @Post()
  addProduct(@Body() product: ProductDto): Promise<string> {
    return this.productsService.addProduct(product);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({summary: 'Actualizar un Producto'})
  @ApiBearerAuth()
  @Role(Roles.Admin)
  @Put(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() value: ProductDto,
  ): Promise<string | undefined> {
    return this.productsService.updateProduct(id, value);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Eliminar un Producto'})
  @ApiBearerAuth()
  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productsService.deleteProduct(id);
  }
}

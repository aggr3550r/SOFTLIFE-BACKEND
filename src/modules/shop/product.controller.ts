import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { PageOptionsDTO } from 'src/dtos/pageoption.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from '../users/entities/user.entity';
import { CreateProductDTO } from './dtos/product/create-product.dto';
import { GetProductDTO } from './dtos/product/get-product.dto';
import { UpdateProductDTO } from './dtos/product/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';

@Controller('product')
@Serialize(GetProductDTO)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create-product')
  @UseGuards(AuthGuard)
  async createProduct(
    @Body()
    body: CreateProductDTO,
    @CurrentUser() user: User,
  ): Promise<Product> {
    return await this.productService.createProduct(body, user);
  }

  @Get('/preview-product/:product_id')
  async previewProduct(
    @Param('product_id') product_id: string,
  ): Promise<Product> {
    return await this.productService.getAProduct(product_id);
  }

  @Get('/products')
  async getProducts(
    @Query() page_options_dto: PageOptionsDTO,
  ): Promise<Product[]> {
    const paginated_products = await this.productService.getProducts(
      page_options_dto,
    );
    return paginated_products.data;
  }

  @Patch('/update-product')
  @UseGuards(AdminGuard)
  async updateProduct(
    @Body() updates: UpdateProductDTO,
    @Query('product_id') product_id: string,
  ): Promise<Product> {
    return await this.productService.updateProduct(product_id, updates);
  }

  @Delete('/remove-product')
  @UseGuards(AdminGuard)
  async removeProduct(
    @Query('product_id') product_id: string,
  ): Promise<Product> {
    return await this.productService.deleteProduct(product_id);
  }
}

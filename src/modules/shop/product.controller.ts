import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PageOptionsDTO } from 'src/dtos/pageoption.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateProductDTO } from './dtos/product/create-product.dto';
import { GetProductDTO } from './dtos/product/get-product.dto';
import { UpdateProductDTO } from './dtos/product/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create-product')
  @UseGuards(AuthGuard)
  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = await this.productService.createProduct(createProductDTO);
    return product;
  }

  @Get('/preview-product')
  @Serialize(GetProductDTO)
  async previewProduct(@Param() product_id: string): Promise<Product> {
    return this.productService.getAProduct(product_id);
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

  @Get('/update-product')
  @UseGuards(AdminGuard)
  async updateProduct(
    @Param('product_id') product_id: string,
    @Query() updates: UpdateProductDTO,
  ) {
    return this.productService.updateProduct(product_id, updates);
  }

  @Get('/remove-product')
  @UseGuards(AdminGuard)
  async removeProduct(@Param('product_id') product_id: string) {
    return this.productService.deleteProduct(product_id);
  }
}

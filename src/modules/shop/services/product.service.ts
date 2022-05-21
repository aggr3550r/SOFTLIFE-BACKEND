import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDTO } from 'src/dtos/page.dto';
import { PageMetaDTO } from 'src/dtos/pagemeta.dto';
import { PageOptionsDTO } from 'src/dtos/pageoption.dto';
import { winstonLogger } from 'src/utils/winston';
import { CreateProductDTO } from '../dtos/product/create-product.dto';
import { UpdateProductDTO } from '../dtos/product/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  createProduct(create_product_dto: CreateProductDTO): Promise<Product> {
    try {
      const product = this.productRepository.create(create_product_dto);
      return this.productRepository.save(product);
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }

  async getAProduct(product_id: string): Promise<Product> {
    try {
      const product = this.productRepository.findOne(product_id);
      return product;
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }

  async getProducts(
    page_options_dto: PageOptionsDTO,
  ): Promise<PageDTO<Product>> {
    try {
      const [items, count] = await this.productRepository.findAndCount({
        order: {
          created_at: 'DESC',
        },
        skip: page_options_dto.skip,
        take: page_options_dto.take,
      });

      const page_meta_dto = new PageMetaDTO({
        total_items: count,
        page_options_dto,
      });

      return new PageDTO(items, page_meta_dto);
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }

  async updateProduct(
    product_id: string,
    body: UpdateProductDTO,
  ): Promise<Product> {
    try {
      let product = await this.productRepository.findOne(product_id);
      Object.assign(product, body);
      return this.productRepository.save(product);
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }

  async deleteProduct(product_id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne(product_id);
      return this.productRepository.remove(product);
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductsEntity } from './product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductsEntity) private productsRepo: Repository<ProductsEntity>) { }

  products: Product[] = [];

  async insertProduct(title: string, description: string, price: number) {
    // const prodId = Math.random().toString();
    const newProduct = this.productsRepo.create();

    newProduct.title = title
    newProduct.description = description
    newProduct.price = price

    const res = await this.productsRepo.save(newProduct)

    return { id: res.id }
  }

  async getAllProducts() {
    const products = await this.productsRepo.find()

    return products
  }

  getProduct(id: string) {
    const product = this.findProduct(id);
    return product;
  }

  async updateProduct(id: string, title: string, description: string, price: number) {
    const updatedProduct = await this.findProduct(id);

    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }

    await this.productsRepo.save(updatedProduct)
    return null;
  }

  async deleteProduct(id: string) {
    const product = await this.findProduct(id)
    this.productsRepo.delete(product)
    return null;
  }

  private findProduct(id) {
    const product = this.productsRepo.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found with given id');
    }
    return product;
  }
}

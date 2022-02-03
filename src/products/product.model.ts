import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  price: number

}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

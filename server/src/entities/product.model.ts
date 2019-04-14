import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import ProductSearch from './product-search.model';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 1000,
    charset: 'utf8mb4',
    collation: 'utf8mb4_bin'})
  name: string;

  @Column({length: 1000})
  link: string;

  @Column()
  price: number;

  @Column()
  shop: string;

  @ManyToMany(type => ProductSearch, productSearch => productSearch.products)
  productSearches?: ProductSearch[];
}

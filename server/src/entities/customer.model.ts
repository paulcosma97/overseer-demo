import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { UserDetails } from "@jeaks03/overseer-core";
import ProductSearch from './product-search.model';

@Entity()
export default class Customer implements UserDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToMany(type => ProductSearch, productSearch => productSearch.viewedBy)
  productSearches: ProductSearch[];

  roles: string[];
}

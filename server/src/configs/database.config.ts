import { ConnectionOptions } from "typeorm";
import Customer from "../entities/customer.model";
import Product from "../entities/product.model";
import ProductSearch from '../entities/product-search.model';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'dbs',
  entities: [
    Customer,
    Product,
    ProductSearch
  ],
  synchronize: true,
  logging: false,
} as ConnectionOptions & { host: string, username: string, port: number };

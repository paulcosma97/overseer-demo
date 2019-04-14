import {Requisite, UserDetails} from "@jeaks03/overseer-core";
import {Connection} from "typeorm";
import Customer from "../entities/customer.model";
import ProductSearch from '../entities/product-search.model';

@Requisite
export default class AuthService {
  constructor(private connection: Connection) { }

  async getHistory(user: UserDetails): Promise<ProductSearch[]> {
    const repository = await this.connection.getRepository(Customer);
    const customer = await repository.findOne((<Customer> user).id, { relations: [ 'productSearches' ] });
    return customer.productSearches;
  }
}

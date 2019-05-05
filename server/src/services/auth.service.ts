import {
    ExplicitJwtToken,
    HttpError,
    JWTAuthentication,
    Requisite,
    Requisites,
    StandardResponse,
    UserDetails
} from "@jeaks03/overseer-core";
import { Connection } from "typeorm";
import Customer from "../entities/customer.model";
import ProductSearch from '../entities/product-search.model';
import { PasswordEncoderImpl } from '../configs/security.component';

@Requisite
export default class AuthService {
  constructor(private connection: Connection, private encoder: PasswordEncoderImpl) { }

  async getHistory(user: UserDetails): Promise<ProductSearch[]> {
    const repository = await this.connection.getRepository(Customer);
    const customer = await repository.findOne((<Customer> user).id, { relations: [ 'productSearches' ] });
    return customer.productSearches;
  }

  async createUser(user: { username: string, password: string }): Promise<Customer> {
    const repository = await this.connection.getRepository(Customer);
    const password = this.encoder.encode(user.password);

    const customer: Customer = {
      ...user,
      password,
      id: undefined,
      productSearches: [],
      roles: [],
    };

    return repository.save(customer);
  }

  async createUserAndToken(user: { username: string, password: string }): Promise<ExplicitJwtToken<Customer>> {
    if (!user.username || !user.password) {
      throw new HttpError(StandardResponse.BAD_REQUEST);
    }

    const customer = await this.createUser(user);
    const auth = Requisites.find(JWTAuthentication);
    return auth.generateToken(customer);
  }
}

import {Requisite, UserDetails} from "@jeaks03/overseer-core";
import {Connection} from "typeorm";
import Product from "../entities/product.model";
import Customer from "../entities/customer.model";
import ProductSearch from '../entities/product-search.model';

@Requisite
export default class ProductService {
    constructor(private connection: Connection) { }

    private async getCustomer(user: UserDetails | any): Promise<Customer> {
        if (!user) {
            return null;
        }

        return this.connection.getRepository(Customer).findOne(user.id, { relations: [ 'productSearches' ] });
    }

    async getHistory(user: UserDetails | any): Promise<ProductSearch[]> {
        const customer = await this.getCustomer(user);
        return customer.productSearches;
    }

    getPriceAverage(products: Product[]): number {
        let sum = 0;
        products.forEach(product => sum += product.price);
        return sum / products.length;
    }

    async save(term: string, products: Product[], user: UserDetails | any): Promise<Product[]> {
        const productRepository = await this.connection.getRepository(Product);
        const customerRepository = await this.connection.getRepository(Customer);
        const productSearchesRepository = await this.connection.getRepository(ProductSearch);
        const customer = await this.getCustomer(user);

        let existingSearch: ProductSearch = await productSearchesRepository
            .createQueryBuilder("productSearch")
            .leftJoinAndSelect('productSearch.products', 'products')
            .leftJoinAndSelect('productSearch.viewedBy', 'viewedBy')
            .where("productSearch.name = :name", { name: term })
            .getOne();

        if (!existingSearch) {
            existingSearch = { name: term, products: [], viewedBy: [], average: 0 };
        }

        existingSearch.average = (this.getPriceAverage(products) + existingSearch.average) / ( existingSearch.products.length === 0 ? 1 : 2 );

        products.forEach(product => product.productSearches = [existingSearch]);
        existingSearch.products.push(...products);
        customer && existingSearch.viewedBy.push(customer);

        await productRepository.save(products);
        customer && await customerRepository.save(customer);
        await productSearchesRepository.save(existingSearch);

        return products.map(product => ({
            ...product,
            productSearches: undefined,
        }));
    }
}
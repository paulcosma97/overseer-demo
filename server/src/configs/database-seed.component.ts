import { Requisite, Requisites, OnInit } from "@jeaks03/overseer-core";
import { Connection, createConnection } from 'typeorm';
import DatabaseConfig from './database.config';
import Customer from '../entities/customer.model';
import Product from '../entities/product.model';
import ProductSearch from '../entities/product-search.model';
import logger from "@jeaks03/logger";

@Requisite
export class DatabaseSeed {
    private connection: Connection;

    @OnInit()
    async prepareDatabase(): Promise<void> {
        this.connection = await createConnection(DatabaseConfig);
        logger.info('Main', 'Connection on {}@{}:{} opened successfully',
            (<any>DatabaseConfig).username, (<any>DatabaseConfig).host, (<any>DatabaseConfig).port);

        Requisites.addInstance(this.connection);

        await this.clear();
        logger.info(this, 'Cleared previous records from the database');
        await this.seed();
        logger.info(this, 'Seeded the database with the latest data');
    }

    async clear() {
        await this.connection.getRepository(Product).delete({});
        await this.connection.getRepository(ProductSearch).delete({});
        await this.connection.getRepository(Customer).delete({});
    }

    async seed() {
        const admin: Customer = { id: undefined, username: 'admin', password: 'admin', productSearches: [], roles: [] };
        this.connection.getRepository(Customer).save(admin)
    }

}
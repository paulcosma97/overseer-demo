import { AfterInit, OnInit, Requisite, Requisites } from "@jeaks03/overseer-core";
import { Connection, createConnection } from 'typeorm';
import DatabaseConfig from './database.config';
import logger from "@jeaks03/logger";
import AuthService from '../services/auth.service';

@Requisite
export class Database {
    private authService: AuthService;
    private connection: Connection;

    @OnInit()
    async connect() {
        this.connection = await createConnection(DatabaseConfig);
        logger.info('Main', 'Connection on {}@{}:{} opened successfully',
            DatabaseConfig.username, DatabaseConfig.host, DatabaseConfig.port);

        Requisites.addInstance(this.connection);
    }

    @AfterInit()
    synchronize() {
        this.authService = Requisites.find(AuthService);

        this.clear().then(() => {
            logger.info(this, 'Cleared previous records from the database');
            this.seed().then(() => {
                logger.info(this, 'Seeded the database with the latest data');
            });
        });
    }

    async clear() {
        await this.connection.synchronize(true);
    }

    async seed() {
        await this.authService.createUser({ username: 'admin', password: 'admin' });
    }

}

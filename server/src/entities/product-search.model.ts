import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product.model';
import Customer from './customer.model';

@Entity()
export default class ProductSearch {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        length: 1000,
        charset: 'utf8mb4',
        collation: 'utf8mb4_bin'})
    name: string;

    @Column()
    average: number;

    @ManyToMany(type => Product, product => product.productSearches)
    @JoinTable()
    products?: Product[];

    @ManyToMany(type => Customer, customer => customer.productSearches)
    @JoinTable()
    viewedBy?: Customer[];

    // viewedBy: Customer[];
}
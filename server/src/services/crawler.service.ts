import {Requisite} from "@jeaks03/overseer-core";
import EmagCrawler from "../requisites/emag-crawler.component";
import PcGarageCrawler from "../requisites/pc-garage-crawler.component";
import logger from '@jeaks03/logger';
import Product from '../entities/product.model';
import Customer from '../entities/customer.model';
import { Connection } from 'typeorm';
import ProductService from './product.service';

@Requisite
export default class CrawlerService {
  constructor(private emagCrawler: EmagCrawler,
              private pcGarageCrawler: PcGarageCrawler,
              private productService: ProductService) {}

  async crawl(term: string, excludedTerms: string[], customer: Customer): Promise<Product[]> {
    let products = await this.crawlAll(term);
    const averagePrice = this.calculateAverage(products);

    products = products
      .filter(product => this.excludeProduct(product, excludedTerms) &&
          product.price > averagePrice * 0.2)
      .sort((p1, p2) => p1.price - p2.price);

    products = await this.productService.save(term, products, customer);

    return products;
  }

  private excludeProduct(product: Product, excludedTerms) {
    for(const excludedTerm of excludedTerms) {
      if(product.name.toLowerCase().includes(excludedTerm.toLowerCase())) {
        return false;
      }
    }

    return true;
  }

  private async crawlAll(term: string): Promise<Product[]> {
    return (await Promise.all([
      this.emagCrawler.search(term),
      this.pcGarageCrawler.search(term),
    ])).flat();
  }

  private calculateAverage(products: Product[]): number {
    let averagePrice = -1;

    products.forEach(product => averagePrice += product.price);
    averagePrice /= products.length;

    logger.debug(this, 'Found {} products before filters with an average price of {}', products.length, averagePrice);

    return averagePrice;
  }
}

import Product from "../entities/product.model";
import logger from '@jeaks03/logger';
import ProductService from "../services/product.service";
const puppeteer = require('puppeteer');


export default abstract class AbstractWebCrawler {
  protected browser;
  protected productService: ProductService;

  constructor(protected link: string, protected shopName, productService: ProductService) {
    this.productService = productService;
  }

  protected abstract async searchFor(productName: string): Promise<Product[]>;

  private async getFilteredProducts(term: string): Promise<Product[]> {
    return (await this.searchFor(term)).filter(product => {
      const singleTerms = term.split(' ');

      for(const singleTerm of singleTerms) {
        if(!product.name.toLowerCase().includes(singleTerm.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }

  async search(term: string) : Promise<Product[]> {
    try {
      return await this.getFilteredProducts(term);
    } catch(e) {
      if (e.message.includes('ERR_CONNECTION_REFUSED')) {
        logger.error(this, 'Could not connect to `{}` using URL: `{}`', this.shopName, this.link);
        return [];
      }

      console.log(e);
      return [];
    }
  }

  protected async getPage() {
    this.browser = await puppeteer.launch();
    return this.browser.newPage();
  }
}

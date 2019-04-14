import {Requisite} from "@jeaks03/overseer-core";
import AbstractWebCrawler from "./abstract-web-crawler.component";
import Product from "../entities/product.model";
import ProductService from "../services/product.service";

@Requisite
export default class EmagCrawler extends AbstractWebCrawler {
  constructor(productService: ProductService) {
    super('https://www.emag.ro/search/', 'eMag', productService);
  }

  protected async searchFor(productName: string): Promise<Product[]> {
    const page = await this.getPage();
    await page.goto(this.link + productName);

    const html = await page.$$('.card-item.js-product-data');

    const out: Product[] = [];

    for (const element of html) {
      const link: any = await element.$eval('a', el => el.href) as string;
      const data: any = await element.$eval('.add-to-favorites', el => JSON.parse(el.dataset.product));

      const product: Product = {
        id: 0,
        name: data.product_name,
        price: data.price,
        link,
        shop: this.shopName
      };

      out.push(product);
    }

    this.browser.close();
    return out;
  }

}

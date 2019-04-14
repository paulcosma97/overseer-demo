import {Requisite} from "@jeaks03/overseer-core";
import AbstractWebCrawler from "./abstract-web-crawler.component";
import Product from "../entities/product.model";
import ProductService from "../services/product.service";

@Requisite
export default class PcGarageCrawler extends AbstractWebCrawler {
  constructor(productService: ProductService) {
    super('https://www.pcgarage.ro/cauta/', 'PC Garage', productService);
  }

  protected async searchFor(productName: string): Promise<Product[]> {
    const page = await this.getPage();
    await page.goto(this.link + productName);

    const html = await page.$$('.product-box');

    const out: Product[] = [];

    for (const element of html) {
      const price: number = (await element.$eval('.pb-price', el => el.innerText)).split(' RON')[0].replace('.', '').replace(',', '.');
      const link: string = await element.$eval('.pb-name a', el => el.href);
      const name: string = await element.$eval('.pb-name a', el => el.innerText);

      const product: Product = {
        id: 0,
        name,
        price: Number(price),
        link,
        shop: this.shopName
      };

      out.push(product);
    }

    this.browser.close();
    return out;
  }

}

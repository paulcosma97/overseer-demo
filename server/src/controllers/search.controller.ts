import { AuthenticatedGuard, Pathway, PathInfo, Requisite } from "@jeaks03/overseer-core";
import CrawlerService from "../services/crawler.service";
import Customer from '../entities/customer.model';
import ProductService from '../services/product.service';

@Requisite
export class SearchController {

    constructor(private crawlerService: CrawlerService,
                private productService: ProductService) { }

    @Pathway({path: '/search', method: 'post'})
    search(info: PathInfo) {
        return this.crawlerService.crawl(info.queryParams.term, info.body, info.user as Customer);
    }

    @Pathway({path: '/history', guards: [AuthenticatedGuard]})
    history(info: PathInfo) {
        return this.productService.getHistory(info.user);
    }

}

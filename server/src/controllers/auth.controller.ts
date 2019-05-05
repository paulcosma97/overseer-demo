import {
    Abstracts,
    AnonymousGuard,
    AuthenticatedGuard,
    ExplicitJwtToken,
    PathInfo,
    Pathway,
    Requisite
} from "@jeaks03/overseer-core";
import AuthService from "../services/auth.service";
import Customer from "../entities/customer.model";
import ProductSearch from '../entities/product-search.model';

@Requisite
export class AuthController {
    constructor(private authService: AuthService) { }

    @Pathway({ path: '/profile/history', guards: [ AuthenticatedGuard ] })
    getHistory(info: PathInfo): Promise<ProductSearch[]> {
      return this.authService.getHistory(info.user as Customer);
    }

    @Pathway({ path: '/users', method: 'post', guards: [ AnonymousGuard ] })
    register({ body }: Abstracts<Customer, void, void>): Promise<ExplicitJwtToken<Customer>> {
        return this.authService.createUserAndToken(body);
    }
}

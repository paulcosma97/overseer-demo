import User from './user.model';

export default interface UserCredentials {
    user: User;
    token: string;
    iat: number;
    exp: number;
}

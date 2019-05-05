import { JWTAuthentication, OnInit, PasswordEncoder, Requisite, Requisites } from '@jeaks03/overseer-core';
import { Connection } from "typeorm";
import Customer from "../entities/customer.model";
import { environment } from './environment.config';
import * as bcrypt from 'bcryptjs';

@Requisite
export class PasswordEncoderImpl implements PasswordEncoder {
  encode(rawPassword: string): string {
    return bcrypt.hashSync(rawPassword, bcrypt.genSaltSync(8));
  }
  matches(encodedPassword: string, rawPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, encodedPassword);
  }
}

@Requisite
export class SecurityComponent {
  constructor(private connection: Connection, private passwordEncoder: PasswordEncoderImpl) { }

  @OnInit()
  setupAuthentication(): void {
    const jwt = new JWTAuthentication('1h',
        (username: string) => this.connection.getRepository(Customer).findOne({ username }),
         this.passwordEncoder,
         environment.secretKey);

    Requisites.addInstance(jwt, true);
  }
}

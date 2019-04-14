import { JWTAuthentication, Requisite, Requisites, OnInit } from '@jeaks03/overseer-core';
import { Connection } from "typeorm";
import Customer from "../entities/customer.model";

@Requisite
export class SecurityComponent {
  constructor(private connection: Connection) { }

  @OnInit()
  setupAuthentication(): void {
    const jwt = new JWTAuthentication('1h', (username: string) => {
      return this.connection.getRepository(Customer).findOne({ username })
    });

    Requisites.addInstance(jwt, true);
  }
}

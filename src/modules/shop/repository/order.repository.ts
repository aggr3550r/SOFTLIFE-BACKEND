import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Order } from "../entities/order.entity";

@Injectable()
@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}

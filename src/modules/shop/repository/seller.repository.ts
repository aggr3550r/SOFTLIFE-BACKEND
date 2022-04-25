import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Seller } from "../entities/seller.entity";

@Injectable()
@EntityRepository(Seller) 
export class SellerRepository extends Repository<Seller> {}
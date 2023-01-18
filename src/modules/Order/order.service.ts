import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../../generic/abstract.service';
import { Order } from '../../models/order.entity';
import { Repository } from 'typeorm';
import { UserService } from '../User/user.service';

@Injectable()
export class OrderService extends AbstractService<Order>{
    constructor(
        @InjectRepository(Order) private readonly repo: Repository<Order>,
        private readonly userservice: UserService
    ) {
        super(repo)
    }

    async makeOrder(req) {
        const userCart = await this.userservice.getUserCart(req)
        return userCart
    }
}

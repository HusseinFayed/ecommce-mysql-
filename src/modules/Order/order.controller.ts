import { Controller } from '@nestjs/common';
import { Body, HttpCode, Post, Req, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ControllerFactory } from '../../generic/abstract.controller';
import { Order } from '../../models/order.entity';
import { OrderService } from './order.service';

@Controller()
export class OrderController extends ControllerFactory<Order>(Order) {
    constructor(private orderService: OrderService
    ) {
        super(OrderService)
    }
    @Post('make-order')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async makeOrder(@Req() req) {
        return await this.orderService.makeOrder(req);
    }

}

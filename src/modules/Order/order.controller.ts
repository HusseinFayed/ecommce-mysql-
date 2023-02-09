import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { Body, Get, HttpCode, Param, Post, Render, Req, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { ControllerFactory } from '../../generic/abstract.controller';
import { Order } from '../../models/order.entity';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Order')

export class OrderController extends ControllerFactory<Order>(Order) {
    constructor(private orderService: OrderService
    ) {
        super(OrderService)
    }
    @Post('make-order')
    @UseGuards(JwtAuthGuard)
    // @HttpCode(200)
    @UsePipes(ValidationPipe)
    async makeOrder(@Req() req) {
        return await this.orderService.makeOrder(req);
    }

    @UseGuards(JwtAuthGuard)
    @Post('confirm-Order')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async confirmOrder(@Req() req) {
        return await this.orderService.confirmOrder(req);
    }

    @Get('print-recipe/:id')
    @Render('print-recipe')
    async printRecipe(@Param('id') id) {
        const recipe = await this.orderService.getRecipeById(id)
        if (!recipe) {
            throw new HttpException('No Recipe By That Id', HttpStatus.BAD_REQUEST)
        }
        return await this.orderService.printRecipe(id)
            .then((result) => result ? { orders: result } : { orders: [] });
    }

}

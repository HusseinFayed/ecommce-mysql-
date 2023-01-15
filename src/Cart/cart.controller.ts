import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, 
    ParseIntPipe, Patch, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { ProductService } from '../Product/product.service';
import { ControllerFactory } from '../generic/abstract.controller';
import { CartDto } from './cart.dto';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Controller()
export class CartController extends ControllerFactory<Cart>(Cart){
    constructor(private cartService: CartService,
        private productService: ProductService
        ){
            super(CartService,ProductService)
        }
    @Post('add-to-cart')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createCart(@Req() req,@Body()cart: CartDto){
        return await this.cartService.createCart(cart,  req);
    }

    @Get('get-cartById/:id')
    async getCartById (@Param('id',ParseIntPipe) id:number): Promise<Cart>{
        const cart = await this.cartService.getCartById(id)
        if(!cart){
            throw new HttpException('No Cart By That Id', HttpStatus.BAD_REQUEST)
        }
        return cart
    }

    @UseGuards(JwtAuthGuard)
    @Patch('edit-cart/:id')
    async editCart(@Req() req,@Param('id') id: number, @Body()cart:CartDto) {
        const cartCheck = await this.cartService.getCartById(id)
        if(!cartCheck){
            throw new HttpException('No Cart By That Id', HttpStatus.BAD_REQUEST)
        }
        if(req.user.name !== cartCheck.user_name) {
            throw new HttpException('Not authorized to edit cart', HttpStatus.UNAUTHORIZED)
        }
        return await this.cartService.editCart(id,cart)
    }


}
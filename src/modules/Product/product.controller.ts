
import {
    Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param,
    ParseIntPipe, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import { JwtAuthGuard } from '../../Auth/jwt-auth.guard';
import { ProductDto } from '../../dtos/product.dto';
import { ControllerFactory } from '../../generic/abstract.controller';
import { Product } from '../../models/product.entity';
import { UserService } from '../User/user.service';
import { ProductService } from './product.service';


@Controller()
export class ProductController extends ControllerFactory<Product>(Product) {
    constructor(private productService: ProductService,
        private userService: UserService
    ) {
        super(ProductService);
    }
    @UseGuards(JwtAuthGuard)
    @Post('add-product')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createProduct(@Req() req, @Body() product: ProductDto) {
        const user = await this.userService.getUserByUserName(req.user.name)
        if (user.role == '0') {
            throw new HttpException('Buyer cant input product', HttpStatus.UNAUTHORIZED)
        }
        return await this.productService.createProduct(product, req);
    }

    @Get('get-productById/:id')
    async getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        const product = await this.productService.getProductById(id)
        if (!product) {
            throw new HttpException('No product By That id', HttpStatus.BAD_REQUEST)
        }
        return product
    }

}



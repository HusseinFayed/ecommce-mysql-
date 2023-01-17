import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../models/product.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../../generic/abstract.service';
import { CartDto } from '../../dtos/cart.dto';
import { Cart } from '../../models/cart.entity';

@Injectable()
export class CartService extends AbstractService<Cart> {
    constructor(
        @InjectRepository(Cart) private readonly repo: Repository<Cart>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) {
        super(repo);
    }
    async createCart(cart: CartDto, req) {
        const product_check = await this.productRepository.findOne({ where: { id: cart.productId } })
        if (!product_check) {
            throw new HttpException('No Product By That ID', HttpStatus.BAD_REQUEST);
        }
        const productss = await this.productRepository.findOne({ where: { id: cart.productId } })
        const price = productss.price
        const product = await this.getProductById(cart.productId)
        const newCart = await this.repo.save({
            user_name: await req.user.name,
            qty: cart.qty,
            productId: cart.productId,
            price: price,
            total_price: price * cart.qty
        });
        product.carts = [...product.carts, newCart];
        await product.save();
        return newCart;
    }

    async getProductById(id: number): Promise<Product> {
        return await this.productRepository.findOne({ where: { id: id }, relations: ['carts'] })
    }

    async getCartById(id: number): Promise<Cart> {
        return await this.repo.findOne({ where: { id: id }, relations: ['product'] })
    }

    async editCart(id: number, cart: CartDto) {
        await this.repo.update({ id: id }, { qty: cart.qty })
    }
}
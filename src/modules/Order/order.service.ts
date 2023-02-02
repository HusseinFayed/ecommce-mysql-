import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../../generic/abstract.service';
import { Order } from '../../models/order.entity';
import { Cart } from '../../models/cart.entity';
import { Product } from '../../models/product.entity';
import { Repository } from 'typeorm';
import { UserService } from '../User/user.service';
import { Recipe } from '../../models/recipe.entity';
import { LOADIPHLPAPI } from 'dns';

@Injectable()
export class OrderService extends AbstractService<Order>{
    constructor(
        @InjectRepository(Order) private readonly repo: Repository<Order>,
        @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        @InjectRepository(Recipe) private readonly recipeRepo: Repository<Recipe>,
        private readonly userservice: UserService
    ) {
        super(repo)
    }

    async makeOrder(req) {

        const user_name = req.user.name
        console.log('User Name :', user_name);
        const order_number = Math.floor((Math.random() * 1000) + 1)
        console.log('Order Number =', order_number);

        const newRecipe = await this.recipeRepo.save({
            user_name: user_name,
            order_number: order_number,
            status: 'PENDING',
        })

        const user_product = await this.cartRepo.createQueryBuilder('p')
            .where('p.user_name = :user_name', { user_name })
            .select(['p.productId']).getMany()

        user_product.forEach(async (x) => {
            const productId = x.productId
            console.log('Product id', productId);

            const stock = await this.productRepo.createQueryBuilder('p')
                .where('p.id = :id', { id: productId })
                .select(['p.stock']).getMany()
            console.log('Stock =', stock[0].stock);

            const qty = await this.cartRepo.createQueryBuilder('p')
                .where('p.user_name = :user_name', { user_name })
                .andWhere('p.productId = :productId', { productId })
                .select(['p.qty']).getMany()
            console.log('Quantity =', qty[0].qty);

            const updated_stock = Number(stock[0].stock) - Number(qty[0].qty)
            if (updated_stock < 0)
                return "Out Of Stock"
            console.log('Updated Stock =', updated_stock);

            // await this.productRepo.update({ id: productId }, { stock: updated_stock })

            const price = await this.cartRepo.createQueryBuilder('p')
                .where('p.user_name = :user_name', { user_name })
                .andWhere('p.productId = :productId', { productId })
                .select(['p.price']).getMany()
            console.log('Price =', price[0].price);

            const total_price = price[0].price * qty[0].qty
            console.log('Total Price =', total_price);

            const newOrder = await this.repo.save({
                user_name: user_name,
                product_id: productId,
                qty: qty[0].qty,
                price: price[0].price,
                total_price: total_price,
                order_number: order_number,
                //sellerName: sellerName[0].user[0],
            })

            //     // // await this.cartRepo.delete({ user_name: user_name })

            var recipe_number = await this.recipeRepo.createQueryBuilder('p')
                .where('p.order_number = :order_number', { order_number })
                .select(['p.id']).getMany()
            console.log('Recipe Number =', recipe_number[0].id);

            await this.repo.update({ order_number: order_number }, { recipe_number: recipe_number[0].id })
        })

    }
}






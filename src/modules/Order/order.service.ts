import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../../generic/abstract.service';
import { Order } from '../../models/order.entity';
import { Cart } from '../../models/cart.entity';
import { Product } from '../../models/product.entity';
import { getRepository, Repository } from 'typeorm';
import { Recipe } from '../../models/recipe.entity';
import { User } from '../../models/user.entity';

@Injectable()
export class OrderService extends AbstractService<Order> {
    constructor(
        @InjectRepository(Order) private readonly repo: Repository<Order>,
        @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        @InjectRepository(Recipe) private readonly recipeRepo: Repository<Recipe>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {
        super(repo);
    }

    async getRecipeById(id: number): Promise<Recipe> {
        return await this.recipeRepo.findOne({ where: { id: id } });
    }

    async makeOrder(req) {
        const user_name = req.user.name;
        console.log('User Name :', user_name);
        const order_number = Math.floor(Math.random() * 1000 + 1);
        console.log('Order Number =', order_number);

        const newRecipe = await this.recipeRepo.save({
            user_name: user_name,
            order_number: order_number,
            status: 'PENDING',
        });

        const user_product = await this.cartRepo
            .createQueryBuilder('p')
            .where('p.user_name = :user_name', { user_name })
            .select(['p.productId'])
            .getMany();

        user_product.forEach(async (x) => {
            const productId = x.productId;
            console.log('Product id', productId);

            const stock = await this.productRepo
                .createQueryBuilder('p')
                .where('p.id = :id', { id: productId })
                .select(['p.stock'])
                .getMany();
            console.log('Stock =', stock[0].stock);

            const qty = await this.cartRepo
                .createQueryBuilder('p')
                .where('p.user_name = :user_name', { user_name })
                .andWhere('p.productId = :productId', { productId })
                .select(['p.qty'])
                .getMany();
            console.log('Quantity =', qty[0].qty);

            const updated_stock = Number(stock[0].stock) - Number(qty[0].qty);
            console.log('Updated Stock =', updated_stock);

            if (updated_stock < 0) return 'Out Of Stock';

            await this.productRepo.update(
                { id: productId },
                { stock: updated_stock },
            );

            const price = await this.cartRepo
                .createQueryBuilder('p')
                .where('p.user_name = :user_name', { user_name })
                .andWhere('p.productId = :productId', { productId })
                .select(['p.price'])
                .getMany();
            console.log('Price =', price[0].price);

            const total_price = price[0].price * qty[0].qty;
            console.log('Total Price =', total_price);

            const seller_name = await this.productRepo.createQueryBuilder('p')
                .where('p.id = :id', { id: productId })
                .select('p.userName')
                .getMany()
            console.log('Seller Name =', seller_name[0].userName);

            const newOrder = await this.repo.save({
                user_name: user_name,
                product_id: productId,
                qty: qty[0].qty,
                price: price[0].price,
                total_price: total_price,
                order_number: order_number,
                seller_name: seller_name[0].userName,
            });

            await this.cartRepo.delete({ user_name: user_name });

            var recipe_number = await this.recipeRepo
                .createQueryBuilder('p')
                .where('p.order_number = :order_number', { order_number })
                .select(['p.id'])
                .getMany();
            console.log('Recipe Number =', recipe_number[0].id);

            await this.repo.update(
                { order_number: order_number },
                { recipe_number: recipe_number[0].id },
            );
        });
    }

    async confirmOrder(req) {
        const user_name = req.user.name;
        console.log('User: ', user_name);

        var order_numberObj = await this.repo
            .createQueryBuilder('p')
            .where('p.user_name = :user_name', { user_name })
            .select(['p.order_number'])
            .getOne();

        const order_number = order_numberObj.order_number
        console.log('Order Number :', order_number);

        // const userOldDeposit = await this.userRepo
        //     .createQueryBuilder('p')
        //     .where('p.username = :username', { user_name })
        //     .select(['p.deposit'])
        //     .getOne();
        // console.log("User Old Deposit =", userOldDeposit[0].deposit);

        const userOldDeposit = await (
            await this.userRepo.findOne({ where: { username: req.user.name } })
        ).deposit;
        console.log('User Old Deposit =', userOldDeposit);

        var total_recipe = await this.repo.query(
            `SELECT SUM (total_price) From orders WHERE user_name = '${user_name}'`,
        )
        console.log('Total Recipe', total_recipe.at(0)['SUM (total_price)']);

        if (userOldDeposit < total_recipe.at(0)['SUM (total_price)']) {
            throw new HttpException('You Dont have enough CREDIT', HttpStatus.BAD_REQUEST)
        }

        const updatedBuyerDeposit = userOldDeposit - total_recipe.at(0)['SUM (total_price)']
        console.log('Updated Buyer Deposit =', updatedBuyerDeposit);

        await this.userRepo.update(
            { username: user_name },
            { deposit: updatedBuyerDeposit }
        )

        await this.recipeRepo.update({ user_name: user_name }, { status: "PAID" })

        const sellerProduct = await this.repo
            .createQueryBuilder('p')
            .where('p.order_number = :order_number', { order_number })
            .select(['p.product_id'])
            .getMany();
        console.log('Product Id :', sellerProduct);


        sellerProduct.forEach(async (y) => {

            const product_id = y.product_id
            console.log('Product:', product_id);

            const sellerName = (await this.productRepo
                .findOne({ where: { id: product_id } })).userName
            console.log('Seller Name :', sellerName);

            // // const oldSellerDeposit = await this.userRepo.createQueryBuilder('p')
            // //     .where('p.username = :username', { sellerName })
            // //     .select(['p.deposit'])
            // //     .getMany();
            // // console.log('Old Seller Deposit =', oldSellerDeposit);

            const oldSellerDeposit = (await this.userRepo
                .findOne({ where: { username: sellerName } })).deposit
            console.log('Old Seller Deposit =', oldSellerDeposit);

            var total_recipe = await this.repo.query(
                `SELECT SUM (total_price) From orders WHERE seller_name = '${sellerName}' && order_number = '${order_number}'`,
            )
            console.log('Total Recipe', total_recipe.at(0)['SUM (total_price)']);

            const newSellerDeposit = +oldSellerDeposit + +total_recipe.at(0)['SUM (total_price)']
            console.log('New Seller Deposit =', newSellerDeposit);

            await this.userRepo.update({ username: sellerName }, { deposit: newSellerDeposit })
        })
    }

    async printRecipe(id): Promise<Order[]> {
        var user_name = await this.recipeRepo.createQueryBuilder('p')
            .where('p.id = :id', { id })
            .select(['p.user_name'])
            .getMany();
        console.log('User Name:', user_name[0].user_name);

        var order_number = await this.recipeRepo.createQueryBuilder('p')
            .where('p.id = :id', { id })
            .select(['p.order_number'])
            .getMany();
        console.log("Order Number :", order_number[0].order_number)

        const orders = await this.repo.createQueryBuilder('p')
            .where('p.order_number = :order_number', { order_number: order_number[0].order_number }).getMany();
        console.log(orders);

        return (orders)
    }

    async findAllRecipes(): Promise<Recipe[]> {
        return await this.recipeRepo.find({})
    }

    async findAllOrders(): Promise<Order[]> {
        return await this.repo.find({})
    }

    // async searchOrders(args: string) {
    //     const searchOrders = (args: any) => {
    //         const { searchQuery } = args;
    //         const repo = getRepository(Order);

    //         const x = this.repo.createQueryBuilder().select()
    //             .where(`MATCH(user_name) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
    //             .orWhere(`MATCH(product_id) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
    //             .orWhere(`MATCH(qty) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
    //             .orWhere(`MATCH(price) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
    //             .orWhere(`MATCH(total_price) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
    //             .orWhere(`MATCH(order_number) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
    //             .orWhere(`MATCH(recipe_number) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
    //             .orWhere(`MATCH(seller_name) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
    //             .getMany();
    //             console.log(x);
    //     }


}




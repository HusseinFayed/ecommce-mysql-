import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { Repository } from 'typeorm';
import { ProductDto } from '../../dtos/product.dto';
import { AbstractService } from '../../generic/abstract.service';
import { Product } from '../../models/product.entity';
import { CategoryService } from '../Category/category.service';
import { UserService } from '../User/user.service';



@Injectable()
export class ProductService extends AbstractService<Product> {
    constructor(
        @InjectRepository(Product) private readonly repo: Repository<Product>,
        // @InjectRepository(Category) private categoryRepository: Repository<Category>
        private readonly categoryService: CategoryService,
        private readonly userService: UserService,
    ) {
        super(repo);
    }
    async createProduct(product: ProductDto, req) {
        const category = await this.categoryService.getCategoryById(product.categoryId)
        const user = await this.userService.getUserById(product.userId)
        console.log(req.user.name)
        const newProduct = await this.repo.save({
            name_ar: product.name_ar,
            name_en: product.name_en,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId,
            userName: req.user.name,
            userId: product.userId,
        });
        category.products = [...category.products, newProduct];
        await category.save();
        user.products = [...user.products, newProduct]
        await user.save();
        return newProduct;
    }

    // async createCategory(category:CategoryDto){
    //     return await this.categoryRepository.save(category)
    // }

    // async getCategoryById(id: number): Promise<Category> {
    //     return await this.categoryRepository.findOne({ where:{id:id}, relations: ['products'] });
    // }

    async getProductById(id: number): Promise<Product> {
        return await this.repo.findOne({ where: { id: id }, relations: ['category'] })
    }
}

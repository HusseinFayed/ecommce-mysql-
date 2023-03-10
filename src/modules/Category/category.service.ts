import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from '../../dtos/category.dto';
import { AbstractService } from '../../generic/abstract.service';
import { Category } from '../../models/category.entity';


@Injectable()
export class CategoryService extends AbstractService<Category> {
    constructor(
        @InjectRepository(Category) private readonly repo: Repository<Category>
    ) {
        super(repo);
    }
    async createCategory(category: CategoryDto, user) {
        const newCategory = await this.repo.save({
            name_ar: category.name_ar,
            name_en: category.name_en,
        })
    }
    async getCategoryById(id: number): Promise<Category> {
        return await this.repo.findOne({ where: { id: id }, relations: ['products'] });
    }
}

import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Req, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../Auth/jwt-auth.guard';
import { CategoryDto } from '../../dtos/category.dto';
import { ControllerFactory } from '../../generic/abstract.controller';
import { Category } from '../../models/category.entity';
import { UserService } from '../User/user.service';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController extends ControllerFactory<Category>(Category) {
    constructor(private categoryService: CategoryService,
        private userService: UserService
    ) {
        super(CategoryService)
    }

    @UseGuards(JwtAuthGuard)
    @Post('add-category')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createCategory(@Req() req, @Body() category: CategoryDto) {
        const user = await this.userService.getUserByUserName(req.user.name)
        if (user.role == '0') {
            throw new HttpException('Buyer cant insert category', HttpStatus.UNAUTHORIZED)
        }
        return await this.categoryService.createCategory(category, user);
    }

    @Get('get-categoryById/:id')
    async getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return await this.categoryService.getCategoryById(id)
    }
}

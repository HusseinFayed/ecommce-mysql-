import { IsNotEmpty } from "class-validator";

export class ProductDto {
    @IsNotEmpty({ message: 'Product Must Have Arabic Name'})
    name_ar: string;


    @IsNotEmpty({ message: 'Product Must Have English Name'})
    name_en: string;

    @IsNotEmpty({ message: 'Please Enter Product Stock'})
    stock: number;

    @IsNotEmpty({ message: 'Please Enter Product Price'})
    price:number;

    @IsNotEmpty({ message: 'Please Enter Product Category ID'})
    categoryId: number

    // @IsNotEmpty({ message: 'Please Enter Product Seller'})
    // userId: number

}
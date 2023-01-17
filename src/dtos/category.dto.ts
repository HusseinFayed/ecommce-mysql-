import { IsNotEmpty } from "class-validator";

export class CategoryDto {
    @IsNotEmpty({ message: 'Category Must Have Arabic Name'})
    name_ar: string;


    @IsNotEmpty({ message: 'Category Must Have English Name'})
    name_en: string;

    // @IsNotEmpty({ message: 'Please Enter Product Seller'})
    // userId: number

}
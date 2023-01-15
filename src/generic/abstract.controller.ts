// import { Body, Get, Post, Query, Type } from '@nestjs/common';
// import { ApiBody, ApiBodyOptions, ApiTags } from '@nestjs/swagger';
// import { User } from '../entities/user.entitiy';
// import { AbstractService } from './abstract.service';
// import { OApiBody } from './api-body.decorator';

import { Injectable, ValidationPipe, ValidationPipeOptions, Type, ArgumentMetadata, Post, UsePipes, Body, Get, Param, Query, Patch, Put, Delete, ClassSerializerInterceptor, UseInterceptors, UseGuards } from "@nestjs/common";
import { ApiBody, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { Pagination, IPaginationMeta } from "nestjs-typeorm-paginate";
import { DeleteResult } from "typeorm";

import { AbstractService } from "./abstract.service";
import { OBaseEntity } from "../generic/base.entity";
import { AbstractValidationPipe } from "./abstract-validation.pipe";




export function ControllerFactory<E>(model: Type<E>):any {

    const createPipe = new AbstractValidationPipe({ whitelist: true, transform: true }, { body: model });

    class AbstractController<E, Service extends AbstractService<any>> {

        constructor(private service: Service) {

        }

        @Post()
        // @UsePipes(createPipe)
        // @UseGuards(JwtAuthGuard)
        @UseInterceptors(ClassSerializerInterceptor)
        @ApiBody({ type: model })
        @ApiResponse({ type: model })
        async saveOne(@Body() body: E):Promise <E> {
            console.log(body)
            return await this.service.save(body)
        }

        @Post('arr')
        @UseInterceptors(ClassSerializerInterceptor)
        // @UseGuards(JwtAuthGuard)
        @ApiResponse({ type: model, isArray: true })
        @ApiBody({ type: model, isArray: true })
        async saveArray(@Body() body: E[]): Promise<E[]> {
            return this.service.saveAll(body);
        }

        @UseInterceptors(ClassSerializerInterceptor)
        @Get()
        // @UseGuards(JwtAuthGuard)
        @ApiResponse({ type: model, isArray: true })
        async findAll(@Query('page') page: number, @Query('pageSize') pageSize: number): Promise<E[] | Pagination<E, IPaginationMeta>> {
            return page ? this.service.findPaginated({ page: page, pageSize: pageSize ?? 100 }) : this.service.findAll();
        }


        @Get('count')
        // @UseGuards(JwtAuthGuard)
        async count(): Promise<number> {
            return this.service.count();
        }


        @Get('allAndCount')
        // @UseGuards(JwtAuthGuard)
        @UseInterceptors(ClassSerializerInterceptor)
        @ApiResponse({
            type: () => {
                return { records: [model], count: Number }
            }, isArray: true
        })
        async findAllAndCount(): Promise<{ records: E[], count: number }> {
            return this.service.findAllAndCount();
        }

        // @Get(':id')
        // // @UseGuards(JwtAuthGuard)
        // @UseInterceptors(ClassSerializerInterceptor)
        // @ApiResponse({ type: model })
        // async findById(@Param('id') id: number,): Promise<E> {
        //     return this.service.findById(id);
        // }

        @Put(':id')
        // @UseGuards(JwtAuthGuard)
        @UseInterceptors(ClassSerializerInterceptor)
        @ApiBody({ type: model })
        @ApiResponse({ type: model })
        async updateOne(@Param('id') id: number, @Body() body: E): Promise<E> {
            return this.service.update(id, body);
        }

        @Delete(':id')
        // @UseGuards(JwtAuthGuard)
        @ApiResponse({ type: DeleteResult })
        async deleteOne(@Param('id') id: number): Promise<DeleteResult> {
            return this.service.delete(id);
        }
    }

    return AbstractController;
}

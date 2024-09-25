// src/name.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { NameService } from './name.service';
import { Name } from './name.entity';

@Controller('names') // Defines the base route for this controller
export class NameController {
  constructor(private readonly nameService: NameService) {}

  @Post() // Handles POST requests to create a new Name
  async create(@Body() name: Name) {
    return this.nameService.create(name);
  }

  @Get() // Handles GET requests to retrieve all Names
  async findAll() {
    return this.nameService.findAll();
  }

  @Get(':id') // Handles GET requests to retrieve a specific Name by ID
  async findOne(@Param('id') id: string) {
    return this.nameService.findOne(id);
  }

  @Put(':id') // Handles PUT requests to update a specific Name by ID
  async update(@Param('id') id: string, @Body() name: Partial<Name>) {
    await this.nameService.update(id, name);
    return { success: true };
  }

  @Delete(':id') // Handles DELETE requests to delete a specific Name by ID
  async delete(@Param('id') id: string) {
    await this.nameService.delete(id);
    return { success: true };
  }
}

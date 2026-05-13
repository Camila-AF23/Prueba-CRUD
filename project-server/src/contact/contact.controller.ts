import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import type { IRequestAuth } from '../auth/request-auth';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateContactDTO } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll(@Request() req: IRequestAuth) {
    return await this.contactService.getAllContactsByUser(req.user.id); //
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getContact(@Param('id', ParseIntPipe) id: number) {
    return await this.contactService.getContactByID(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createContact(
    @Request() req: IRequestAuth,
    @Body() body: CreateContactDTO,
  ) {
    return await this.contactService.createContact(req.user.id, body); //
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateContactDTO,
  ) {
    return await this.contactService.updateContact(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteContact(@Param('id', ParseIntPipe) id: number) {
    return await this.contactService.deleteContact(id);
  }
}

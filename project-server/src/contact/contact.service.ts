import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ContactEntity } from './contact.entity';
import { CreateContactDTO } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllContactsByUser(
    userID: number,
  ): Promise<ContactEntity[] | undefined> {
    try {
      const contacts = await this.prisma.contact.findMany({
        where: { userID },
        include: { user: true }, //
      });
      return contacts;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async getContactByID(id: number): Promise<ContactEntity | undefined> {
    try {
      const contact = await this.prisma.contact.findUnique({
        where: { id },
        include: { user: true }, //
      });
      if (!contact) {
        throw new NotFoundException(`Contacto no encotrado`);
      }
      return contact;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async createContact(
    userID: number,
    body: CreateContactDTO,
  ): Promise<ContactEntity | undefined> {
    try {
      const newcontact = await this.prisma.contact.create({
        data: {
          lastname: body.lastname,
          email: body.email,
          phone: body.phone,
          userID,
        },
        include: { user: true },
      });
      return newcontact;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async updateContact(
    id: number,
    body: CreateContactDTO,
  ): Promise<ContactEntity | undefined> {
    try {
      const contact = await this.prisma.contact.findUnique({
        where: { id },
      });
      if (!contact) {
        throw new NotFoundException(`Contacto no encotrado`);
      }
      const updatedcontact = await this.prisma.contact.update({
        where: { id },
        data: {
          lastname: body.lastname,
          email: body.email,
          phone: body.phone,
        },
        include: { user: true }, //
      });
      return updatedcontact;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async deleteContact(id: number): Promise<ContactEntity | undefined> {
    try {
      const contact = await this.prisma.contact.findUnique({
        where: { id },
        include: { user: true },
      });
      if (!contact) {
        throw new NotFoundException(`Contacto no encotrado`);
      }
      const deletedcontact = await this.prisma.contact.delete({
        where: { id },
        include: { user: true },
      });
      return deletedcontact;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}

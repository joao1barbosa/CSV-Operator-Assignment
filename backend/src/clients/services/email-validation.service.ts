import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientRepository } from '../repositories/clients.repository';

@Injectable()
export class EmailValidationService {
  constructor(private respository: ClientRepository) {}

  async ensureEmailDoesNotExist(email: string): Promise<void> {
    const emailExist = await this.respository.findByEmail(email);
    if (!!emailExist) {
      throw new BadRequestException(`O email já está em uso.`);
    }
  }
}

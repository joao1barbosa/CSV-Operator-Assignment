import { Injectable, NotFoundException } from '@nestjs/common';
import { OperatorsRepository } from 'src/operators/repositories/operators.repository';

@Injectable()
export class OperatorValidationService {
  constructor(private repository: OperatorsRepository) {}

  async validateOperatorExists(id: number): Promise<void> {
    try {
      await this.repository.findOne(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException(`O operador com ID ${id} não existe.`);
    }
  }
}

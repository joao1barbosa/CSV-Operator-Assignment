import { Inject, Injectable, Scope } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable({ scope: Scope.REQUEST })
export class OperatorExistsValidator implements ValidatorConstraintInterface {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async validate(
    operatorId: number,
    args: ValidationArguments,
  ): Promise<boolean> {
    const operator = await this.prisma.operator.findUnique({
      where: { id: operatorId },
    });
    return !!operator;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Operator with id ${args.value} does not exist.`;
  }
}

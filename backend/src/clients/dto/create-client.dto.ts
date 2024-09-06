import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsDateFormat } from '../validators/is-date-format.validator';
import { OperatorExistsValidator } from '../validators/operator-exists.validator';

export class CreateClientDto {
  @IsString({
    message: 'Nome deve ser uma string.',
  })
  @Length(3, 100, {
    message: 'Tamanho de nome inválido.',
  })
  name: string;

  @IsNotEmpty({
    message: 'Data de nascimento não pode ser vazio.',
  })
  @IsDateFormat({
    message: 'Data de nascimento deve estar no formato dd/mm/yyyy.',
  })
  birth_date: string;

  @IsNotEmpty({
    message: 'Valor não pode ser vazio.',
  })
  @IsInt({
    message: 'Valor dever ser um inteiro',
  })
  value: number;

  @IsNotEmpty({
    message: 'Email não pode ser vazio.',
  })
  @IsEmail({}, { message: 'Formato de email inválido.' })
  email: string;

  @IsOptional()
  @Validate(OperatorExistsValidator)
  @IsInt({
    message: 'O ID do operador dever ser um inteiro.',
  })
  operatorId: number | null;
}

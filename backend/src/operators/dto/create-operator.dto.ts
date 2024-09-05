import { IsString, Length } from 'class-validator';

export class CreateOperatorDto {
  @IsString({
    message: 'Nome deve ser uma string',
  })
  @Length(3, 100, {
    message: 'Tamanho de nome inválido',
  })
  name: string;
}

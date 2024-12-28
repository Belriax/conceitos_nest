import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parseValue = Number(value);

    if (isNaN(parseValue)) {
      throw new BadRequestException(
        'ParseIntIdPipe espera uma string numérica',
      );
    }

    if (parseValue < 0) {
      throw new BadRequestException(
        'ParseIntIdPipe espera um numéro maior que zero',
      );
    }

    console.log(`Executando o id: ${parseValue}`);
    return parseValue;
  }
}

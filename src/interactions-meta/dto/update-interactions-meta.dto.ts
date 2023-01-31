import { PartialType } from '@nestjs/mapped-types';
import { CreateInteractionsMetaDto } from './create-interactions-meta.dto';

export class UpdateInteractionsMetaDto extends PartialType(CreateInteractionsMetaDto) {
    key: string
    value: string
}

import { PartialType } from '@nestjs/swagger';
import { CreateSavedCollectionDto } from './create-saved-collection.dto';

export class UpdateSavedCollectionDto extends PartialType(CreateSavedCollectionDto) {}

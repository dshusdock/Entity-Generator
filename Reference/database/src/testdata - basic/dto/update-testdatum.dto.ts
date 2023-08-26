import { PartialType } from '@nestjs/mapped-types';
import { CreateTestdatumDto } from './create-testdatum.dto';

export class UpdateTestdatumDto extends PartialType(CreateTestdatumDto) {}

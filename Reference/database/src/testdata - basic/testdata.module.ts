import { Module } from '@nestjs/common';
import { TestdataService } from './testdata.service';
import { TestdataController } from './testdata.controller';

@Module({
  controllers: [TestdataController],
  providers: [TestdataService]
})
export class TestdataModule {}

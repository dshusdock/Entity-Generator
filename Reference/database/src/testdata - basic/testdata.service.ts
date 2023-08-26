import { Injectable } from '@nestjs/common';
import { CreateTestdatumDto } from './dto/create-testdatum.dto';
import { UpdateTestdatumDto } from './dto/update-testdatum.dto';

@Injectable()
export class TestdataService {
  create(createTestdatumDto: CreateTestdatumDto) {
    return 'This action adds a new testdatum';
  }

  findAll() {
    return `This action returns all testdata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testdatum`;
  }

  update(id: number, updateTestdatumDto: UpdateTestdatumDto) {
    return `This action updates a #${id} testdatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} testdatum`;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestdataService } from './testdata.service';
import { CreateTestdatumDto } from './dto/create-testdatum.dto';
import { UpdateTestdatumDto } from './dto/update-testdatum.dto';

@Controller('testdata')
export class TestdataController {
  constructor(private readonly testdataService: TestdataService) {}

  @Post()
  create(@Body() createTestdatumDto: CreateTestdatumDto) {
    return this.testdataService.create(createTestdatumDto);
  }

  @Get()
  findAll() {
    return this.testdataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testdataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestdatumDto: UpdateTestdatumDto) {
    return this.testdataService.update(+id, updateTestdatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testdataService.remove(+id);
  }
}

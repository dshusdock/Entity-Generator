import { Test, TestingModule } from '@nestjs/testing';
import { TestdataController } from './testdata.controller';
import { TestdataService } from './testdata.service';

describe('TestdataController', () => {
  let controller: TestdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestdataController],
      providers: [TestdataService],
    }).compile();

    controller = module.get<TestdataController>(TestdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';

const tmpltVals = {
    name: '',
    lowercaseName: ''
}

@Injectable({
    providedIn: 'root'
})
export class ControllerFileCreatorService {

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        tmpltVals.name = this.entityInfoSvc.entityClassName;
        tmpltVals.lowercaseName = tmpltVals.name.toLocaleLowerCase();
        const file = new Blob([repositoryTmplt2()], { type: "text/plain" });
        return file;

    }
}

function repositoryTmplt() {
    return `import { Injectable, Logger } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import { AbstractRepository } from '../database/abstract.repository';
    import { User } from './models/${tmpltVals.lowercaseName}.model';
    import { UserDocument } from './models/${tmpltVals.lowercaseName}.schema';
    
    @Injectable()
    export class ${tmpltVals.name}sRepository extends AbstractRepository<${tmpltVals.name}Document> {
      protected readonly logger = new Logger(${tmpltVals.name}sRepository.name);
    
      constructor(@InjectModel(${tmpltVals.name}.name) ${tmpltVals.lowercaseName}Model: Model<${tmpltVals.name}Document>) {
        super(${tmpltVals.name}Model);
      }
    }
    `;
}

function repositoryTmplt2() { 
    return `import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
    }`;
}
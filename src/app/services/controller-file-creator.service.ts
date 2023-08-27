import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';

const tmpltVals = {
    name: '',
    lowercaseName: '',
    firstLetterLowerCase: ''
}

@Injectable({
    providedIn: 'root'
})
export class ControllerFileCreatorService {

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        tmpltVals.name = this.entityInfoSvc.entityClassName;
        tmpltVals.lowercaseName = tmpltVals.name.toLocaleLowerCase();
        tmpltVals.firstLetterLowerCase = tmpltVals.name.charAt(0).toLowerCase() + 
          tmpltVals.name.slice(1);
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
import { ${tmpltVals.name}Service } from './${tmpltVals.lowercaseName}.service';
import { Create${tmpltVals.name}Dto } from './dto/create-${tmpltVals.lowercaseName}.dto';
import { Update${tmpltVals.name}Dto } from './dto/update-${tmpltVals.lowercaseName}.dto';
    
@Controller('${tmpltVals.lowercaseName}')
export class ${tmpltVals.name}Controller {
    constructor(private readonly ${tmpltVals.firstLetterLowerCase}Svc: ${tmpltVals.name}Service) {}
      
    @Post()
    create(@Body() create${tmpltVals.name}Dto: Create${tmpltVals.name}Dto) {
        return ${tmpltVals.firstLetterLowerCase}Svc.create(create${tmpltVals.name}Dto);
    }
      
    @Get()
    findAll() {
        return ${tmpltVals.firstLetterLowerCase}Svc.findAll();
    }
      
    @Get(':id')
    findOne(@Param('id') id: string) {
        return ${tmpltVals.firstLetterLowerCase}Svc.findOne(+id);
    }
      
    @Patch(':id')
    update(@Param('id') id: string, @Body() update${tmpltVals.name}Dto: Update${tmpltVals.name}Dto) {
        return ${tmpltVals.firstLetterLowerCase}Svc.update(+id, update${tmpltVals.name}Dto);
    }
      
    @Delete(':id')
    remove(@Param('id') id: string) {
        return ${tmpltVals.firstLetterLowerCase}Svc.remove(+id);
    }
}`;
}
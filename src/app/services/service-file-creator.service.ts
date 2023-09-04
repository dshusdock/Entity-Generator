import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';
import { AppInfoService } from './app-info.service';

const tmpltVals = {
    name: '',
    lowercaseName: ''
}

@Injectable({
    providedIn: 'root'
})
export class ServiceFileCreatorService {

    constructor(private readonly entityInfoSvc: EntityInfoService, private readonly appInfoSvc: AppInfoService) { }

    generateFile(): Blob {
        let file: any = {};
        let someFunc = serviceTmplt;

        tmpltVals.name = this.entityInfoSvc.entityClassName;
        tmpltVals.lowercaseName = tmpltVals.name.toLocaleLowerCase();
        let list = this.entityInfoSvc.getEntityListArray();

        if (this.appInfoSvc.mongoDBSupport) {
            file = new Blob([serviceTmplt(list)], { type: "text/plain" });    
        } else {
            file = new Blob([serviceTmplt2()], { type: "text/plain" });
        }
        
        return file;
    }
}

function serviceTmplt(list: any[]) {
    return `import {
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException,
  } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Get${tmpltVals.name}Args } from './dto/args/get-${tmpltVals.lowercaseName}-args.dto';
import { Create${tmpltVals.name}Input } from './dto/input/create-${tmpltVals.lowercaseName}-input.dto';
import { ${tmpltVals.name} } from './models/${tmpltVals.lowercaseName}.model';
import { ${tmpltVals.name}Document } from './models/${tmpltVals.lowercaseName}.schema';
import { ${tmpltVals.name}sRepository } from './${tmpltVals.lowercaseName}s.repository';
  
@Injectable()
export class ${tmpltVals.name}sService {
    constructor(private readonly ${tmpltVals.lowercaseName}sRepository: ${tmpltVals.name}sRepository) {}
  
    async create${tmpltVals.name}(create${tmpltVals.name}Data: Create${tmpltVals.name}Input) {
        await this.validateCreate${tmpltVals.name}Data(create${tmpltVals.name}Data);
            const ${tmpltVals.lowercaseName}Document = await this.${tmpltVals.lowercaseName}sRepository.create({
                ...create${tmpltVals.name}Data,
            password: await bcrypt.hash(create${tmpltVals.name}Data.password, 10),
        });
        return this.toModel(${tmpltVals.lowercaseName}Document);
    }
  
    async get${tmpltVals.name}(get${tmpltVals.name}Args: Get${tmpltVals.name}Args) {
        const ${tmpltVals.lowercaseName}Document = await this.${tmpltVals.lowercaseName}sRepository.findOne(get${tmpltVals.name}Args);
        return this.toModel(${tmpltVals.lowercaseName}Document);
    }
  
    private toModel(${tmpltVals.lowercaseName}Document: ${tmpltVals.name}Document): ${tmpltVals.name} {
        return { 
            _id: ${tmpltVals.lowercaseName}Document._id.toHexString(),
            email: ${tmpltVals.lowercaseName}Document.email,
            ${list.forEach((el) => { console.log(el) })}
        };
    }
}
    `;
}

function serviceTmplt2() {
    return `import { Injectable } from '@nestjs/common';
    import { Create${tmpltVals.name}Dto } from './dto/create-${tmpltVals.lowercaseName}.dto';
    import { Update${tmpltVals.name}Dto } from './dto/update-${tmpltVals.lowercaseName}.dto';
    
    @Injectable()
    export class TestdataService {
        create(create${tmpltVals.name}Dto: Create${tmpltVals.name}Dto) {
          return {};
        }
      
        findAll() {
          return {};
        }
      
        findOne(id: number) {
          return {};
        }
      
        update(id: number, update${tmpltVals.name}Dto: Update${tmpltVals.name}Dto) {
          return {};
        }
      
        remove(id: number) {
          return {};
        }
    }`;
}
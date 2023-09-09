import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';
import { AppInfoService } from './app-info.service';

const tmpltVals = {
    name: '',
    lowercaseName: '',
    firstLetterLowerCase: ''
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
        tmpltVals.firstLetterLowerCase = tmpltVals.name.charAt(0).toLowerCase() + 
          tmpltVals.name.slice(1);

        let list = this.entityInfoSvc.getEntityListArray();

        if (this.appInfoSvc.abstractRepositorySupport) {
            file = new Blob([serviceTmplt(list)], { type: "text/plain" });    
        } else {
            file = new Blob([serviceTmplt2()], { type: "text/plain" });
        }
        
        return file;
    }
}

function serviceTmplt(list: any[]) {
    return `import { Injectable } from '@nestjs/common';
import { Get${tmpltVals.name}Args } from './dto/args/get-${tmpltVals.lowercaseName}-args.dto';
import { Create${tmpltVals.name}Input } from './dto/input/create-${tmpltVals.lowercaseName}-input.dto';
import { ${tmpltVals.name}Document } from './models/${tmpltVals.lowercaseName}.schema';
import { ${tmpltVals.name}sRepository } from './${tmpltVals.lowercaseName}s.repository';
  
@Injectable()
export class ${tmpltVals.name}Service {
    constructor(private readonly ${tmpltVals.firstLetterLowerCase}Repository: ${tmpltVals.name}Repository) {}
    
    create(create${tmpltVals.name}Dto: Create${tmpltVals.name}Dto) {
        return {};
    }

    findAll() {
        return {
            this.${tmpltVals.firstLetterLowerCase}Repository.find({});
        };
    }

    findOne(id: number) {
        return {
            this.${tmpltVals.firstLetterLowerCase}Repository.findOne(id);
        };
    }

    update(id: number, update${tmpltVals.name}Dto: Update${tmpltVals.name}Dto) {
        return {
            this.${tmpltVals.firstLetterLowerCase}Repository.findOneAndUpdate(id, update${tmpltVals.name}Dto);
        };
    }

    remove(id: number) {
        return {
            this.${tmpltVals.firstLetterLowerCase}Repository.deleteOne(id);
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
    export class ${tmpltVals.name}Service {
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
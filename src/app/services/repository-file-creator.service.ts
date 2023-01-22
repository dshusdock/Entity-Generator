import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';

const tmpltVals = {
    name: '',
    lowercaseName: ''
}

@Injectable({
    providedIn: 'root'
})
export class RepositoryFileCreatorService {

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        tmpltVals.name = this.entityInfoSvc.entityClassName;
        tmpltVals.lowercaseName = tmpltVals.name.toLocaleLowerCase();
        const file = new Blob([repositoryTmplt()], { type: "text/plain" });
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
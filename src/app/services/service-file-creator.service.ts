import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';

const tmpltVals = {
    name: '',
    lowercaseName: ''
}

@Injectable({
    providedIn: 'root'
})
export class ServiceFileCreatorService {

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        tmpltVals.name = this.entityInfoSvc.entityClassName;
        tmpltVals.lowercaseName = tmpltVals.name.toLocaleLowerCase();
        const file = new Blob([serviceTmplt()], { type: "text/plain" });
        return file;

    }
}

function serviceTmplt() {
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
  
    private async validateCreate${tmpltVals.name}Data(create${tmpltVals.name}Data: Create${tmpltVals.name}Input) {
      let ${tmpltVals.lowercaseName}: ${tmpltVals.name}Document;
      try {
        ${tmpltVals.lowercaseName} = await this.${tmpltVals.lowercaseName}sRepository.findOne({
          email: create${tmpltVals.name}Data.email,
        });
      } catch (err) {}
      if (${tmpltVals.lowercaseName}) {
        throw new UnprocessableEntityException('Email already exists.');
      }
    }
  
    async get${tmpltVals.name}(get${tmpltVals.name}Args: Get${tmpltVals.name}Args) {
      const ${tmpltVals.lowercaseName}Document = await this.${tmpltVals.lowercaseName}sRepository.findOne(get${tmpltVals.name}Args);
      return this.toModel(${tmpltVals.lowercaseName}Document);
    }
  
    async validate${tmpltVals.name}(email: string, password: string) {
      const ${tmpltVals.lowercaseName}Document = await this.${tmpltVals.lowercaseName}sRepository.findOne({ email });
      const passwordIsValid = await bcrypt.compare(
        password,
        ${tmpltVals.lowercaseName}Document.password,
      );
      if (!passwordIsValid) {
        throw new UnauthorizedException('Credentials are not valid.');
      }
      return this.toModel(${tmpltVals.lowercaseName}Document);
    }
  
    private toModel(${tmpltVals.lowercaseName}Document: ${tmpltVals.name}Document): ${tmpltVals.name} {
      return {
        _id: ${tmpltVals.lowercaseName}Document._id.toHexString(),
        email: ${tmpltVals.lowercaseName}Document.email,
      };
    }
}
    `;
}


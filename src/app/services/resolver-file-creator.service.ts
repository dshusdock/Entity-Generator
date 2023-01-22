import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';

const tmpltVals = {
    name: '',
    lowercaseName: '',
    camelCase: ''
}

@Injectable({
    providedIn: 'root'
})
export class ResolverFileCreatorService {

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        tmpltVals.name = this.entityInfoSvc.entityClassName;
        tmpltVals.lowercaseName = tmpltVals.name.toLocaleLowerCase();
        tmpltVals.camelCase = tmpltVals.name.charAt(0).toLowerCase() + tmpltVals.name.slice(1);

        
        const file = new Blob([resolverTmplt()], { type: "text/plain" });
        return file;

    }
}

function resolverTmplt() {
    return `import { UseGuards } from '@nestjs/common';
    import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
    import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
    import { Get${tmpltVals.name}Args } from './dto/args/get-${tmpltVals.lowercaseName}-args.dto';
    import { Create${tmpltVals.name}Input } from './dto/input/create-${tmpltVals.lowercaseName}-input.dto';
    import { ${tmpltVals.name} } from './models/${tmpltVals.lowercaseName}.model';
    import { ${tmpltVals.name}sService } from './${tmpltVals.lowercaseName}s.service';
    
    @Resolver(() => ${tmpltVals.name})
    export class ${tmpltVals.name}sResolver {
      constructor(private readonly ${tmpltVals.camelCase}sService: ${tmpltVals.name}sService) {}
    
      @Mutation(() => ${tmpltVals.name})
      async create${tmpltVals.name}(@Args('create${tmpltVals.name}Data') create${tmpltVals.name}Data: Create${tmpltVals.name}Input) {
        return this.${tmpltVals.lowercaseName}sService.create${tmpltVals.name}(create${tmpltVals.name}Data);
      }
    
      @UseGuards(GqlAuthGuard)
      @Query(() => ${tmpltVals.name}, { name: '${tmpltVals.lowercaseName}' })
      async get${tmpltVals.name}(@Args() get${tmpltVals.name}Args: Get${tmpltVals.name}Args) {
        return this.${tmpltVals.lowercaseName}sService.get${tmpltVals.name}(get${tmpltVals.name}Args);
      }
    }
    `;
}
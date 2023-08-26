import { Component, OnInit } from '@angular/core';
import { EntityFileCreatorService } from 'src/app/services/entity-file-creator.service';
// import { SchemaFileCreatorService } from 'src/app/services/schema-file-creator.service';
import { FormBuilder } from '@angular/forms';
import { SchemaFileCreatorService } from 'src/app/services/schema-file-creator.service';
import { GraphqlInputFileCreatorService } from 'src/app/services/graphql-input-file-creator.service';
import { EntityInfoService } from 'src/app/services/entity-info.service';
import { GraphqlArgsFileCreatorService } from 'src/app/services/graphql-args-file-creator.service';
import { ModuleFileCreatorService } from 'src/app/services/module-file-creator.service';
import { RepositoryFileCreatorService } from 'src/app/services/repository-file-creator.service';
import { ResolverFileCreatorService } from 'src/app/services/resolver-file-creator.service';
import { ServiceFileCreatorService } from 'src/app/services/service-file-creator.service';
import { AppInfoService } from 'src/app/services/app-info.service';
import { MatDialog } from '@angular/material/dialog';
import { PreviewDlgComponent } from '../preview-dlg/preview-dlg.component';
import { ControllerFileCreatorService } from 'src/app/services/controller-file-creator.service';

@Component({
    selector: 'app-footer-part',
    templateUrl: './footer-part.component.html',
    styleUrls: ['./footer-part.component.scss']
})
export class FooterPartComponent implements OnInit {
    repoSupport = true;
    mongoSupport = true;
    graphQLSupport = true; 


    fileForm = this.formBuilder.group({
        fileChoice: ['',],
    });


    constructor(
        private readonly entityFileCreatorSvc: EntityFileCreatorService,
        private readonly schemaFileCreatorService: SchemaFileCreatorService,
        private readonly graphqlInputFileCreatorService: GraphqlInputFileCreatorService,
        private readonly graphqlArgsFileCreatorService: GraphqlArgsFileCreatorService,
        private readonly moduleFileCreatorService: ModuleFileCreatorService,
        private readonly repositoryFileCreatorService: RepositoryFileCreatorService,
        private readonly resolverFileCreatorService: ResolverFileCreatorService,
        private readonly serviceFileCreatorService: ServiceFileCreatorService,
        private readonly controllerFileCreatorSvc: ControllerFileCreatorService,
        public readonly formBuilder: FormBuilder,
        public readonly entityInfoService: EntityInfoService,
        private readonly appInfoSvc: AppInfoService,
        private readonly dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.updateSupportedFlags();
    }

    onGenerateClick() {
        let fileChoice = this.fileForm.get('fileChoice')?.value;
        let file;
        const link = document.createElement("a");
        let className = this.entityInfoService.entityClassName;
        this.updateSupportedFlags();

        switch (fileChoice) {
            case "entity.ts":
                file = this.entityFileCreatorSvc.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `${className.toLowerCase()}.entityfile.ts`;
                break;
            case "schema.ts":
                file = this.schemaFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `${className.toLowerCase()}.schemafile.ts`;
                break;
            case "input.ts":
                file = this.graphqlInputFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `create.${className.toLowerCase()}.input.ts`;
                break;
            case "args.ts":
                file = this.graphqlArgsFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `create.${className.toLowerCase()}.args.ts`;
                break;
            case "module.ts":
                file = this.moduleFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `${className.toLowerCase()}.module.ts`;
                break;
            case "repository.ts":
                file = this.repositoryFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `${className.toLowerCase()}.repository.ts`;
                break;
            case "resolver.ts":
                file = this.resolverFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `${className.toLowerCase()}.resolver.ts`;
                break;
            case "service.ts":
                file = this.serviceFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `${className.toLowerCase()}.service.ts`;
                break;
            case "controller.ts":
                file = this.controllerFileCreatorSvc.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `${className.toLowerCase()}.controller.ts`;
                break;

        };

        link.click();
        link.remove();
    }

    onSelectionChange(event: any) {
        console.log("Got change event: " + event);
        
    }

    onSelectionClick() {
        console.log("In onSelectionClick")
        this.updateSupportedFlags();
    }

    updateSupportedFlags() {
        this.repoSupport = this.appInfoSvc.abstractRepositorySupport;
        this.mongoSupport = this.appInfoSvc.mongoDBSupport;
        // this.graphQLSupport = this.appInfoSvc.graphQLSupport;

        console.log("repoSupport: " + this.repoSupport);
    }

    onPreviewClick() {
        let file;
        let fileChoice = this.fileForm.get('fileChoice')?.value;
        let className = this.entityInfoService.entityClassName;
        this.updateSupportedFlags();

        switch (fileChoice) {
            case "entity.ts":
                file = this.entityFileCreatorSvc.generateFile();               
                break;
            case "schema.ts":
                file = this.schemaFileCreatorService.generateFile();
                break;
            case "input.ts":
                file = this.graphqlInputFileCreatorService.generateFile();
                break;
            case "args.ts":
                file = this.graphqlArgsFileCreatorService.generateFile();
                break;
            case "module.ts":
                file = this.moduleFileCreatorService.generateFile();
                break;
            case "repository.ts":
                file = this.repositoryFileCreatorService.generateFile();
                break;
            case "resolver.ts":
                file = this.resolverFileCreatorService.generateFile();
                break;
            case "service.ts":
                file = this.serviceFileCreatorService.generateFile();
                break;
            case "controller.ts":
                file = this.controllerFileCreatorSvc.generateFile();
                break;

        };

        const dialogRef = this.dialog.open(PreviewDlgComponent, {
            width: "1020px",
            height: "900px",
            data: file,
            // position: { top: "50px", right: this.dialogRight },
            // panelClass: 'custom-dialog-container'
        });
        
    }

    

}

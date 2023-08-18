import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { MaterialModule } from 'src/material.module';
import { EntityCreatorComponent } from './entity-creator/entity-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityDisplayComponent } from './entity-display/entity-display.component';
import { FooterPartComponent } from './footer-part/footer-part.component';
import { EntityEditorComponent } from './entity-editor/entity-editor.component';
import { ValidatorChooserComponent } from './validator-chooser/validator-chooser.component';
import { ValidatorTableComponent } from './validator-chooser/validator-table/validator-table.component';
import { PreviewDlgComponent } from './preview-dlg/preview-dlg.component';



@NgModule({
  declarations: [
    TopToolbarComponent,
    EntityCreatorComponent,
    EntityDisplayComponent,
    FooterPartComponent,
    EntityEditorComponent,
    ValidatorChooserComponent,
    ValidatorTableComponent,
    PreviewDlgComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [TopToolbarComponent, FooterPartComponent]
})
export class ViewsModule { }

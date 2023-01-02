import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { MaterialModule } from 'src/material.module';
import { EntityCreatorComponent } from './entity-creator/entity-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityDisplayComponent } from './entity-display/entity-display.component';
import { FooterPartComponent } from './footer-part/footer-part.component';
import { EntityEditorComponent } from './entity-editor/entity-editor.component';



@NgModule({
  declarations: [
    TopToolbarComponent,
    EntityCreatorComponent,
    EntityDisplayComponent,
    FooterPartComponent,
    EntityEditorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [TopToolbarComponent, FooterPartComponent]
})
export class ViewsModule { }

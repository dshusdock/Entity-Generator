import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { MaterialModule } from 'src/material.module';
import { EntityCreatorComponent } from './entity-creator/entity-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityDisplayComponent } from './entity-display/entity-display.component';



@NgModule({
  declarations: [
    TopToolbarComponent,
    EntityCreatorComponent,
    EntityDisplayComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [TopToolbarComponent]
})
export class ViewsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { MaterialModule } from 'src/material.module';



@NgModule({
  declarations: [
    TopToolbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [TopToolbarComponent]
})
export class ViewsModule { }

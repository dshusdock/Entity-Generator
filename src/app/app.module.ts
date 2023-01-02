import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ViewsModule } from './views/views.module';
import { AppMessageService } from './services/app-message.service';
import { SchemaFileCreatorService } from './services/schema-file-creator.service';
import { EntityInfoService } from './services/entity-info.service';
import { TestthisComponent } from './testthis/testthis.component';

@NgModule({
  declarations: [
    AppComponent,
    TestthisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ViewsModule
  ],
  providers: [AppMessageService, SchemaFileCreatorService, EntityInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

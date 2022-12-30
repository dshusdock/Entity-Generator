import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityCreatorComponent } from "./views/entity-creator/entity-creator.component";
const routes: Routes = [
  { path: 'app-entity-creator', component: EntityCreatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

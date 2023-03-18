import { BackPackTabV2Component } from './components/back-pack-tab-v2/back-pack-tab-v2.component';
import { ImportExportTabComponent } from './components/import-export-tab/import-export-tab.component';
import { CargoTreeTabComponent } from './components/cargo-tree-tab/cargo-tree-tab.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackPackTabComponent } from './components/back-pack-tab/back-pack-tab.component';

const routes: Routes = [
  { path: 'backpack-tab', component: BackPackTabComponent },
  { path: 'cargo-tree-tab', component: CargoTreeTabComponent },
  { path: 'import-export-tab', component: ImportExportTabComponent },
  { path: 'backpack-tabV2', component: BackPackTabV2Component },
  { path: '',   redirectTo: '/backpack-tabV2', pathMatch: 'full' },
  { path: '**', component: BackPackTabV2Component },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

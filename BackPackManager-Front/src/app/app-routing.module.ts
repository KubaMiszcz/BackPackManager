import { HelpTabComponent } from './components/help-tab/help-tab.component';
import { BackPackTabComponent } from './components/back-pack-tab/back-pack-tab.component';
import { ImportExportTabComponent } from './components/import-export-tab/import-export-tab.component';
import { CargoTreeTabComponent } from './components/cargo-tree-tab/cargo-tree-tab.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'cargo-tree-tab', component: CargoTreeTabComponent },
  { path: 'import-export-tab', component: ImportExportTabComponent },
  { path: 'backpack-tab', component: BackPackTabComponent },
  { path: 'help-tab', component: HelpTabComponent },
  { path: '',   redirectTo: '/backpack-tab', pathMatch: 'full' },
  { path: '**', component: BackPackTabComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

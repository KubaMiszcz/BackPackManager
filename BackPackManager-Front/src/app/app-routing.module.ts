import { CargoTreeTabComponent } from './components/cargo-tree-tab/cargo-tree-tab.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackPackTabComponent } from './components/back-pack-tab/back-pack-tab.component';

const routes: Routes = [
  { path: 'backpack-tab', component: BackPackTabComponent },
  { path: 'cargo-tree-tab', component: CargoTreeTabComponent },
  { path: '',   redirectTo: '/backpack-tab', pathMatch: 'full' },
  { path: '**', component: BackPackTabComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

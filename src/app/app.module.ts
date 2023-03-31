import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CargoItemComponent } from './components/cargo-item/cargo-item.component';
import { SimpleItemComponent } from './components/simple-item/simple-item.component';
import { CargoTreeTabComponent } from './components/cargo-tree-tab/cargo-tree-tab.component';
import { BackPackTabComponent } from './components/back-pack-tab/back-pack-tab.component';
import { ImportExportTabComponent } from './components/import-export-tab/import-export-tab.component';
import { FormsModule } from '@angular/forms';
import { HelpTabComponent } from './components/help-tab/help-tab.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CargoItemComponent,
    SimpleItemComponent,
    CargoTreeTabComponent,
    BackPackTabComponent,
    ImportExportTabComponent,
    HelpTabComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackPackTabComponent } from './components/back-pack-tab/back-pack-tab.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CargoItemComponent } from './components/cargo-item/cargo-item.component';
import { SimpleItemComponent } from './components/simple-item/simple-item.component';



@NgModule({
  declarations: [
    AppComponent,
    BackPackTabComponent,
    NavBarComponent,
    CargoItemComponent,
    SimpleItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

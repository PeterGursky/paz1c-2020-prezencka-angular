import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { AppRoutingModule } from './app-routing.module';
import { PresenceComponent } from './presence/presence.component';
import { FormsModule } from '@angular/forms';
import { PresenceEditComponent } from './presence-edit/presence-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectsComponent,
    PresenceComponent,
    PresenceEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

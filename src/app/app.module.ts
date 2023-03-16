import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NotesService } from './notes/notes.service';
import { NoteStorageService } from './notes/note-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NoteFormComponent } from './notes/note-form/note-form.component';
import { FooterComponent } from './footer/footer.component';
import { NotesListingItemComponent } from './notes/notes-listing-item/notes-listing-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    HeaderComponent,
    NoteFormComponent,
    FooterComponent,
    NotesListingItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // { provide: APP_BASE_HREF, useValue: '/babytracker' },
    NotesService,
    NoteStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

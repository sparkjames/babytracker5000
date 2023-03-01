import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NotesService } from './notes/notes.service';
import { NewNoteComponent } from './notes/new-note/new-note.component';
import { NoteStorageService } from './notes/note-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NewNoteComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NotesService,
    NoteStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NotesListService } from './notes/notes-list/notes-list.service';
import { NewNoteComponent } from './notes/new-note/new-note.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NewNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    NotesListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { NoteStorageService } from './notes/note-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private noteStorageService: NoteStorageService ){}

  ngOnInit(): void {
    this.noteStorageService.fetchNotes();
  }
}

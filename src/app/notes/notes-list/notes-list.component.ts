import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnDestroy {

  notes: Note[];
  notesSubscription: Subscription;

  constructor( private notesService: NotesService ){
    this.notesSubscription = this.notesService.notesChanged.subscribe((notes: Note[]) => {
      this.notes = notes;
    });
    this.notes = this.notesService.getNotes();
  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
  }

}

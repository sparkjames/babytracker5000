import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesListService } from './notes-list.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy {

  notes: Note[];
  notesSubscription: Subscription;

  constructor( private notesListService: NotesListService ){
    this.notesSubscription = this.notesListService.notesChanged.subscribe((notes: Note[]) => {
      this.notes = notes;
    });
    this.notes = this.notesListService.getNotes();
  }

  ngOnInit(): void {
    // this.notesSubscription = this.notesListService.notesChanged.subscribe( (notes: Note[]) => {
    //   this.notes = notes;
    // });
    // this.notes = this.notesListService.getNotes();
  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
  }

}

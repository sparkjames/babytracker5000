import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  onSubmitNewNote(form: NgForm){
    console.log('submitted');
    console.log(form);

    let newNoteLine;
    let newNoteType;
    let newDurationLine;

    if( form.value.newNoteLine ){
      newNoteLine = form.value.newNoteLine;

      if (form.value.newNoteType) {
        newNoteType = form.value.newNoteType;
      }

      if (form.value.newDurationLine) {
        newDurationLine = form.value.newDurationLine;
      }

      const newNote = new Note( newNoteType, newNoteLine, newDurationLine );
      this.notesListService.addNote(newNote);

      form.reset();

    }

  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
  }

}

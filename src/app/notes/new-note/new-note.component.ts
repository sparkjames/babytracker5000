import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesListService } from '../notes-list/notes-list.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnDestroy {
  notesSubscription: Subscription;

  constructor(private notesListService: NotesListService) {
    this.notesSubscription = this.notesListService.notesChanged.subscribe();
  }

  onSubmitNewNote(form: NgForm) {
    console.log('submitted');
    console.log(form);

    let newNoteLine;
    let newNoteType;
    let newDurationLine;

    if (form.value.newNoteLine) {
      newNoteLine = form.value.newNoteLine;

      if (form.value.newNoteType) {
        newNoteType = form.value.newNoteType;
      }

      if (form.value.newDurationLine) {
        newDurationLine = form.value.newDurationLine;
      }

      const newNote = new Note(newNoteType, newNoteLine, newDurationLine);
      this.notesListService.addNote(newNote);

      form.reset();

    }

  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
  }

}

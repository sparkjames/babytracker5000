import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NoteStorageService } from '../note-storage.service';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit, OnDestroy {
  public defaultNoteType: string = 'Feeding';
  public newNoteForm: FormGroup = new FormGroup({
    description: new FormControl( null, Validators.required ),
    noteType: new FormControl(null, Validators.required),
    duration: new FormControl(null)
    // feedDetails: new FormControl(null),
    // diaperDetails: new FormControl(null)
  });

  constructor(
    // private notesService: NotesService,
    // private noteStorageService: NoteStorageService,
    // private notesSubscription: Subscription,
    // public newNoteForm: FormGroup
  ) {
    // this.notesSubscription = this.notesService.notesChanged.subscribe();
  }

  ngOnInit(): void {}

  onSubmitNewNote() {
    console.log('submitted');
    console.log(this.newNoteForm);

    // let newDescription;
    // let newNoteType;
    // let newDurationLine;
    // let newFeedDetails;
    // let newDiaperDetails;

    // if (form.value.description) {
    //   newDescription = form.value.description;

    //   if (form.value.noteType) {
    //     newNoteType = form.value.noteType;
    //   }

    //   if (form.value.duration) {
    //     newDurationLine = form.value.duration;
    //   }

    //   if (form.value.newFeedDetails) {
    //     newFeedDetails = form.value.newFeedDetails;
    //   }

    //   if (form.value.newDiaperDetails) {
    //     newDiaperDetails = form.value.newDiaperDetails;
    //   }

    //   const newNote = new Note( new Date(), newNoteType, newDescription, newDurationLine);
    //   this.notesService.addNote(newNote);

    //   this.noteStorageService.storeNotes();

    //   form.reset();

    // }

  }

  ngOnDestroy(): void {
    // this.notesSubscription.unsubscribe();
  }

}

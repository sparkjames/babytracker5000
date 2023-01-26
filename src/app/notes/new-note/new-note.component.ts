import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NoteStorageService } from '../note-storage.service';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { DetailOption } from './detail-option.model';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit, OnDestroy {
  // public defaultNoteType: string = 'Feeding';

  // https://www.netjstech.com/2020/10/checkbox-in-angular-form-example.html
  feedDetailOptions: Array<DetailOption> = [
    { id: 1, label: 'Left Breast', value: 'Left Breast', selected: false },
    { id: 2, label: 'Right Breast', value: 'Right Breast', selected: false },
    { id: 3, label: 'Bottle', value: 'Bottle', selected: false },
    { id: 4, label: 'Other', value: 'Other', selected: false },
  ];

  diaperDetailOptions: Array<DetailOption> = [
    { id: 1, label: 'Wet', value: 'Wet', selected: false },
    { id: 2, label: 'Poo', value: 'Poo', selected: false },
  ];

  selectedFeedDetails: string[] = [];
  selectedDiaperDetails: string[] = [];

  public newNoteForm: FormGroup = new FormGroup({
    description: new FormControl( null, Validators.required ),
    noteType: new FormControl( 'Feeding', Validators.required ),
    duration: new FormControl(null),
    feedDetails: this.createFeedDetails(this.feedDetailOptions),
    diaperDetails: this.createDiaperDetails(this.diaperDetailOptions)
  });

  testControls = this.getFeedControls();

  constructor(
    private notesService: NotesService,
    private noteStorageService: NoteStorageService,
    // private notesSubscription: Subscription,
    // public newNoteForm: FormGroup
  ) {
    // this.notesSubscription = this.notesService.notesChanged.subscribe();
  }

  ngOnInit(): void { }

  getFeedControls(): any {
    // console.log('in getFeedControls()...');
    const controls = (<FormArray>this.newNoteForm.get('feedDetails')).controls;
    // console.log(typeof controls);
    // console.log(typeof ['a','b','c']);
    // console.log(controls);
    return controls;
  }

  getDiaperControls(): any {
    const controls = (<FormArray>this.newNoteForm.get('diaperDetails')).controls;
    return controls;
  }

  createFeedDetails(feedDetails: Array<DetailOption>): FormArray {
    const arr = feedDetails.map(detail => {
      return new FormControl(detail.selected);
    });
    return new FormArray(arr);
  }

  createDiaperDetails(diaperDetails: Array<DetailOption>): FormArray {
    const arr = diaperDetails.map(detail => {
      return new FormControl(detail.selected);
    });
    return new FormArray(arr);
  }

  getSelectedFeedDetails(): string[] {
    this.selectedFeedDetails = this.newNoteForm.value.feedDetails.map((selected: boolean, i: number) => {
      if (selected) {
        return this.feedDetailOptions[i].value;
      } else {
        return '';
      }
    });

    return this.selectedFeedDetails.filter((element: any) => {
      if (element !== '') {
        return element;
      }
    })
  }

  getSelectedDiaperDetails(): string[] {
    this.selectedDiaperDetails = this.newNoteForm.value.diaperDetails.map((selected: boolean, i: number) => {
      if (selected) {
        return this.diaperDetailOptions[i].value;
      } else {
        return '';
      }
    });

    return this.selectedDiaperDetails.filter((element: any) => {
      if (element !== '') {
        return element;
      }
    })
  }

  onSubmit() {
    console.log('submitted');
    console.log(this.newNoteForm);

    const selectedFeedDetails = this.getSelectedFeedDetails();
    const selectedDiaperDetails = this.getSelectedDiaperDetails();
    // console.log(selectedFeedDetails);
    // console.log(selectedDiaperDetails);

    let description;
    let noteType;
    let duration;

    if (this.newNoteForm.value.description) {
      description = this.newNoteForm.value.description;

      if (this.newNoteForm.value.noteType) {
        noteType = this.newNoteForm.value.noteType;
      }

      if (this.newNoteForm.value.duration) {
        duration = this.newNoteForm.value.duration;
      }

      const newNote = new Note(new Date(), description, noteType, duration, JSON.stringify(selectedFeedDetails), JSON.stringify(selectedDiaperDetails));
      this.notesService.addNote(newNote);

      this.noteStorageService.storeNotes();

      this.newNoteForm.reset();

    }

  }

  ngOnDestroy(): void {
    // this.notesSubscription.unsubscribe();
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteStorageService } from '../notes/note-storage.service';
import { Note } from '../notes/note.model';
import { NotesService } from '../notes/notes.service';
import { DetailOption } from './detail-option.model';
import { NoteFormControls } from './note-form.model';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {

  @Input() noteId:number | undefined;
  @Input() editMode:number | undefined;
  @Output() editModeChange = new EventEmitter<number>();

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
  // public noteForm: FormGroup = new FormGroup({});
  noteForm: FormGroup;

  selectedFeedDetails: string[] = [];
  selectedDiaperDetails: string[] = [];
  formControls: { description: FormControl<string | null>; noteType: FormControl<string | null>; duration: FormControl<string | null>; feedDetails: FormArray<any>; diaperDetails: FormArray<any>; };

  constructor(
    private notesService: NotesService,
    private noteStorageService: NoteStorageService
  ){
    this.formControls = {
      description: new FormControl('', Validators.required),
      noteType: new FormControl('Feeding', Validators.required),
      duration: new FormControl(''),
      feedDetails: this.createFeedDetails(this.feedDetailOptions),
      diaperDetails: this.createDiaperDetails(this.diaperDetailOptions)
    };

    this.noteForm = new FormGroup(this.formControls);
  }

  ngOnInit(): void {
    if (this.noteId && this.noteId > -1){
      const note = this.notesService.getNote(this.noteId);
      // console.log('edit this note', note);
      const description = note.description;
      const noteType = note.noteType;
      const duration = note.duration ? note.duration : '';
      const feedDetails = note.feedDetails ? note.feedDetails.split('|') : [];
      const diaperDetails = note.diaperDetails ? note.diaperDetails.split('|') : [];

      this.noteForm = new FormGroup({
        description: new FormControl(description, Validators.required),
        noteType: new FormControl(noteType, Validators.required),
        duration: new FormControl(duration),
        feedDetails: this.createFeedDetails(this.feedDetailOptions, feedDetails),
        diaperDetails: this.createDiaperDetails(this.diaperDetailOptions, diaperDetails)
      });
    }
  }

  getFeedControls(): any {
    const controls = (<FormArray>this.noteForm.get('feedDetails')).controls;
    return controls;
  }

  getDiaperControls(): any {
    const controls = (<FormArray>this.noteForm.get('diaperDetails')).controls;
    return controls;
  }

  createFeedDetails(feedDetails: Array<DetailOption>, selectedValues: Array<string> = []): FormArray {
    const arr = feedDetails.map(detail => {
      let isSelected = false;
      if (selectedValues.indexOf(detail.value) > -1) {
        isSelected = true;
      }
      return new FormControl(isSelected);
    });
    return new FormArray(arr);
  }

  createDiaperDetails(diaperDetails: Array<DetailOption>, selectedValues: Array<string> = []): FormArray {
    const arr = diaperDetails.map(detail => {
      let isSelected = false;
      if (selectedValues.indexOf(detail.value) > -1) {
        isSelected = true;
      }
      return new FormControl(isSelected);
    });
    return new FormArray(arr);
  }

  getSelectedFeedDetails(): string[] {
    this.selectedFeedDetails = this.noteForm.value.feedDetails.map((selected: boolean, i: number) => {
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
    this.selectedDiaperDetails = this.noteForm.value.diaperDetails.map((selected: boolean, i: number) => {
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
    console.log(this.noteForm);

    const selectedFeedDetails = this.getSelectedFeedDetails();
    const selectedDiaperDetails = this.getSelectedDiaperDetails();
    // console.log(selectedFeedDetails);
    // console.log(selectedDiaperDetails);

    let description;
    let noteType;
    let duration;

    if (this.noteForm.value.description) {
      description = this.noteForm.value.description;

      if (this.noteForm.value.noteType) {
        noteType = this.noteForm.value.noteType;
      }

      if (this.noteForm.value.duration) {
        duration = this.noteForm.value.duration;
      }

      const newNote = new Note(
        new Date(),
        description,
        noteType,
        duration,
        selectedFeedDetails.join('|'),
        selectedDiaperDetails.join('|')
      );
      this.notesService.addNote(newNote);

      this.noteStorageService.storeNotes();

      this.noteForm.reset();

    }

  }

  onCancelEdit() {
    this.editMode = -1;
    this.editModeChange.emit( this.editMode );
  }

}
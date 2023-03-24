import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteStorageService } from '../note-storage.service';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { v4 as uuid } from 'uuid';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  host: {
    class: 'note-form-container'
  }
})
export class NoteFormComponent implements OnInit {

  @Input() noteId = -1;
  @Input() editMode = false;
  @Output() editModeChange = new EventEmitter<boolean>();

  private userLocale: string = navigator.languages != undefined ? navigator.languages[0] : navigator.language;
  private startDateTimePattern = '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}';

  noteForm: FormGroup = new FormGroup({
    startDateTime: new FormControl(formatDate(Date.now(), 'YYYY-MM-ddTHH:mm', this.userLocale), [Validators.required, Validators.pattern(this.startDateTimePattern)]),
    durationLeft: new FormControl('', Validators.pattern('[0-9]*')),
    durationRight: new FormControl('', Validators.pattern('[0-9]*')),
    formulaAmount: new FormControl(''),
    wet: new FormControl(false),
    poo: new FormControl(false),
    description: new FormControl('')
  });

  input_id_startDateTime = uuid();
  input_id_durationLeft = uuid();
  input_id_durationRight = uuid();
  input_id_formulaAmount = uuid();
  input_id_wet = uuid();
  input_id_poo = uuid();
  input_id_description = uuid();

  constructor(
    private notesService: NotesService,
    private noteStorageService: NoteStorageService
  ){}

  ngOnInit(): void {
    // console.log('in form component this.noteId = ', this.noteId);
    if (this.noteId > -1){
      const note = this.notesService.getNote(this.noteId);

      this.noteForm = new FormGroup({
        startDateTime: new FormControl(note.startDateTime, [Validators.required, Validators.pattern(this.startDateTimePattern)]),
        durationLeft: new FormControl(note.durationLeft, Validators.pattern('[0-9]*')),
        durationRight: new FormControl(note.durationRight, Validators.pattern('[0-9]*')),
        formulaAmount: new FormControl(note.formulaAmount),
        wet: new FormControl(note.wet),
        poo: new FormControl(note.poo),
        description: new FormControl(note.description)
      });

    }

  }

  onSubmit() {
    // console.log('submitted');
    // console.log(this.noteForm);

    // const selectedFeedDetails = this.getSelectedFeedDetails();
    // const selectedDiaperDetails = this.getSelectedDiaperDetails();
    // console.log(selectedFeedDetails);
    // console.log(selectedDiaperDetails);

    if( this.noteForm.status === 'INVALID' ){
      // alert('form is invalid');
      return false;

    } else {

      const newNote = new Note(
        new Date(),
        this.noteForm.value.startDateTime,
        this.noteForm.value.description,
        this.noteForm.value.durationLeft,
        this.noteForm.value.durationRight,
        this.noteForm.value.formulaAmount,
        this.noteForm.value.wet,
        this.noteForm.value.poo,
      );

      if (this.noteId > -1) {
        this.notesService.updateNote( this.noteId, newNote );
        this.cancelEditMode();

      } else {
        this.notesService.addNote(newNote);
        this.noteForm.reset({
          startDateTime: formatDate(Date.now(), 'YYYY-MM-ddTHH:mm', this.userLocale)
        });
      }

      this.noteStorageService.storeNotes();

      return true;

    }

  }

  onClickCancelEdit() {
    this.cancelEditMode();
  }

  onClickDeleteNoteListItem( index:number ){
    const confirmDelete = confirm('This will delete this note from the list.');
    if (confirmDelete) {
      // console.log('YES delete it');
      this.notesService.deleteNote(index);
      this.noteStorageService.storeNotes();
      this.cancelEditMode();

    } else {
      // console.log('NO do not delete it.');
    }
  }

  cancelEditMode(){
    this.editMode = false;
    this.editModeChange.emit(this.editMode);
  }

  generateID(){
    return uuid();
  }

}

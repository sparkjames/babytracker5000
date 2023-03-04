import { Component } from '@angular/core';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent {

  noteId = -1;

  // constructor() {}

  private initForm(): void{
    // console.log('start form with edit data');
    // let description = '';
    // let noteType = '';
    // let duration = '';
    // let feedDetails = [];
    // let diaperDetails = [];

    // if( this.editMode > -1){
    //   const note = this.notesService.getNote(this.editMode);
    //   // console.log('edit this note', note);
    //   description = note.description;
    //   noteType = note.noteType;
    //   duration = note.duration ? note.duration : '';
    //   feedDetails = note.feedDetails ? note.feedDetails.split('|') : [];
    //   diaperDetails = note.diaperDetails ? note.diaperDetails.split('|') : [];

    //   this.newNoteForm = new FormGroup({
    //     description: new FormControl(description, Validators.required),
    //     noteType: new FormControl(noteType, Validators.required),
    //     duration: new FormControl(duration),
    //     feedDetails: this.createFeedDetails(this.feedDetailOptions, feedDetails),
    //     diaperDetails: this.createDiaperDetails(this.diaperDetailOptions, diaperDetails)
    //   });

    // }

  }

}

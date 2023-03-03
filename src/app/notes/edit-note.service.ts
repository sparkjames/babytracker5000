import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditNoteService {
  editNote = new BehaviorSubject<number>(-1);
  // editIndex = -1;

  // constructor() { }

  setEditNote( index: number ){
    this.editNote.next(index);
    // this.editIndex = index;
    console.log('currently editing: ', index, this.editNote);
  }

  // getEditNote(){
  //   return this.editIndex;
  // }

}

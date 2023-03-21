import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Note } from "./note.model";

@Injectable()
export class NotesService {
  notesChanged = new Subject<Note[]>();

  private notes: Note[] = [
    // new Note(
    //   'Feeding',
    //   'Applesauce',
    //   '25min'
    // ),
    // new Note(
    //   'Diaper',
    //   'small poop'
    // ),
    // new Note(
    //   'Sleep',
    //   '1st nap of day',
    //   '2hr'
    // )
  ];

  private sortNotes(): void{
    this.notes.sort( (a,b): number => {
      if (new Date(a.startDateTime).getTime() > new Date(b.startDateTime).getTime() ){
        return 1;
      } else if (new Date(a.startDateTime).getTime() < new Date(b.startDateTime).getTime()) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  setNotes(notes: Note[]){
    this.notes = notes;
    this.sortNotes();
    this.notesChanged.next( this.notes.slice() );
  }

  getNotes(): Note[] {
    return this.notes ? this.notes.slice() : [];
  }

  getNote( index:number ): Note {
    if( index > -1 ){
      return this.notes[index];
    }
    return {
      createdDateTime: new Date(),
      startDateTime: '',
      description: '',
      durationLeft: '',
      durationRight: '',
      formulaAmount: '',
      wet: false,
      poo: false
    }
  }

  addNote( note: Note ){
    this.notes.push(note);
    this.sortNotes();
    this.notesChanged.next( this.notes.slice() );
  }

  deleteNote( index: number ){
    this.notes.splice(index, 1);
    this.sortNotes();
    this.notesChanged.next( this.notes.slice() );
  }

  updateNote( index: number, note: Note ){
    this.notes[index] = note;
    this.sortNotes();
    this.notesChanged.next(this.notes.slice());
  }

}
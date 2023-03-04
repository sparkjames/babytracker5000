import { FormArray, FormControl } from "@angular/forms";

export class NoteFormControls {

  constructor(
    public description: FormControl,
    public noteType: FormControl,
    public duration: FormControl,
    public feedDetails: FormArray,
    public diaperDetails: FormArray
  ) {
    this.description = description;
    this.noteType = noteType;
    this.duration = duration;
    this.feedDetails = feedDetails;
    this.diaperDetails = diaperDetails;
  }

}
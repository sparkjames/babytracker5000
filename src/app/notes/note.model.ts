export class Note {
  public noteType: string;
  public description: string;
  public startDateTime: Date;
  public endDateTime: Date;

  constructor(noteType: string, description: string, startDateTime: Date, endDateTime: Date){
    this.noteType = noteType;
    this.description = description;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
  }

}
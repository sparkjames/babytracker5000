export class Note {
  public noteType: string;
  public description: string;
  public duration?: string;
  public startDateTime?: Date;
  public endDateTime?: Date;
  public createdDateTime?: Date;

  constructor(noteType: string, description: string, duration?: string, startDateTime?: Date, endDateTime?: Date, createdDateTime?: Date){
    this.noteType = noteType;
    this.description = description;
    this.duration = duration;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.createdDateTime = createdDateTime;
  }

}
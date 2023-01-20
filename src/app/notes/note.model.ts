export class Note {

  constructor(
    public noteType: string,
    public description: string,
    public duration?: string,
    public createdDateTime?: Date,
    public startDateTime?: Date,
    public endDateTime?: Date
  ){
    this.noteType = noteType;
    this.description = description;
    this.duration = duration;
    this.createdDateTime = createdDateTime;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
  }

}
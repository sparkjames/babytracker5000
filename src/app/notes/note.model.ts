export class Note {

  constructor(
    public createdDateTime: Date,
    public description: string,
    public noteType: string,
    public duration?: string,
    public feedDetails?: string,
    public diaperDetails?: string
    // public startDateTime?: Date,
    // public endDateTime?: Date
  ) {
    this.createdDateTime = createdDateTime;
    this.description = description;
    this.noteType = noteType;
    this.duration = duration;
    this.feedDetails = feedDetails;
    this.diaperDetails = diaperDetails;
    // this.startDateTime = startDateTime;
    // this.endDateTime = endDateTime;
  }

}
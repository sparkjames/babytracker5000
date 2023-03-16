export class Note {

  constructor(
    public createdDateTime: Date,
    public startTime: string,
    public description: string,
    public durationLeft: string,
    public durationRight: string,
    public formulaAmount: string,
    public wet: string,
    public poo: string
  ) {
    this.createdDateTime = createdDateTime;
    this.startTime = startTime;
    this.description = description;
    this.durationLeft = durationLeft;
    this.durationRight = durationRight;
    this.formulaAmount = formulaAmount;
    this.wet = wet;
    this.poo = poo;
  }

}
export class Note {

  constructor(
    public createdDateTime: Date,
    public startDateTime: string,
    public description: string,
    public durationLeft: string,
    public durationRight: string,
    public formulaAmount: string,
    public wet: boolean,
    public poo: boolean
  ) {
    this.createdDateTime = createdDateTime;
    this.startDateTime = startDateTime;
    this.description = description;
    this.durationLeft = durationLeft;
    this.durationRight = durationRight;
    this.formulaAmount = formulaAmount;
    this.wet = wet;
    this.poo = poo;
  }

}
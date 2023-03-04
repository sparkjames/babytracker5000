export class DetailOption {

  constructor(
    public id: number,
    public label: string,
    public value: string,
    public selected: boolean
  ) {
    this.id = id;
    this.label = label;
    this.value = value;
    this.selected = selected;
  }

}
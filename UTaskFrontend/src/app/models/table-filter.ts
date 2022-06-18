export class TableFilter{
  Objects: Array<any>;
  SelectedId: number;
  Asc: boolean;
  Desc: boolean;
  IsNeedShowObjects: boolean;

  constructor(objects: Array<any>, selectedId: number, asc: boolean, desc: boolean, isNeedShowObjects: boolean) {
    this.Objects = objects;
    this.SelectedId = selectedId;
    this.Asc = asc;
    this.Desc = desc;
    this.IsNeedShowObjects = isNeedShowObjects;
  }
}

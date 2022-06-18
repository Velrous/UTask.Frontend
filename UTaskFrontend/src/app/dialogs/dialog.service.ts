import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from "@angular/material/dialog";
import {faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {TableFilter} from "../models/table-filter";
import {SortingOptions} from "../models/sorting-options";
import {DataState} from "../models/data-state";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {FilterOptions} from "../models/filter-options";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  openInfoDialog(message: string) {
    this.dialog.open(DialogInfo, {
      data: {
        message: message,
      },
    });
  }

  openErrorDialog(message: string) {
    this.dialog.open(DialogError, {
      data: {
        message: message,
      },
    });
  }

  openFilterDialog(tableFilter: TableFilter) {
    const dialogRef = this.dialog.open(DialogFilter, {
      data: tableFilter,
    });

    return dialogRef;
  }

  openCategoryTableFilter(tableFilter: TableFilter, dataState: DataState): Promise<[TableFilter, DataState] | undefined> {
    return lastValueFrom(this.openFilterDialog(tableFilter).afterClosed()).then(result => {
      if(result) {
        tableFilter = result;
        let index = dataState.filter.options.findIndex(x => x.field == 'CategoryId');
        if(result.SelectedId != -1) {
          if(index == -1) {
            dataState.filter.options.push(new FilterOptions('CategoryId', 'eq', result.SelectedId != 0
              ? result.SelectedId : "null"));
          }
          else {
            dataState.filter.options[index].value = result.SelectedId != 0 ? result.SelectedId : "null";
          }
        }
        else {
          if(index != -1) {
            dataState.filter.options.splice(index, 1);
          }
        }
        index = dataState.sort.findIndex(x => x.field == 'CategoryId');
        if(result.Asc || result.Desc) {
          if(index == -1) {
            dataState.sort.push(new SortingOptions('CategoryId', result.Asc ? "asc" : "desc"));
          }
          else {
            dataState.sort[index].direction = result.Asc ? "asc" : "desc";
          }
        }
        else {
          if(index != -1) {
            dataState.sort.splice(index, 1);
          }
        }
      }
      return [tableFilter, dataState];
    });
  }

  openCreateDateTimeTableFilter(tableFilter: TableFilter, dataState: DataState): Promise<[TableFilter, DataState] | undefined> {
    return firstValueFrom(this.openFilterDialog(tableFilter).afterClosed()).then(result => {
      if(result) {
        tableFilter = result;
        let index = dataState.sort.findIndex(x => x.field == 'Created');
        if(result.Asc || result.Desc) {
          if(index == -1) {
            dataState.sort.push(new SortingOptions('Created', result.Asc ? "asc" : "desc"));
          }
          else {
            dataState.sort[index].direction = result.Asc ? "asc" : "desc";
          }
        }
        else {
          if(index != -1) {
            dataState.sort.splice(index, 1);
          }
        }
      }
      return [tableFilter, dataState];
    });
  }

  openDescriptionTableFilter(tableFilter: TableFilter, dataState: DataState): Promise<[TableFilter, DataState] | undefined> {
    return firstValueFrom(this.openFilterDialog(tableFilter).afterClosed()).then(result => {
      if(result) {
        tableFilter = result;
        let index = dataState.sort.findIndex(x => x.field == 'Description');
        if(result.Asc || result.Desc) {
          if(index == -1) {
            dataState.sort.push(new SortingOptions('Description', result.Asc ? "asc" : "desc"));
          }
          else {
            dataState.sort[index].direction = result.Asc ? "asc" : "desc";
          }
        }
        else {
          if(index != -1) {
            dataState.sort.splice(index, 1);
          }
        }
      }
      return [tableFilter, dataState];
    });
  }

  openIsCompleteTableFilter(tableFilter: TableFilter, dataState: DataState): Promise<[TableFilter, DataState] | undefined> {
    return firstValueFrom(this.openFilterDialog(tableFilter).afterClosed()).then(result => {
      if(result) {
        tableFilter = result;
        let index = dataState.sort.findIndex(x => x.field == 'IsComplete');
        if(result.Asc || result.Desc) {
          if(index == -1) {
            dataState.sort.push(new SortingOptions('IsComplete', result.Asc ? "asc" : "desc"));
          }
          else {
            dataState.sort[index].direction = result.Asc ? "asc" : "desc";
          }
        }
        else {
          if(index != -1) {
            dataState.sort.splice(index, 1);
          }
        }
      }
      return [tableFilter, dataState];
    });
  }

  openNameTableFilter(tableFilter: TableFilter, dataState: DataState): Promise<[TableFilter, DataState] | undefined> {
    return firstValueFrom(this.openFilterDialog(tableFilter).afterClosed()).then(result => {
      if(result) {
        tableFilter = result;
        let index = dataState.sort.findIndex(x => x.field == 'Name');
        if(result.Asc || result.Desc) {
          if(index == -1) {
            dataState.sort.push(new SortingOptions('Name', result.Asc ? "asc" : "desc"));
          }
          else {
            dataState.sort[index].direction = result.Asc ? "asc" : "desc";
          }
        }
        else {
          if(index != -1) {
            dataState.sort.splice(index, 1);
          }
        }
      }
      return [tableFilter, dataState];
    });
  }

  openTaskTypeTableFilter(tableFilter: TableFilter, dataState: DataState): Promise<[TableFilter, DataState] | undefined> {
    return firstValueFrom(this.openFilterDialog(tableFilter).afterClosed()).then(result => {
      if(result) {
        tableFilter = result;
        let index = dataState.filter.options.findIndex(x => x.field == 'TaskTypeId');
        if(result.SelectedId != -1) {
          if(index == -1) {
            dataState.filter.options.push(new FilterOptions('TaskTypeId', 'eq', result.SelectedId));
          }
          else {
            dataState.filter.options[index].value = result.SelectedId;
          }
        }
        else {
          if(index != -1) {
            dataState.filter.options.splice(index, 1);
          }
        }
        index = dataState.sort.findIndex(x => x.field == 'TaskTypeId');
        if(result.Asc || result.Desc) {
          if(index == -1) {
            dataState.sort.push(new SortingOptions('TaskTypeId', result.Asc ? "asc" : "desc"));
          }
          else {
            dataState.sort[index].direction = result.Asc ? "asc" : "desc";
          }
        }
        else {
          if(index != -1) {
            dataState.sort.splice(index, 1);
          }
        }
      }
      return [tableFilter, dataState];
    });
  }
}

@Component({
  selector: 'dialog-info',
  templateUrl: 'dialog-info.html',
})
export class DialogInfo {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string }) {}
}

@Component({
  selector: 'dialog-error',
  templateUrl: 'dialog-error.html',
})
export class DialogError {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string }) {}
}

@Component({
  selector: 'dialog-filter',
  templateUrl: 'dialog-filter.html',
})
export class DialogFilter implements OnInit{

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  selectedId = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogFilter>,
    @Inject(MAT_DIALOG_DATA) public data: TableFilter) {}

  sortAsc() {
    this.data.Asc = !this.data.Asc;
    this.data.Desc = false;
  }

  sortDesc() {
    this.data.Desc = !this.data.Desc;
    this.data.Asc = false;
  }

  confirm() {
    this.data.SelectedId = this.selectedId;
    this.dialogRef.close(this.data);
  }

  clear() {
    this.data.SelectedId = -1;
    this.data.Asc = false;
    this.data.Desc = false;
    this.dialogRef.close(this.data);
  }

  ngOnInit() {
    this.selectedId = this.data.SelectedId;
  }
}

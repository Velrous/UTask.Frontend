import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Note} from "../models/note";
import {PageData} from "../models/page-data";
import {DataState} from "../models/data-state";
import {OdataHelperService} from "../helpers/odata-helper.service";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient,
    private odataHelper: OdataHelperService
  ) { }

  async createNote(note: Note): Promise<void> {
    await lastValueFrom(this.http.post(`api/Notes`, note));
  }

  async getNotes(dataState: DataState): Promise<PageData<Note>> {
    return await lastValueFrom(this.http.get<PageData<Note>>(`api/Notes${this.odataHelper.toOdataString(dataState)}`))
      || new PageData<Note>([],0);
  }

  async updateNote(note: Note): Promise<void> {
    await lastValueFrom(this.http.put(`api/Notes`, note));
  }

  async deleteNote(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(`api/Notes/${id}`));
  }
}

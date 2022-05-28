import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Note} from "../models/note";
import {PageData} from "../models/page-data";
import {DataState} from "../models/data-state";
import {OdataHelperService} from "../helpers/odata-helper.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient,
    private odataHelper: OdataHelperService
  ) { }

  async createNote(note: Note): Promise<void> {
    await this.http.post(`api/Notes`, note).toPromise();
  }

  async getNotes(dataState: DataState): Promise<PageData<Note>> {
    return await this.http.get<PageData<Note>>(`api/Notes${this.odataHelper.toOdataString(dataState)}`).toPromise() || new PageData<Note>([],0);
  }

  async updateNote(note: Note): Promise<void> {
    await this.http.put(`api/Notes`, note).toPromise();
  }

  async deleteNote(id: number): Promise<void> {
    await this.http.delete(`api/Notes/${id}`).toPromise();
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Note} from "../models/note";
import {PageData} from "../models/page-data";
import {TableState} from "../models/table-state";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient
  ) { }

  async createNote(note: Note): Promise<void> {
    await this.http.post(`api/Notes`, note).toPromise();
  }

  async getNotes(tableState: TableState): Promise<PageData<Note>> {
    console.log(tableState.filter);
    return await this.http.get<PageData<Note>>(`api/Notes?$count=true&$skip=${tableState.skip}&$top=${tableState.pageSize}&$filter=contains(Description,'${tableState.filter ? tableState.filter : ""}')`).toPromise() || new PageData<Note>([],0);
  }

  async updateNote(note: Note): Promise<void> {
    await this.http.put(`api/Notes`, note).toPromise();
  }

  async deleteNote(id: number): Promise<void> {
    await this.http.delete(`api/Notes/${id}`).toPromise();
  }
}

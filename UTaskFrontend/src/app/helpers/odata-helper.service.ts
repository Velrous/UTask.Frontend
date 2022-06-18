import { Injectable } from '@angular/core';
import {DataState} from "../models/data-state";

@Injectable({
  providedIn: 'root'
})
export class OdataHelperService {

  constructor() { }

  public toOdataString(dataState: DataState): string {
    let odataString = `?$count=true&$skip=${dataState.skip}&$top=${dataState.pageSize}`;
    if(dataState.filter.options.length > 0)
    {
      odataString += "&$filter=";
      for(let i=0; i<dataState.filter.options.length; i++) {
        let filterOptions = dataState.filter.options[i];
        switch (filterOptions.operator) {
          case "contains":
            odataString += `contains(tolower(${filterOptions.field}),tolower('${filterOptions.value}'))`;
            break;
          case "eq":
            odataString += `${filterOptions.field} eq ${filterOptions.value}`;
        }
        if(i !== dataState.filter.options.length - 1)
        {
          odataString += ` ${dataState.filter.logic} `;
        }
      }
    }
    if(dataState.sort.length > 0)
    {
      odataString += "&$orderBy=";
      for(let i=0; i<dataState.sort.length; i++) {
        let sortingOptions = dataState.sort[i];
        odataString += `${sortingOptions.field} ${sortingOptions.direction}`
        if(i !== dataState.sort.length - 1)
        {
          odataString += ",";
        }
      }
    }
    return odataString;
  }
}

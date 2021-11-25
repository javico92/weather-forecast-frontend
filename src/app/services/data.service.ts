import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Municilapities} from "../models/municilapities";
import {map} from "rxjs/operators";
import {Forecast} from "../models/forecast";

const API_URL = '/weatherforecast/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getMunicipalities() {
    return this.httpClient
      .get<Municilapities>(API_URL.concat("municipalities"))
      .pipe(
        map((response:Municilapities) => response.municipalities)
      );
  }

  getMunicipalyInformation(identifier: any) {
    let result;
    if(identifier){
      result = identifier.id;
    }
    let url = API_URL.concat(result.concat("/daily/tomorrow"));
    return this.httpClient
      .get<Forecast>(API_URL.concat(result.concat("/daily/tomorrow")));

  }
}

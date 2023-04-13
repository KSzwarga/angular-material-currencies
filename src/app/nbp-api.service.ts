import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NbpApiService {
  constructor(private http: HttpClient) {}

  // API service
  getTable(table: string) {
    return this.http.get(
      `http://api.nbp.pl/api/exchangerates/tables/${table}/?format=json`
    );
  }
  getTableTimeSeries(
    table: string,
    code: string,
    dateFrom: string,
    dateTo: String
  ) {
    return this.http.get(
      `http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${dateFrom}/${dateTo}/?format=json`
    );
  }
}

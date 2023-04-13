import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbpApiService } from '../nbp-api.service';

@Component({
  selector: 'app-table-b',
  templateUrl: './table-b.component.html',
  styleUrls: ['./table-b.component.css'],
})
export class TableBComponent {
  table: any;

  constructor(private service: NbpApiService) {}

  displayedColumns = ['currency', 'code', 'mid'];
  dataSource = new MatTableDataSource<any>([]);
  // simple display data from api
  ngOnInit() {
    this.service.getTable('B').subscribe((response) => {
      this.table = response;
      this.dataSource = this.table[0].rates;
    });
  }
}

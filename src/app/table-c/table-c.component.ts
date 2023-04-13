import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbpApiService } from '../nbp-api.service';

@Component({
  selector: 'app-table-c',
  templateUrl: './table-c.component.html',
  styleUrls: ['./table-c.component.css'],
})
export class TableCComponent {
  table: any;

  constructor(private service: NbpApiService) {}

  displayedColumns = ['currency', 'code', 'bid', 'ask'];
  dataSource = new MatTableDataSource<any>([]);
  // simple display data from api
  ngOnInit() {
    this.service.getTable('C').subscribe((response) => {
      this.table = response;
      this.dataSource = this.table[0].rates;
    });
  }
}

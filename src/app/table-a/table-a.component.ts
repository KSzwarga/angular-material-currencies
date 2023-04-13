import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbpApiService } from '../nbp-api.service';

@Component({
  selector: 'app-table-a',
  templateUrl: './table-a.component.html',
  styleUrls: ['./table-a.component.css'],
})
export class TableAComponent {
  table: any;

  constructor(private service: NbpApiService) {}

  displayedColumns = ['currency', 'code', 'mid'];
  dataSource = new MatTableDataSource<any>([]);
  // simple display data from api
  ngOnInit() {
    this.service.getTable('A').subscribe((response) => {
      this.table = response;
      this.dataSource = this.table[0].rates;
    });
  }
}

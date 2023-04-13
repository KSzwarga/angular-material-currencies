import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbpApiService } from '../nbp-api.service';
import { MatSort } from '@angular/material/sort';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.css'],
})
export class TimeSeriesComponent {
  currencies: any;
  selectedTable: string = '';
  tables: string[] = ['A', 'B'];
  selectedCurrency: string = '';
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  isVisible: boolean = false;
  maxDate: Date = new Date();
  minDate: Date = new Date(new Date().setDate(this.maxDate.getDate() - 365));
  myChart: any;
  displayedColumns = ['effectiveDate', 'mid'];
  dataSource = new MatTableDataSource<any[]>([]);

  @ViewChild('currSort') currSort = new MatSort();
  constructor(private service: NbpApiService) {}

  // general update of all information
  update() {
    this.selectTable();
    this.getData();
  }

  // Gets currencies based on a selected table
  selectTable() {
    if (this.selectedTable === 'A' || this.selectedTable === 'B') {
      this.service.getTable(this.selectedTable).subscribe((response) => {
        this.currencies = Object.entries(response)[0][1].rates;
      });
    }
  }

  // gets data if there is a selected currency
  getData() {
    if (this.selectedCurrency !== '') {
      this.wrongDate();
      this.service
        .getTableTimeSeries(
          this.selectedTable,
          this.selectedCurrency,
          this.dateFrom.toISOString().split('T')[0],
          this.dateTo.toISOString().split('T')[0]
        )
        .subscribe((response) => {
          this.dataSource = new MatTableDataSource(
            Object.entries(response)[3][1]
          );
          this.dataSource.sort = this.currSort;
          const mids = Object.entries(response)[3][1].map(
            (a: { mid: number }) => a.mid
          );
          const dates = Object.entries(response)[3][1].map(
            (a: { effectiveDate: Date }) => a.effectiveDate
          );
          this.makeChart(dates, mids);
        });
    } else {
      this.dataSource = new MatTableDataSource<any[]>([]);
    }
  }

  // swaps dates in case DateTo is before DateFrom
  wrongDate() {
    if (this.dateTo.getTime() < this.dateFrom.getTime()) {
      const tempDate = this.dateFrom;
      this.dateFrom = this.dateTo;
      this.dateTo = tempDate;
    }
  }

  // changes table
  changeTable(value: any) {
    this.selectedTable = value;
    this.update();
  }

  // changes currency
  changeCurrency(value: any) {
    this.selectedCurrency = value;
  }

  // chart update
  updateChart() {
    this.isVisible = true;
    this.update();
  }

  // Checks if user Selected table and currency and shows hint
  validation() {
    let hint: string;
    if (!this.selectedTable) {
      hint = '*Select table';
    } else if (!this.selectedCurrency) {
      hint = '*Select currency';
    } else hint = '';
    return hint;
  }

  // creates and updates the chart if it already exists, creates a chart if there are atleast 5 data entries
  makeChart(days: any, mids: any) {
    if (this.myChart && days.length < 5) {
      this.myChart.clear();
    } else if (this.myChart) {
      this.myChart.data.labels = days;
      this.myChart.data.datasets[0].data = mids;
      this.myChart.update();
    } else if (days.length > 4) {
      this.myChart = new Chart('myChart', {
        type: 'line', //This is a line chart
        data: {
          labels: days, //x-axes data
          datasets: [
            {
              label: 'Line Chart',
              data: mids, //y-axes data
              borderColor: 'black',
              fill: false,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
        },
      });
    }
  }
}

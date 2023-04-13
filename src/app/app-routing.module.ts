import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableAComponent } from './table-a/table-a.component';
import { TableBComponent } from './table-b/table-b.component';
import { TableCComponent } from './table-c/table-c.component';
import { TimeSeriesComponent } from './time-series/time-series.component';

const routes: Routes = [
  { path: 'tableA', component: TableAComponent },
  { path: 'tableB', component: TableBComponent },
  { path: 'tableC', component: TableCComponent },
  { path: 'tableTimeSeries', component: TimeSeriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

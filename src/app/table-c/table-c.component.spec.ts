import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCComponent } from './table-c.component';

describe('TableCComponent', () => {
  let component: TableCComponent;
  let fixture: ComponentFixture<TableCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

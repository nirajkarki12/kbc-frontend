import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionChargeComponent } from './transaction-charge.component';

describe('TransactionChargeComponent', () => {
  let component: TransactionChargeComponent;
  let fixture: ComponentFixture<TransactionChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobOfferDialogComponent } from './add-job-offer-dialog.component';

describe('AddJobOfferDialogComponent', () => {
  let component: AddJobOfferDialogComponent;
  let fixture: ComponentFixture<AddJobOfferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJobOfferDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAreaComponent } from './candidate-area.component';

describe('CandidateAreaComponent', () => {
  let component: CandidateAreaComponent;
  let fixture: ComponentFixture<CandidateAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStatusComponent } from './modify-status.component';

describe('ModifyStatusComponent', () => {
  let component: ModifyStatusComponent;
  let fixture: ComponentFixture<ModifyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

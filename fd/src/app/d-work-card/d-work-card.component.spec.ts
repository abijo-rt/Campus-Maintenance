import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DWorkCardComponent } from './d-work-card.component';

describe('DWorkCardComponent', () => {
  let component: DWorkCardComponent;
  let fixture: ComponentFixture<DWorkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DWorkCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DWorkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

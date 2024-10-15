import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabmenuAdminComponent } from './tabmenu-admin.component';

describe('TabmenuAdminComponent', () => {
  let component: TabmenuAdminComponent;
  let fixture: ComponentFixture<TabmenuAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabmenuAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabmenuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

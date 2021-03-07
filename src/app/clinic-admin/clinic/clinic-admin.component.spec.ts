import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAdminComponent } from './clinic-admin.component';

describe('ClinicAdminComponent', () => {
  let component: ClinicAdminComponent;
  let fixture: ComponentFixture<ClinicAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

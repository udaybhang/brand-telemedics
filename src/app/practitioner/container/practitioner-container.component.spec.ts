import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerContainerComponent } from './practitioner-container.component';

describe('PractitionerContainerComponent', () => {
  let component: PractitionerContainerComponent;
  let fixture: ComponentFixture<PractitionerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

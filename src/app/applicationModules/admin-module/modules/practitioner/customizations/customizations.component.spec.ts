import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizationsComponent } from './customizations.component';

describe('CustomizationsComponent', () => {
  let component: CustomizationsComponent;
  let fixture: ComponentFixture<CustomizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

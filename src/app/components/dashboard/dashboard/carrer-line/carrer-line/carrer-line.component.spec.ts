import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerLineComponent } from './carrer-line.component';

describe('CarrerLineComponent', () => {
  let component: CarrerLineComponent;
  let fixture: ComponentFixture<CarrerLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrerLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

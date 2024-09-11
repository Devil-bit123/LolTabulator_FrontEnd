import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarsComponent } from './stacked-bars.component';

describe('StackedBarsComponent', () => {
  let component: StackedBarsComponent;
  let fixture: ComponentFixture<StackedBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedBarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantCarouselComponent } from './grant-carousel.component';

describe('GrantCarouselComponent', () => {
  let component: GrantCarouselComponent;
  let fixture: ComponentFixture<GrantCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrantCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

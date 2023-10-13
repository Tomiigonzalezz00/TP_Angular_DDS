import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaAddComponent } from './tema-add.component';

describe('TemaAddComponent', () => {
  let component: TemaAddComponent;
  let fixture: ComponentFixture<TemaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemaAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapituloLibrosComponent } from './capitulo-libros.component';

describe('CapituloLibrosComponent', () => {
  let component: CapituloLibrosComponent;
  let fixture: ComponentFixture<CapituloLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapituloLibrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapituloLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamundaViewerComponent } from './camunda-viewer.component';

describe('CamundaViewerComponent', () => {
  let component: CamundaViewerComponent;
  let fixture: ComponentFixture<CamundaViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamundaViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamundaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

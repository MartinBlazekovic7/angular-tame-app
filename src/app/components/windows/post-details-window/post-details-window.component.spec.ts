import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsWindowComponent } from './post-details-window.component';

describe('PostDetailsWindowComponent', () => {
  let component: PostDetailsWindowComponent;
  let fixture: ComponentFixture<PostDetailsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetailsWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

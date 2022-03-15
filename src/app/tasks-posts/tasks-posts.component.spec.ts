import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPostsComponent } from './tasks-posts.component';

describe('TasksPostsComponent', () => {
  let component: TasksPostsComponent;
  let fixture: ComponentFixture<TasksPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

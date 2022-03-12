import { Post } from './post';
import { Task } from './task';

export class User {
  constructor(
    public _id: String,
    public Name: String,
    public Email: String,
    public Street: String,
    public City: String,
    public Zipcode: Number,
    public Tasks: Task[],
    public Posts: Post[],
    public completed: boolean = true
  ) {}
}

import { Post } from './post';

export class User {
  constructor(
    public _id: String,
    public Name: String,
    public Email: String,
    public Street: String,
    public City: String,
    public Zipcode: Number,
    public completed: boolean = false
  ) {}
}

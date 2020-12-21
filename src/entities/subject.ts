import { Student } from './student';

export class Subject {
  constructor(
    public name: string,
    public studyYear: string,
    public students: Student[] = [],
    public id?: number
  ){}
}
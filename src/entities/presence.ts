import { Student } from './student';
import { Subject } from './subject';

export class Presence {
  constructor(
    public subject: Subject,
    public when: Date,
    public students: Student[] = [],
    public id?: number
  ){}

  public static clone(p: Presence):Presence {
    return new Presence(p.subject, new Date(p.when), [...p.students], p.id);
  }

  public getWithLocalTime() {
    return {
      subject: this.subject,
      students: this.students,
      id: this.id,
      when: this.dateToString(this.when)
    }
  }

  private pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  private dateToString(myDate:Date) {
    return myDate.getFullYear() +
      '-' + this.pad(myDate.getMonth() + 1) +
      '-' + this.pad(myDate.getDate()) +
      'T' + this.pad(myDate.getHours()) +
      ':' + this.pad(myDate.getMinutes()) +
      ':' + this.pad(myDate.getSeconds()) +
      '.' + (myDate.getMilliseconds() / 1000).toFixed(3).slice(2, 5);
  };

}
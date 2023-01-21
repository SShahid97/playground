import { Student } from './../student.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }
  students:Student[]=[
    {   
      "id": 1,
      "name": "Shahid",
      "rollno": 100,
      "marks": 405,
      "address": "Lalpora",
      "gender": "male"
  },
  {
      "id": 2,
      "name": "Rahil",
      "rollno": 101,
      "marks": 415,
      "address": "Pampore",
      "gender": "male"
  },
  {
      "id": 3,
      "name": "Mudasir",
      "rollno": 102,
      "marks": 385,
      "address": "Tral",
      "gender": "male"
  },
  {
      "id": 4,
      "name": "Mizrab",
      "rollno": 103,
      "marks": 445,
      "address": "Pampore",
      "gender": "female"
  },
  {
      "id": 5,
      "name": "Sumaira",
      "rollno": 104,
      "marks": 455,
      "address": "Pampore",
      "gender": "female"
  }
  ];

  AddStudent(student:Student){
    this.students.push(student);
  }
}

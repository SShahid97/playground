import { Student } from './../student.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private URL = environment.hostAPIUrl;

  constructor(private http: HttpClient) { }

  // get student by Id
  getStudentById(studentId: number) {
    return this.http.get(this.URL + '/students/' + studentId);
  }

  // get all students
  getStudents() {
    return this.http.get(this.URL + '/students');
  }

  // add a student
  addStudent(student:Student) {
    return this.http.post(this.URL + '/students',student);
  }

  // update a student
  updateStudent(student:Student) {
    return this.http.put(this.URL + `/students/${student.id}`,student);
  }


  // delete a student
  deleteStudent(studentId:number) {
    return this.http.delete(this.URL + `/students/${studentId}`);
  }
  
}

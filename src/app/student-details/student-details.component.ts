import { Student } from './../student.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

import { DataService } from './../Services/data.service';
import { StudentsService } from './../Services/students.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentForm = new FormGroup({
      name: new FormControl(''),
      rollno: new FormControl(''),
      address: new FormControl(''),
      marks: new FormControl(''),
      gender: new FormControl(''),
  });
  studentsCount:number=0;
  studentId:number=0;
  currentStudent:Student | undefined;
  constructor(private dataService: DataService, private router: Router, private acitvatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStudentsCount();
    this.studentId = parseInt(this.acitvatedRoute.snapshot.params["id"]);
    if(this.studentId!=0)
      this.GetStudentById(this.studentId);
  } 
  getStudentsCount(){
    this.dataService.getStudents().subscribe((res:any)=>{
      this.studentsCount=res.length; 
   });
  }
  // for adding student in local file
  // submitForm(){
  //   if(this.studentForm.touched){
  //     this.studentService.AddStudent(this.studentForm.value);
  //     console.log(this.studentForm.value)
  //     this.studentForm.reset();
  //     this.goBackToStudentDetails();
  //   }else{
  //     alert("Please fill in the form fields")
  //   }
  // }
  submitForm(){
    if(this.studentId==0){
      if(this.studentForm.touched){
        this.AddNewStudent(this.studentForm.value);
       }else{
         alert("Please fill in the form fields")
       }
    }else{
      let studentObj:Student = this.studentForm.value;
      studentObj['id'] = this.studentId; 
      this.UpdateStudent(studentObj);
    }
    
  }

  // get student by id
  GetStudentById(studentId:number){
      this.dataService.getStudentById(studentId).subscribe((res:any)=>{
        this.currentStudent=res;
        if(this.currentStudent){
          this.studentForm.setValue({
            name:this.currentStudent.name,
            rollno:this.currentStudent.rollno,
            address:this.currentStudent.address,
            marks:this.currentStudent.marks,
            gender:this.currentStudent.gender,
          })
        }
      });
  }
  
  AddNewStudent(student:Student){
    console.log(student);
    student.id = this.studentsCount+1;
    this.dataService.addStudent(student).subscribe((res:any)=>{
      console.log(res);
    });
  
    this.studentForm.reset();
    this.goBackToStudentDetails();
  }

  UpdateStudent(student:Student){
    this.dataService.updateStudent(student).subscribe((res:any)=>{
      console.log(res);
    })
    this.goBackToStudentDetails();
  }
  goBackToStudentDetails(){
    this.router.navigateByUrl("student-list")
  }

}

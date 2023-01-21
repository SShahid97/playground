import { Student } from './../student.model';
import { Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';

// services
import { StudentsService } from './../Services/students.service';
import { DataService } from './../Services/data.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  constructor(private dataService: DataService, private router:Router) { }
  students: Student[]=[];
  isLoading:boolean=false;
  ngOnInit(): void {
    // this.students = this.studentService.students;  //students array stored locally 
    this.GetStudents();
  }

  goToAddStudent(){
    this.router.navigate([`student-details/${0}`])
  }

  async GetStudents(){
    this.isLoading=true;
    await this.dataService.getStudents().subscribe((res: any)=>{
      // res.forEach((student:Student) => {
      //   this.students.push(student);
      // });
      this.students=res;
      this.isLoading=false;
    })
  }

  EditStudent(id:number){
    this.router.navigate([`student-details/${id}`]);
  }

  DeleteStudent(id:number){
    this.dataService.deleteStudent(id).subscribe((res:any)=>{
      console.log(res);
      // this.students=[];
      this.GetStudents();
    });
    
  }
}

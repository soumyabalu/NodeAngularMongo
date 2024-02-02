import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoapp';
  // writing a a variable to store the API url
   readonly APIUrl= "http://localhost:5038/api/soumyaapp/";

  // initializing HTTP client in the constructor
   constructor(private http:HttpClient){
}
// add an array variable to store notes data
notes:any=[];

// add a method to call notes API
refreshNotes(){
  console.log("calling refresh notes")
  this.http.get(this.APIUrl+'GetNotes').subscribe(data=>{
  this.notes=data;  // assigining the response data to the notes arrat variable
    
  
  })
}
  // ng is the lifecycle method in init  which gets executed on page load and need to call the refreshNotes method here
ngOnInit(){
  this.refreshNotes();
}
// completing addNotes method
addNotes(){
  console.log("statred adding data in the box")
  // first get the input data from the text box
  var newNotes= (<HTMLInputElement>document.getElementById("newNotes")).value;
  // adding form data to send to api
  var formData = new FormData();
  formData.append("newNotes", newNotes);
  this.http.post(this.APIUrl+'AddNotes', formData).subscribe(data=>{
   alert(data)
    // once added we will display the resultb and also refresh the notes data
    this.refreshNotes();
  })
}


// completing addNotes method
deleteNotes(id: any){
  console.log("statred deleting process")
  this.http.delete(this.APIUrl+'DeleteNotes?id='+id).subscribe(data=>{
    alert(data)
    // once added we will display the resultb and also refresh the notes data
    this.refreshNotes();
  
})
}





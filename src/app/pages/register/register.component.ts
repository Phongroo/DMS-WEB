import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/auth/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userServices:UserService,private snack:MatSnackBar,private router:Router,private toast:ToastrService){}
  public user={
    username:'',
    password:'',    
    email:'',
    
  };

  ngOnInit() {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username ==''||this.user.username==null){
      this.snack.open('User name is required!!','',{
        duration:3000,        
      })
      return;
    }
    this.userServices.addUser(this.user).subscribe((data:any)=>{
      console.log(data);
      this.toast.success("SUCCESS")
      this.router.navigate(['login'])

    },(error)=>{
      console.log(error);
      this.snack.open('something went wrong','',{
        duration:3000
      });
      this.toast.error("ERROR");
     

    })
  }
}

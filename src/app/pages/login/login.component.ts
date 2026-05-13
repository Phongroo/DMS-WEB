import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { LoginService } from "src/app/service/auth/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginData={
    username:'',
    password:'',
  };
  constructor(private snack:MatSnackBar,private loginservices:LoginService,private router:Router,private toast:ToastrService) {}

  ngOnInit() {}
  formSubmit(){
    if(this.loginData.username.trim()==''||this.loginData.username==null){
      this.snack.open('user name is required','',{
        duration:3000,
      });
      return;
    }
    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open('user name is required','',{
        duration:3000,
      });
      return;
    }
    this.loginservices.gennerateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('success');
        console.log(data);
        this.loginservices.loginuser(data.token);
        this.loginservices.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginservices.setUser(user);
            console.log(user);
            if(this.loginservices.getUserRole()=='ADMIN'){
              // window.location.href='/admin';
              this.router.navigate(['admin/dashboard'])
              this.loginservices.loginStatusSubject.next(true);
            this.toast.success("success");

            }else if(this.loginservices.getUserRole()=='NORMAL'){
              console.log(222222, this.loginservices.getUserRole())
              // window.location.href='/user-dashboard';
              this.router.navigate(['normal/dashboard'])
              this.loginservices.loginStatusSubject.next(true);
              this.toast.success("success");
            }else{
              this.loginservices.logout();
            }
          }
        );
      },
      (error)=>{
        console.log('Error!');
        console.log(error);
        this.snack.open('Invalid Datails!! Try again','',{
          duration:3000,
        })
      }
    )
  }

}


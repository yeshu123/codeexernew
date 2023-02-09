import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: any;

  constructor() { }

  ngOnInit(): void {
  }
  signin(){
    this.router.navigate("company")
  }

}





// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginFormComponent implements OnInit {

  
//   invalidLogin=false;
//   login:Login = new Login();
//   type: string ="password";
//   isText:boolean = false;
//   eyeIcon: string ="fa-eye-slash";
//   loginForm!: FormGroup;
 

//   constructor(private fb: FormBuilder,private router:Router){ }

//   ngOnInit(): void{
//     this.loginForm = this.fb.group ({
//       username: ['',Validators.required],
//       password: ['',Validators.required]
//     })
//   }
//   hideShowPass(){
//     this.isText = !this.isText;
//     this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
//     this.isText ? this.type = "text" : this.type = "password";

//   }

 

//   private validateAllFormFields(formGroup: FormGroup) {
//     Object.keys(formGroup.controls).forEach(field=> {
//       const control = formGroup.get(field);
//       if(control instanceof FormControl){
//         control.markAsDirty({onlySelf: true});
//       }else if(control instanceof FormGroup){
//         this.validateAllFormFields(control)
//       }
      
//     })
//   }

//   handleLogin() {
    
//         }


// }


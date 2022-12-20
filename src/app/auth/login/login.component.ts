import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup, FormControl } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';
import { first, switchMap } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { NotificationService } from 'src/app/notification.service';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from 'src/app/_services/title.service';
import { timer } from 'rxjs';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  userIP = ''
  private formSubmitAttempt: boolean = false;
  form:any
  ban: any;
  
 
  
 
  mobile: any;
  lastDigits: any;
  submitted: boolean =false;
  public invalidLogin: boolean = false;
  loginForm = new FormGroup({
    contact: new FormControl('', [Validators.required]),
   
});
  errorMessage!: string;
  isSubmitting!: boolean;
  successMessage!: string;
  isAccountVerified!: boolean;
  errors: any;
  maskedPhone: any;
  showOtpScreen: boolean =false;
  user: any;
  loading!: boolean;
  returnUrl: any;
  error: any;
  number: any
  lastDigit: any;
  
// private notification: NotificationService,
  constructor(private fb: FormBuilder,private http: HttpClient,  private httpClient: HttpClient , private router: Router, 
    
        private api: ApiService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private toastr: ToastrService,
        private titleService: TitleService,
        
    ) { this.titleService.setTitle('Login'); }
  ngOnInit(): void {
    
    this.loadIp();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
   
  }
  
  loadIp() {
    this.httpClient.get('https://jsonip.com')
    .pipe(
      switchMap((value:any) => {
      this.userIP = value.ip;
      let url = `http://api.ipstack.com/${value.ip}?access_key=cbe4f387e242602671f1fd7bd9ef997f`
      return this.httpClient.get(url);
      })
    ).subscribe(
      (value:any) => {
      console.log(value);
      },
      err => {
      console.log(err);
      }
    );
    }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
  get f() { return this.loginForm.controls; }
 
onSubmit(): void {
console.log('click',this.loginForm.value.contact)
  if (this.loginForm.invalid) {
      return;
  }


  this.authService.login(
      this.mobile=this.loginForm.value.contact,
      
  )
      .subscribe((res: any) => {
        console.log(res)
        console.log("login response" ,  res);
        
              this.errors = [];
              this.isSubmitting = false;
              if (res.token) {
                  this.user = res;
                  this.lastDigit = this.mobile.toString().slice(-3);
                  
                 // this.router.navigate(['/']);
                  this.showOtpScreen = true;
                  setTimeout(() => {
                    this.showOtpScreen=false;
                },  120000);
              }
          },(err)=>{
            
            this.toastr.error(err.error.msg)

          }
          // (msg) => {
          //     this.errors = msg.error;
          //     console.log(this.errors)
           


              // this.isSubmitting = false;
          // }
          );

}






  

 

  handeOtpChange(value: any): void {
    console.log(value);
  }

  handleFillEvent(value: any): void {
    console.log(value);
 
 }

 timeData:any = "120"
 handleEvent(event: any){
  console.log(event)
  this.showOtpScreen = true;
 
}
regExpMobile:any
onOtpChange(otp:any) {
  console.log(otp)
  this.errorMessage = '';
  if (otp.length ===6) {
      this.isSubmitting = true;
      let data ={mobile:this.mobile,code:otp}
      this.regExpMobile = this.mobile
      //this.api.get(`otp/verify/${otp}`)
      console.log(data)
    
      this.api.post(`verifyotp`,data)
          .subscribe((res: any) => {
            console.log("res from otp", res);
            
              this.isSubmitting = false;
              console.log(res)
              this.errors = [];
              this.authService.updateAuthUser(this.user);
              let url = '/';

              const snapshot = this.activatedRoute.snapshot.queryParams;
              if ('returnUrl' in snapshot && (snapshot['returnUrl'].length && snapshot['returnUrl'] != '/')) {
                  url = snapshot['returnUrl'];
              }

              if (res.success) {
                this.toastr.success("Welcome partner")
                  this.router.navigate(['/merchant/dashboard']);
                  
              }
          },
              (err) => {
                  this.errors = err.error.success
                  console.log ("errormsg" , this.errors)
                  this.toastr.error("Wrong OTP!")
                  if (err.error.message.length) {
                      this.errorMessage = err.error.message.toString();
                  }

                  this.isSubmitting = false;
              });
  }

}
onAuthenticate(): void {
  this.submitted = true;
  this.isSubmitting = true;

  this.errorMessage = '';
  this.successMessage = '';
  this.authService.login(
      // this.loginForm.value.id,
      this.loginForm.value.contact,
      
  )
      .subscribe((res: any) => {
          this.errorMessage = '';
          this.successMessage = '';
          this.isSubmitting = false;
          if (res.token) {
              this.authService.setUser();
              this.router.navigate(['/']);
          } else if (!!res.errors) {
              // @ts-ignore
              for (let e of Object.values(res.errors)) {
                  // @ts-ignore
                  this.errors.push(e);
              }
          }
      },
          (err) => {
              this.errors = err.error.errors;

              if (err.error.message.length) {
                  this.errorMessage = err.error.message.toString();

              }

              this.isSubmitting = false;
          });
}

numberOnly(event:any) {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    this.toastr.warning("Phone Number should be in Number")
    return false;
  }
  return true;



}
}

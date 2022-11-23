import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-branchregister',
  templateUrl: './branchregister.component.html',
  styleUrls: ['./branchregister.component.scss']
})
export class BranchregisterComponent implements OnInit {
  registerForm!:FormGroup;
  otp:boolean=false;
  submitted: boolean =false;
  bname= "IT services";
  oname= "Abdul Hamed";
  oemail="hamed@gmail.com";
  contact=8341554858;
  wcontact=8341554858;
  anumber=293617851384;
  pnumber= "CENPC0484D";
  gstnum="abcdef879";
  pin= 500036;
  loc= "old Malakpet"
  state = "telangana"
  constructor( private fb: FormBuilder, private api:ApiService , private toster :ToastrService ,private router: Router) {
    this. registerForm = this.fb.group({
      "businessname": new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z]*'),Validators.minLength(12),Validators.maxLength(18)]),
      "merchantname": new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(18)]),
      "merchantemail": new FormControl('',[Validators.required,Validators.email]),
      "merchantnumber": new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.minLength(10),Validators.maxLength(12)]),
      "merchantwhatsappnumber": new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.minLength(10),Validators.maxLength(12)]),
      "merchantaadhar": new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{12}$"),Validators.minLength(12),Validators.maxLength(12)]),
      "merchantpan": new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9]*'),Validators.minLength(8),Validators.maxLength(15)]),
      "gstnumber": new FormControl('',[Validators.required,Validators.pattern('[A-Z0-9]*'),Validators.minLength(8),Validators.maxLength(15)]),
      "pincode": new FormControl('',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(6),Validators.maxLength(6)]),
      "address":new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z@#$%^&*?/0-9,.]*'),Validators.minLength(8),Validators.maxLength(15)]), 
      "state": new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9]*'),Validators.minLength(8),Validators.maxLength(20)]),
    });
   }

  ngOnInit(): void {
  }
  onSubmit(){
    this.submitted = true;
    
   
      const formData= new FormData();
      console.log( "dataform", this.registerForm.get('businessname')?.value, 
      this.registerForm.get('merchantname')?.value,this.registerForm.get('merchantemail')?.value,
      this.registerForm.get('merchantnumber')?.value,this.registerForm.get('merchantwhatsappnumber')?.value,
      this.registerForm.get('merchantaadhar')?.value,this.registerForm.get('merchantpan')?.value,
      this.registerForm.get('gstnumber')?.value,this.registerForm.get('pincode')?.value,
     
      this.registerForm.get('address')?.value,
      this.registerForm.get ('state')?.value
      )
      

      formData.append('businessname', this.registerForm.get('businessname')?.value);
      formData.append('merchantname', this.registerForm.get('merchantname')?.value);
      formData.append('merchantemail', this.registerForm.get('merchantemail')?.value);
      formData.append('merchantnumber', this.registerForm.get('merchantnumber')?.value);
      formData.append('merchantwhatsappnumber', this.registerForm.get('merchantwhatsappnumber')?.value);
      formData.append('merchantaadhar',this.registerForm.get('merchantaadhar')?.value);
      formData.append('merchantpan',this.registerForm.get('merchantpan')?.value);
      formData.append('gstnumber',this.registerForm.get('gstnumber')?.value);
      formData.append('pincode', this.registerForm.get('pincode')?.value);
      formData.append('state', this.registerForm.get('state')?.value );
      formData.append('address',  this.registerForm.get('address')?.value);
      var localSt :any=  localStorage.getItem('user')
      console.log("localSt" , localSt);
      
      var stfingify = JSON. parse(localSt);
      var tokenGet = stfingify.token
      
      console.log("asdfdg",tokenGet);
      
    let headers: any = new HttpHeaders().set('Authorization', tokenGet)
      
      this.api.post(`outlet/register`,this.registerForm.value,{ headers: headers})
      .subscribe((res:any )=>{
        console.log('response',res);
        this.otp=true;
        this.submitted = false;
        this.toster.info (res.status)
        if(res.statuscode=== 'ERR'){
          // this.otp = false;
        }
        if(res.statuscode=== 'TXN'){
          // this.otp = true;
        }
        // this.otp = true;
        localStorage.setItem('registerData', JSON.stringify(this.registerForm.value));
        localStorage.setItem('registeredData',  JSON.stringify(res));
        

      },
      (err:any) => {
        console.log(err)
        this.toster.error(err.error.mes)
        this.toster.error(err.error.message)
        
        console.log("errormessage" , err.error.mes );
        
    }
    );
    }

    onOtpChange(otp:any){
      console.log("otp", otp);
      
     const regData:any = localStorage.getItem('registeredData');
     const resData = JSON.parse (regData);
     const registerData:any = localStorage.getItem ('registerData');
     const merchantData :any = JSON.parse (registerData);
  
      const otpData = {
        businessname: merchantData.businessname,
        merchantname: merchantData.merchantname,
        merchantemail:merchantData .merchantemail,
        merchantnumber: merchantData.merchantnumber,
        merchantwhatsappnumber: merchantData.merchantwhatsappnumber,
        merchantaadhar:merchantData.merchantaadhar,
        merchantpan: merchantData.merchantpan,
        gstnumber: merchantData.gstnumber,
        pincode:merchantData.pincode,
        address: merchantData.address,
        state: merchantData.state,
        hash : resData.data.data.hash,
        otpreferenceid: resData.data.data.otpReferenceID,
        otpcode: otp
  
      }
      console.log( "otpData", otpData);
      
  
  
  
      const formData1= new FormData();
      formData1.append('businessname', this.registerForm.get('businessname')?.value);
      formData1.append('merchantname', this.registerForm.get('merchantname')?.value);
      formData1.append('merchantemail', this.registerForm.get('merchantemail')?.value);
      formData1.append('merchantnumber', this.registerForm.get('merchantnumber')?.value);
      formData1.append('merchantwhatsappnumber', this.registerForm.get('merchantwhatsappnumber')?.value);
      formData1.append('merchantaadhar',this.registerForm.get('merchantaadhar')?.value);
      formData1.append('merchantpan',this.registerForm.get('merchantpan')?.value);
      formData1.append('gstnumber',this.registerForm.get('gstnumber')?.value);
      formData1.append('pincode', this.registerForm.get('pincode')?.value);
      formData1.append('state', this.registerForm.get('pincode')?.value );
      formData1.append('address',  this.registerForm.get('address')?.value);
      formData1.append('hash',  resData.data.data.hash);
      formData1.append('otpreferenceid', resData.data.data.otpReferenceID);
      formData1.append('otpcode',  otp);
       if(otp.length===6){
        var localSt :any=  localStorage.getItem('user')
      console.log("localSt" , localSt);
      
      var stfingify = JSON. parse(localSt);
      var tokenGet = stfingify.token
      
      console.log("asdfdg",tokenGet);


        let headers = new HttpHeaders().set('Authorization', tokenGet)
        // headers.append('Content-Type','application/json' );
        
        
        this.api.post(`outlet/verifyotp`,otpData,  { headers: headers})
        .subscribe((res: any) => {
          this.toster.success ("successfuly Registered to PaySikka Business")
          this.router.navigate(['merchant/list-of-outlets'])
          console.log("sucuessOTPDAT", res);
          
  
        },
        (err:any) => {
          console.log(err)
          this.toster.error(err.error.Error)
          
          console.log("errormessage" , err.error.mes );
          
      }
         
       )}
     }


}

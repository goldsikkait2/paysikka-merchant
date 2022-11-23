import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastEvokeService, ToastProgressBarEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ToastNotificationInitializer,
  DialogLayoutDisplay,
  
  DisappearanceAnimation,
  AppearanceAnimation,
  ToastPositionEnum,
} from '@costlydeveloper/ngx-awesome-popup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editForm!:FormGroup;
 
  errors: any;
  errorMessage: any;
  selectedImage: any;
  imageSrc: any;
 
  pincode: any;
  address: any;
  addre: any;
  merchantProfile: any;
  merchantAddress: any;
  merchantGstNumber: any;
  merchantAadhar: any;
  merchantEmail: any;
  merchantImage: any;
  merchantName: any;
  merchantNumber: any;
  merchantWhatsappNumber: any;
  merchantPincode: any;
  merchantBusinessName: any;
  merchantPan: any;
  loading: boolean =false;
  submitted: boolean =false;
  cd: any;
  bname: any;
  response_post: any;
  merimg: any;
  merchent2Image: any;
  storedImgMerchant: any;
  imgData: any;

  constructor(private api:ApiService , private authserv: AuthService,private http:HttpClient,private toastEvokeService: ToastEvokeService,private fb: FormBuilder,private route: ActivatedRoute, private router: Router) {
   this.editForm = this.fb.group({
      profil_pic: new FormControl('', [Validators.required]),
      business_Name:new FormControl('', [Validators.required,Validators.minLength(12),Validators.maxLength(18)]),
      owner_name:new FormControl('', [Validators.required,Validators.minLength(12),Validators.maxLength(18)]),
      email:new FormControl('', [Validators.required]),
      contact_number:new FormControl('', [Validators.required]),
      gst:new FormControl('', [Validators.required]),
      w_number :new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      merchant_pan:new FormControl('', [Validators.required]),
      merchant_adhaar:new FormControl('', [Validators.required]),
      pincode:new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
      address:new FormControl('', [Validators.required,Validators.minLength(12),Validators.maxLength(30)]),
      
     
  })
  
   }
   getMerchantProfile(){
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`profile`,{headers}).subscribe((r: any) => {
      this.merchantProfile = r;
      this.merchantAddress=r.address
      this.merchantGstNumber=r.gstnumber;
      this.merchantAadhar=r.merchantaadhar;
      this.merchantEmail=r.merchantemail;
      this.merchantImage=r.merchantimage;
      this.merchantName=r.merchantname;
      this.merchantNumber=r.merchantnumber;
      this.merchantWhatsappNumber=r.merchantwhatsappnumber;
      this.merchantPincode=r.pincode;
      this.merchantBusinessName=r.businessname;
      this.merchantPan=r.merchantpan
      
      console.log(r);
      
      console.log("merchantprofile" , this.merchantProfile, this.merchantAddress,  this.merchantImage );
      
    });
  }

  ngOnInit(): void {
    
    
    this.getMerchantProfile();
  
  }
  get f() { return this.editForm.controls; }
//   onFileChange(event:any) {
//     const reader = new FileReader();
//     if (event.target.files && event.target.files.length) {
//       const [file] = event.target.files;
//       this.selectedImage = event.target.files[0];
//       console.log("onfileChange" ,  this.selectedImage);
      
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         this.imageSrc = reader.result as string;
//       };

// // otp code 

//     }}
uploadFile(event:any)  {
  let reader = new FileReader(); // HTML5 FileReader API
  this. file = event.target.files[0];
  console.log("fileImgge", this.file);
  
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(this.file);
    
    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.merchantImage = reader.result;
      this.editForm.patchValue({
        // file: reader.result as any
      });
      this.editFile = false;
      this.removeUpload = true;
    }
    // ChangeDetectorRef since file is loading outside the zone
    // this.cd.markForCheck();        
  }
}
 
  onSubmit(): void {
    this.submitted = true;
    console.log("imageget",this.file)
     const formData = new FormData();
//  if(this.file === undefined){
//   formData.append('merchantimage',this.merchantImage);
//   console.log("if" , formData.append('merchantimage',this.file));
  
//  }
//  else{
//   formData.append('merchantimage',this.file);
//   console.log("else" , formData.append('merchantimage',this.file));
//  }
 
     formData.append ('merchantimage', this.file) 
     formData.append('businessname', this.editForm.get('business_Name')?.value);
     formData.append('merchantname', this.editForm.get('owner_name')?.value);
     formData.append('merchantemail', this.editForm.get('email')?.value);
     formData.append('merchantnumber', this.editForm.get('contact_number')?.value);
     formData.append('gstnumber', this.editForm.get('gst')?.value);
     formData.append('merchantwhatsappnumber', this.editForm.get('w_number')?.value);
     formData.append('merchantpan', this.editForm.get('merchant_pan')?.value);
     formData.append('merchantaadhar', this.editForm.get('merchant_adhaar')?.value);
     formData.append('pincode', this.editForm.get('pincode')?.value);
     formData.append('address', this.editForm.get('address')?.value);
    
     let merchantimage2 = this.imageSrc;
     let businessname =this.editForm.get('business_Name')?.value;
     let merchantname =this.editForm.get('owner_name')?.value;
     let merchantemail=this.editForm.get('email')?.value;
     let  merchantnumber=this.editForm.get('contact_number')?.value;
     let  gstnumber=this.editForm.get('gst')?.value;
     let merchantwhatsappnumber= this.editForm.get('w_number')?.value
     let merchantpan=this.editForm.get('merchant_pan')?.value;
     let merchantaadhar=this.editForm.get('merchant_adhaar')?.value;
     let pincode=this.editForm.get('pincode')?.value;
     let address=this.editForm.get('address')?.value;
var merchantimage:any;
if(this.file===undefined){
  merchantimage=this.merchantImage
}else{
  merchantimage=this.file;
}

const data ={merchantimage,businessname,merchantname,merchantemail,merchantnumber,gstnumber,merchantwhatsappnumber
,merchantpan,merchantaadhar,pincode,address
}

console.log("data.." , data);
console.log("bname", businessname);




 


     console.log(this.editForm.get('business_Name')?.value,
    
     this.editForm.get('profil_pic')?.value,
     this.editForm.get('owner_name')?.value,
     this.editForm.get('email')?.value,
     this.editForm.get('contact_number')?.value,
     this.editForm.get('gst')?.value,
     this.editForm.get('w_number')?.value,
     this.editForm.get('merchant_pan')?.value,
     this.editForm.get('merchant_adhaar')?.value,
     this.editForm.get('address')?.value,
     this.editForm.get('pincode')?.value 


     );
     this.editForm.value

     let form ={
      
     }
     this.loading = true;
     const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
      this.editForm.value
     this.api.post('profileupdate',formData,{headers}).subscribe(res => {
             console.log("res" , res);
             this.api.merchentData(address ) ;
            
            
          
 this.api.merchentBname(businessname ) ;
 this.api.merchentImage(merchantimage)
 if(this.file!==undefined){
  setTimeout(function(){
    window.location.reload();
  },1000);  
} 


//  this.api.img() ;
//  setTimeout(() => {
//   window.location.reload();
// }, 2000); // Activate after 5 minutes.
            
             this.loading = false;
            //  localStorage.setItem("image",JSON.stringify(merchantimage))

            // this.bname =this.response_post.businessname
        // console.log( "datacomtransfer",
             
        //      this.api.merchentData(this.response_post.businessname) )

            // this.editForm.reset()
            
            //  this.toastEvokeService.success('Dear partner', 'Profile Successfully updated').subscribe();
            //  window.location.reload();
            //refresh page
          //   this.toastNotification()
          //   setTimeout(function(){
          //     window.location.reload();
          //  }, 3000);
            
  //           this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  // this.router.onSameUrlNavigation = 'reload';
  // this.router.navigate(['./'], { relativeTo: this.route });
           },
           (err) => {
            this.loading = false;
            this.errors = err.error.message
            console.log ("errormsg" , this.errors)
            this.toastEvokeService.danger('Hey!', 'Sorry! Please try agai').subscribe();
            
            // if (err.error.message.length) {
            //     this.errorMessage = err.error.message.toString();
            // }

            
        }
        );
           
      
        
      }
           
 



 toastNotification() {
  const newToastNotification = new ToastNotificationInitializer();

  // newToastNotification.setTitle('Profile Updated');
  newToastNotification.setMessage(' Your Profile Updated Successfully!');

  // Choose layout color type
  newToastNotification.setConfig({
  autoCloseDelay: 3000, // optional
  textPosition: 'center', // optional
  layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
  progressBar: ToastProgressBarEnum.DECREASE, // INCREASE | DECREASE | NONE
  toastUserViewType: ToastUserViewTypeEnum.STANDARD, // STANDARD | SIMPLE
  animationIn: AppearanceAnimation.SWING, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
  animationOut: DisappearanceAnimation.ZOOM_OUT_ROTATE, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
   // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
  toastPosition: ToastPositionEnum.BOTTOM_RIGHT,
  });

  // Simply open the popup
  newToastNotification.openToastNotification$();
}

// upload image
// submitted!: boolean;
  
//   constructor(
//     public fb: FormBuilder,
//     private cd: ChangeDetectorRef
//   ) {}

  // /*##################### Registration Form #####################*/
  // registrationForm = this.fb.group({
  //   file: [null]
  // })  

  /*########################## File Upload ########################*/
  // @ViewChild('fileInput')
  // el!: ElementRef;
  // imageUrl = this.merchantImage;
  editFile: boolean = true;
  removeUpload: boolean = false;
file:any
 

  // Function to remove uploaded file
  // removeUploadedFile() {
  //   let newFileList = Array.from(this.el.nativeElement.files);
  //   this.imageUrl = 'https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png';
  //   this.editFile = true;
  //   this.removeUpload = false;
  //   this.registrationForm.patchValue({
  //     file: [null]  as any
  //   });
  // }
  
}
 

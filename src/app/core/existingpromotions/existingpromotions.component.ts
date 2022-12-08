import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-existingpromotions',
  templateUrl: './existingpromotions.component.html',
  styleUrls: ['./existingpromotions.component.scss']
})
export class ExistingpromotionsComponent implements OnInit {
  ListofPromotions: any;
  paramGlobal: any;
  closeResult = '';
  loading: boolean = false;
contentForm!:FormGroup;
file:any
  errors: any;
  packageidVariable: any;
  merchantImage: any
  imageSrc: any;
  storepacakgeid: any;
  modalVisible!: boolean;

  constructor(public authserv:AuthService, private api: ApiService, private router:ActivatedRoute,private modalService: NgbModal,private fb: FormBuilder, private toastr: ToastrService,) {
    this.contentForm = this.fb.group({
      content: new FormControl('', [Validators.required]),
      image:new FormControl('', [Validators.required]),
      // packageid:new FormControl(this.packageidVariable, [Validators.required])

    })
   }

  ngOnInit(): void {
    this.router.params.subscribe((params)=>{
      this.paramGlobal = params['id']
      console.log("dsfgfdgfg2", this.paramGlobal);
   this.getListOfPromotions();
      
      
    })
    this.getListOfPromotions()
  }
  getListOfPromotions(){
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`/promotions/package/${this.paramGlobal}`,{headers}).subscribe((r: any) => {
      this.ListofPromotions = r;
      
     
      
      // for(let data of this.ListofPromotions ){
      //   // const byId:any = this.ListofPromotions.promotionid
      //   console.log("promotionid....asdfsdf",data.packageid );
      // }
      
      console.log("ListofPromotions" , this.ListofPromotions);
      for(let data of this.ListofPromotions){
        console.log('existing promotions',data.packageid)
        this.packageidVariable = data.packageid
      }
      
      
    });
}



open(content:any, packageid:any) {
  
  this.storepacakgeid = packageid;
  console.log("packageid22222" , this.storepacakgeid);
  this.contentForm.reset();
  
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
uploadFile(event:any)  {
  let reader = new FileReader(); // HTML5 FileReader API
  this.file = event.target.files[0];
  console.log("fileImgge", this.file);
  
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(this.file);
    
    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.merchantImage = reader.result;
      this.contentForm.patchValue({
        // file: reader.result as any
      });
      
    }
           
  }
}
get f() { return this.contentForm.controls; }
 
onSubmit(){
  console.log("inside Onsubmit");
  
this.loading=true
let formData = new FormData();
if (this.contentForm.invalid) {
        return;
    }
    
    formData.append('image', this.file);
    formData.append('description',this.contentForm.get('content')?.value) 
    formData.append ('promotionid' , this.storepacakgeid)
    
  
  

 

//  testing
const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    console.log("header" , headers );
 
    this.api.post('promotions/purchase',formData ,{headers}).subscribe(res => {
                console.log("doneimgaedata post inde" , res);
                this.loading = false;
                this.modalService.dismissAll();
                this.contentForm.reset();
                this.toastr.success("Uploaded successfully")
                
              },
              (err) => {
               this.loading = false;
               this.errors = err.error.message
               console.log ("errormsg" , this.errors)
                   }
           );

}



}

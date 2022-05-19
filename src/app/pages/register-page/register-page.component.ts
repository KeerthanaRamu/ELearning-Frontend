import { Component, OnInit } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {


    existingUser=false;
    messageContent='';
    passwordIsValid = false;
    passwordValid(event) {
      this.passwordIsValid = event;
    }
    //-----webcam------------------------------
    public showWebcam = false;
    public allowCameraSwitch = true;
    public multipleWebcamsAvailable = false;
    public deviceId: string;
    public videoOptions: MediaTrackConstraints = {
      width: {ideal: 500},
      height: {ideal: 500}
    };
    public errors: WebcamInitError[] = [];
  
    // latest snapshot
    public webcamImage: WebcamImage = null;
  
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  
    //--------------------------------

    registerFormSubmitted = false;
    registerForm: FormGroup;

  constructor(private toastrService:ToastrService,private formBuilder: FormBuilder,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password:['',Validators.required],
        selfieImage:['']
      }, {
    });

    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });

  }

  get rf() {
    return this.registerForm.controls;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // console.info('received webcam image', webcamImage);
    this.showWebcam = false;
    this.webcamImage = webcamImage;
    console.log("this.webcamImage=========",this.webcamImage);
    this.registerForm.patchValue({
      selfieImage: this.webcamImage.imageAsDataUrl,
    });
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  setRegistrationDetails(){
    // alert("hiii");
    this.registerFormSubmitted=true;
    console.log("---",this.registerForm.value);
    if(this.registerForm.valid){
      this.loginService.setUserDetails(this.registerForm.value)
      .subscribe((res) => {
          if(res['status'] == 'Success'){
            this.toastrService.success('Registered Successfully!!')
            this.router.navigate(['/login']);
          }else{
            this.existingUser=true;
            this.messageContent='User Already Exists'
          }
      })
    }
    
  }

}

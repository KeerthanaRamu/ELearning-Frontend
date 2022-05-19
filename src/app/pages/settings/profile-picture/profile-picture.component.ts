import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators,FormArray, FormBuilder,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {

  profilePictureForm:FormGroup;
  userInfo: any;

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

  constructor(private authService:AuthService,private toastrService: ToastrService,private formBuilder: FormBuilder,private loginService:LoginService,private router:Router,private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
      this.profilePictureForm = this.formBuilder.group({
        id:[''],
        profile_img: ['',Validators.required]
      }, {
    });
    this.getCurrentUser();
    this.authService.isStateChanged.next(2);
    
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
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
    this.profilePictureForm.patchValue({
      profile_img: this.webcamImage.imageAsDataUrl,
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

  getCurrentUser(){
    this.loginService.getCurrentUser(sessionStorage?.authToken)
    .subscribe(res=>{
        this.userInfo=res['userInfo'][0];
        this.profilePictureForm.patchValue({
          'id':this.userInfo.id,
          
        })
        this.cdr.detectChanges();
        console.log("this.userInfo===",this.userInfo);
    })
  }

  updateProfileImage(){
    this.loginService.updateProfileImage(this.profilePictureForm.value)
    .subscribe(res=>{
        this.toastrService.success('Updated Successfully.');
        this.getCurrentUser();
    })
  }

}

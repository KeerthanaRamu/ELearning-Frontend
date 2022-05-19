import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/services/login.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import * as faceapi from 'face-api.js';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  //-----webcam------------------------------
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 500 },
    height: { ideal: 500 }
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  //--------------------------------

  warningMsg = false;
  messageContent = '';
  loginFormSubmitted = false;
  loginForm: FormGroup;
  showLoginEmail = true;
  showLoginSelfie = false;
  userData;
  MIN_FACE_SIZE_RATIO = 0.01;
  MAX_FACE_SIZE_RATIO = 0.9;
  urole: any;


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.run();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [''],
      selfieImage: ['']
    }, {
    });

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

  }

  get rf() {
    return this.loginForm.controls;
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

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // console.info('received webcam image', webcamImage);
    this.showWebcam = false;
    this.webcamImage = webcamImage;
    // console.log("this.webcamImage=========",this.webcamImage);
    this.loginForm.patchValue({
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

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }


  async run() {

    faceapi.nets.tinyFaceDetector.loadFromUri('../../../assets/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('../../../assets/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('../../../assets/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('../../../assets/models')

  }


  showEmailLogin() {
    this.warningMsg = false;
    this.loginForm.patchValue({
      email: '',
      password: '',
      selfieImage: ''
    })
    this.showLoginEmail = true;
    this.showLoginSelfie = false;
  }

  showSelfieLogin() {
    this.loginService.getUserList()
      .subscribe(res => {
        this.userData = res;
        console.log("this.userData===", this.userData);
        this.warningMsg = false;
        this.loginForm.patchValue({
          email: '',
          password: '',
          selfieImage: ''
        })
        this.showLoginEmail = false;
        this.showLoginSelfie = true;
        const mediaDevices = navigator.mediaDevices;
        if (mediaDevices == null) {
          window.alert("navigator.mediaDevices is nullish");
          return;
        }
        mediaDevices
          .getUserMedia({
            video: { width: 300, height: 300, facingMode: "user" }, //width: 1280, height: 650,
            audio: false,
          })
          .then(
            (stream) => {
              const vid = document.createElement("video") as HTMLVideoElement;
              vid.setAttribute("playsinline", "true");
              vid.addEventListener("canplay", () => {
                this.checkLiveness(vid, stream);
              });

              vid.id = "videoElement";
              vid.srcObject = stream;
              vid.style.transform = "scaleX(-1)";
              vid.style['border-radius'] = "50%"
              vid.play().catch((error) => {
                window.alert("video.play error:" + error.toString());
              });
              document.querySelector("#videoContainer").appendChild(vid);

            },
            (error) => {
              window.alert("getUserMedia error:" + error.toString());
            }
          );
      })

  }

  async checkLiveness(vid, stream) {
    setTimeout(async () => {
      console.log("I am called!!!!!!!!", vid)
      const liveImg = await faceapi.detectSingleFace(vid, new faceapi.TinyFaceDetectorOptions({ inputSize: 160 })).withFaceLandmarks().withFaceDescriptor();
      console.log("liveImg=======", liveImg);
      if (liveImg) {
        console.log("login====live img==detected======", liveImg)
        vid.remove();
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        this.sendLivenessCheckRequest(liveImg)
      } else {
        console.log("login=====live check detection failed=====");
        this.warningMsg = true;
        this.messageContent = 'Login Failed, please try again';
        vid.remove();
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
    }, 2000);
  }

  loadLabeledImages() {
    console.log("=============================", this.userData);
    if (this.userData.length > 0) {
      return Promise.all(
        this.userData.map(async label => {
          const descriptions = [];
          const img = await faceapi.fetchImage(label.selfie_image);
          const displaySize = { width: img.width, height: img.height }
          if (img) {
            console.log("img==", label.id);
            const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 160 })).withFaceLandmarks().withFaceDescriptor();
            if (detections) {
              const resizedDetections = faceapi.resizeResults(detections, displaySize)
              console.log(detections)
              descriptions.push(detections.descriptor);
              console.log("descriptions", descriptions)
            }
            return new faceapi.LabeledFaceDescriptors(label.authToken, descriptions)
          }
        })
      )
    }
  }


  async sendLivenessCheckRequest(liveImg) {
    this.warningMsg = false;
    const labeledFaceDescriptors = await this.loadLabeledImages();
    console.log("login=====registered users detection=====", labeledFaceDescriptors);
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5);
    console.log("login==generating== face matcher==with threshhold===", faceMatcher);
    const results = faceMatcher.findBestMatch(liveImg.descriptor)
    console.log((results))
    if (results) {
      console.log("login==best match=====", results);
      if (results.label != 'unknown') {
        console.log("login==Match found=====logged in Successfully!!!");
        this.warningMsg = false;
        for (let i = 0; i < this.userData.length; i++) {
          if (results.label == this.userData[i].authToken) {
            this.urole = this.userData[i].role;
          }
        }
        sessionStorage.setItem('authToken', results.label);
        sessionStorage.setItem('ullevel', this.urole);
        this.authService.isUserLoggedIn.next(true);
        this.authService.isUser.next(this.urole == 0 ? true : false);
        this.router.navigate(['']);
      } else {
        console.log("login==No Match found=====Invalid user!!!");
        this.warningMsg = true;
        this.messageContent = "Invalid User";
        this.router.navigate(['/login']);
      }
    } else {
      console.log("login==best match=detection failed====User Face Not Recognised,Please try again!!!");

      this.warningMsg = true;
      this.messageContent = "User Face Not Recognised,Please try again"
      this.router.navigate(['/login']);
    }

  }

  getLoginUser() {
    this.warningMsg = false;
    this.loginFormSubmitted = true;
    if (this.showLoginEmail == true) {
      if (this.loginForm.value.email !== '' && this.loginForm.value.password !== '') {
        this.loginService.getLoginUser(this.loginForm.value)
          .subscribe(res => {
            console.log("res=====", res);
            if (res['status'] == 'Success') {
              this.warningMsg = false;
              sessionStorage.setItem('authToken', res['authToken']);
              sessionStorage.setItem('ullevel', res['role']);
              this.authService.isUserLoggedIn.next(true);
              this.authService.isUser.next(this.urole == 0 ? true : false);
              this.router.navigate(['']);
            } else {
              this.warningMsg = true;
              this.messageContent = 'Invalid Email OR Password'
            }
          })
      } else {
        this.warningMsg = true;
        this.messageContent = ((this.loginForm.value.email == '' && this.loginForm.value.password == '') ? 'Email and Password is required' : (this.loginForm.value.password == '' ? 'Password is required' : 'Email is required'))
      }
    } else {
      if (this.loginForm.value.selfieImage !== '') {
        this.loginService.getLoginUser(this.loginForm.value)
          .subscribe(res => {
            alert(res['status'])
          })
      } else {
        this.warningMsg = true;
        this.messageContent = 'Selfie is required'
      }

    }

  }

}


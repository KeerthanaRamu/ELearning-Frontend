import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { InstructorService } from 'src/services/instructor.service';
import Hls from 'hls.js';
import { NgForm, FormGroup, FormControl, Validators,FormArray, FormBuilder,AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-learnings',
  templateUrl: './my-learnings.component.html',
  styleUrls: ['./my-learnings.component.scss']
})
export class MyLearningsComponent implements OnInit {

  learningList;
  showList=true;
  showLearning=false;
  courseLandingImage;
  PlayList;
  userProfileImage;
  currentCourseBasic;
  courseForInfo;
  courseObjectiveInfo;
  courseRequirementsInfo;
  instructorInfo;
  learninfo={};
  showOverview: boolean=true;
  questionlist;
  selectedItem = {
    firstLi: 1
  }
  showQuesList: boolean = false;
  showAskQues: boolean = false;
  showAnsList:boolean=false;
  questionForm:FormGroup;
  answerForm:FormGroup;
  currentLecture;
  currentQues;
  answerlist;
  newNote: boolean = false;
  addNotes: boolean = false;
  notesForm:FormGroup;
  notesEditForm:FormGroup;
  notesList:any;  
  deleteNote;
  videoTime='0.0';
  notesExistsTimings=[];
  resourceList: any;
  public showAssessment=false;
  public showVideo=true;
  videoQueriesList;
  anscount: number=0;
  count=0;
  disableBtn:boolean=true;
  announcementList: any;
  userInitial: any;
  showComInfo: boolean=false;
  announcementCommentForm:FormGroup;
  announcementCommentEditForm:FormGroup;
  loggedUser: any;
  currentCommentToDel: any;
  showAll: boolean=false;

  constructor( private cdref:ChangeDetectorRef,private formBuilder:FormBuilder,private route: ActivatedRoute,private toastrService:ToastrService,private instructorService:InstructorService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.learninfo['id'] = JSON.parse(params["learn"]);
      this.learninfo['user_id'] = JSON.parse(params["us"]);
        this.PlayVideo(this.learninfo);
    })

    this.questionForm=this.formBuilder.group({
        title:['',Validators.required],
        details:['']
    })

    this.answerForm=this.formBuilder.group({
        answer:['',Validators.required]
    })

    this.notesForm=this.formBuilder.group({
        notes:['',Validators.required]
    })

    this.notesEditForm=this.formBuilder.group({
        notesEdit:['',Validators.required]
    })

    this.announcementCommentForm=this.formBuilder.group({
      comment:['',Validators.required]
    })

    this.announcementCommentEditForm=this.formBuilder.group({
      comment:['',Validators.required]
    })
  

  }

  listClick(event, newValue, value) {
    console.log(newValue);
    this.selectedItem[value] = newValue;
   
    this.cdref.detectChanges();
    if(newValue == 2){
        this.getQuesList();
    }
    if(newValue == 3){
      this.newNote=true;
      this.addNotes=false;
      this.getNotesList();
    }
    if(newValue == 4){
        this.getAnnouncementListWithComment(this.instructorInfo?.authToken);
    }

  }

  getAnnouncementListWithComment(instructorid){
    this.instructorService.getAnnouncementListWithComment(instructorid)
    .subscribe(res=>{
      console.log("res['data']=====",res['data']);
        this.announcementList=res['data']
    })
  }

  toggleAccordian(event, index) {
    console.log("0000",event.target)
    const element = event.target;
    element.classList.toggle("active");
    if (this.PlayList[index].isActive) {
      this.PlayList[index].isActive = false;
    } else {
      this.PlayList[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = "100vh";
    }
  }


  PlayVideo(learndt){
    this.instructorService.getLearningVideoToPlay(sessionStorage.authToken,learndt)
    .subscribe((res) => {
      this.showAssessment=false;
      this.showVideo=true;
      this.currentCourseBasic=res['courseData'][0];
      this.courseForInfo=res['coursefor'];
      console.log("this.courseForInfo===",this.courseForInfo);
      this.courseObjectiveInfo=res['courseObj'];
      this.courseRequirementsInfo=res['courseReq'];
      this.instructorInfo=res['instructorinfo'][0];
      this.courseLandingImage=res['courseData'][0].course_image;
      var track;
      this.PlayList=res['videoList'];
      console.log("this.PlayList====",this.PlayList)
      // this.showAlert=false;
      // this.cdRef.detectChanges();
      this.userProfileImage=res['userinfo'][0].selfie_image;
      this.userInitial=(res['userinfo'][0].user_name).charAt(0) ;
      this.loggedUser=res['userinfo'][0];
      if(this.PlayList.length > 0){
  //------------------------------------------------------------------------------------
        var video = document.getElementById('video') as HTMLVideoElement;
        var videoSrc=this.PlayList[0].lectures[0].video_url;
        this.currentLecture=this.PlayList[0].lectures[0];
        this.PlayList[0].isActive = true;
        this.PlayList[0].showPlay='#ccc';
        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
          // video.play();
          
          hls.on(Hls.Events.MANIFEST_PARSED, function() {
         });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc;
          video.addEventListener('loadedmetadata', function() {
          });
        }
        
        var supposedCurrentTime = 0;
      //-----------------to restrict forward--------------------------------  
      
        // prevent user from seeking
        // video.addEventListener('seeking', function() {
        //   var delta = video.currentTime - supposedCurrentTime;
        //   if (Math.abs(delta) > 0.01) {
        //     video.currentTime = supposedCurrentTime;
        //   }
        // });

        video.addEventListener("timeupdate",()=>{
          var curTime=video.currentTime;
          var secs = curTime % 60;
          curTime = (curTime - secs) / 60;
          var mins = curTime % 60;
          var hrs = (curTime - mins) / 60;
          // console.log("====",hrs,':',mins,':',(secs).toFixed());
          this.videoTime=(hrs > 0 ? (hrs+":"+mins+":"+(secs).toFixed()):(mins+":"+(secs).toFixed()));
          // console.log("formatted===time-===",this.videoTime)
        })

        video.addEventListener('ended', ()=> {
          supposedCurrentTime = 0;
          this.instructorService.getAssessmentList(this.currentLecture.user_id,this.currentLecture.course_id,this.currentLecture.section_id,this.currentLecture.id)
          .subscribe(res=>{
              this.videoQueriesList=res['data'];
              if(this.videoQueriesList.length > 0){
                this.showAssessment=true;
                this.showVideo=false;
              }else{
                this.showAssessment=false;
                this.showVideo=true;
              }
          })
        })

        video.addEventListener('pause', ()=> {
        })

        video.addEventListener("webkitfullscreenchange", function (e) {
          console.log('isFullscreen ', e);
      });

        
    } else{
      // this.noData=true;
      // this.cdRef.detectChanges();
    }
  } ,err=>{
    // this.showAlert=true;
    // this.errorMessage="Ooops, something is wrong, please try again";
    // this.cdRef.detectChanges();
  })
}

changeVideoToPlay(child,lecturesLi){
  this.showAssessment=false;
  this.showVideo=true;
  var video = document.getElementById('video') as HTMLVideoElement;
  var videoSrc=child.video_url;
  this.currentLecture=lecturesLi;
  console.log("lecturesLi===",lecturesLi);
  var videoDuration;
  this.instructorService.setLectureViewInfo(sessionStorage.authToken,child)
  .subscribe(res=>{
      for(let i=0;i<lecturesLi.length;i++){
        if(lecturesLi[i].id == child.id){
          lecturesLi[i].showPlay='#ccc';
          lecturesLi[i].videoDur=videoDuration;
        }else{
          lecturesLi[i].showPlay="";
          lecturesLi[i].videoDur="";
        }
      }
  })
 
 
  console.log("videoSrc=====111====",videoSrc)
  // this.PlayList[0].isActive = true;
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
   });
   video.play();
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
    video.addEventListener('loadedmetadata', function() {
      video.play();
     
    });
  }
  video.addEventListener('ended', ()=> {
    console.log("child====",child);
    this.instructorService.getAssessmentList(child.user_id,child.course_id,child.section_id,child.id)
    .subscribe(res=>{
        this.videoQueriesList=res['data'];
        if(this.videoQueriesList.length > 0){
          this.showAssessment=true;
          this.showVideo=false;
        }else{
          this.showAssessment=false;
          this.showVideo=true;
        }
    })
  })
}

getQuesList(){
  this.showQuesList=true;
    this.showAskQues=false;
    this.showAnsList=false;
    this.instructorService.getQuestionareDetails(this.learninfo)
    .subscribe(res=>{
        this.questionlist=res;
    })
}

getAnswerList(ques){
  this.showQuesList=false;
    this.showAskQues=false;
    this.showAnsList=true;
    this.currentQues=ques;
    this.answerForm.patchValue({
      answer:''
    })
    this.instructorService.showExistingReply(ques)
    .subscribe(res=>{
        this.answerlist=res;
    })
}


goToNewQuestion(){
  this.showQuesList=false;
  this.showAskQues=true;
  this.showAnsList=false;
  this.questionForm.patchValue({
    title:'',
    details:''
  })
}

goToList(){
  this.getQuesList();
}


setQuestionInfo(){
  console.log("currentLecture====",this.currentLecture);
  this.instructorService.setQuestionInfo(sessionStorage.authToken,this.currentLecture,this.questionForm.value)
  .subscribe(res=>{
    if(res['status'] == 'Success'){
      this.toastrService.success("Sent Successfully");
      this.getQuesList();

    }
  })
}

setAnswerInfo(){
  this.instructorService.setAnswerInfo(sessionStorage.authToken,this.currentQues,this.answerForm.value)
  .subscribe(res=>{
      if(res['status'] == 'Success'){
        this.toastrService.success("Updated Successfully!!");
        this.getQuesList();
      }
  })
}

showAddNotes(){
  this.notesForm.patchValue({notes:''});
  if(!this.notesExistsTimings.includes(this.videoTime)){
    this.newNote=false;
    this.addNotes=true;
    var video = document.getElementById('video') as HTMLVideoElement;
    video.pause();
  }
}

goBackNotes(){
  this.newNote=true;
  this.addNotes=false;
  var video = document.getElementById('video') as HTMLVideoElement;
  video.play();
}

setNotesInfo(){
  this.instructorService.setNotesInfo(sessionStorage.authToken,this.currentLecture,this.notesForm.value,this.videoTime)
  .subscribe(res=>{
    if(res['status'] == 'Success'){
      this.toastrService.success("Updated Successfully!!");
      this.newNote=true;
      this.addNotes=false;
      this.getNotesList();
    }
  })
}

getNotesList(){
  this.instructorService.getNotesList(sessionStorage.authToken,this.currentLecture,this.notesForm.value)
  .subscribe(res=>{
    console.log("res==notes--list===",res);
    this.notesList=res;
    for(let i=0;i<this.notesList.length;i++){
      this.notesList[i].existsNotes=true;
      this.notesList[i].newNotes=false; 
      this.notesExistsTimings.push(this.notesList[i].time);
    }
  })
}

showEditNotes(notedt){
  this.notesEditForm.patchValue({
    notesEdit:''
  })
  notedt.existsNotes=false;
  notedt.newNotes=true;
}

updateNotesInfo(notedt){  
    this.instructorService.updateNotesInfo(notedt,this.notesEditForm.value)
    .subscribe(res=>{
      if(res['status'] == 'Success'){
        this.toastrService.success("Updated Successfully!!");
        this.getNotesList();
      }
    })
} 

showListNotes(notedt){
  notedt.existsNotes=true;
  notedt.newNotes=false;
}

showDeleteNotes(notedt){
  this.deleteNote=notedt;
}

deleteNotesInfo(){
  this.instructorService.deleteNotesInfo(this.deleteNote)
  .subscribe(res=>{
    if(res['status'] == 'Success'){
      this.toastrService.success("Updated Successfully!!");
      this.getNotesList();
    }
  })
}

getResourcesListofLecture(child){
    console.log("getResourcesList====",child);
    this.instructorService.getResourcesListofLecture(child.userid,child.course_id,child.section_id,child.id)
    .subscribe(res=>{
      console.log("rssooooo===",res['data']);
      this.resourceList=res['data'];
    })
} 

setCheckedValue(qid,option){
  for(let i=0;i<this.videoQueriesList.length;i++){
    if(this.videoQueriesList[i].id === qid){
      this.videoQueriesList[i].selected=option;
      this.count++;
    }
  }
  if(this.count == this.videoQueriesList.length){
    this.disableBtn=false;
  }
}

checkAnswer(){
  console.log("this.videoQueriesList=====",this.videoQueriesList);
  this.anscount=0;
  for(let i=0;i<this.videoQueriesList.length;i++){
    if(this.videoQueriesList[i].selected == this.videoQueriesList[i].answer){
      this.videoQueriesList[i].valCheck='alert alert-success'; 
      this.videoQueriesList[i].valIcon='fa fa-check'; 
      this.anscount++;
    }else{
      this.videoQueriesList[i].valCheck='alert alert-warning';
      this.videoQueriesList[i].valIcon='fa fa-close'; 
    }
  }
  // console.log("this.videoQueriesList===rrrrrrrrrrrrrrrrrr=====",this.videoQueriesList);

  if(this.anscount == this.videoQueriesList.length){
    this.toastrService.success("Well done! You successfully completed.");
    this.instructorService.setAssessmentResult(this.videoQueriesList,this.anscount,sessionStorage?.authToken)
    .subscribe((res)=>{
      setTimeout(() => {
        this.showAssessment=false;
        this.showVideo=true;  
      }, 1000);
    })
  }else{
    this.toastrService.error("Failure")
    this.instructorService.setAssessmentResult(this.videoQueriesList,this.anscount,sessionStorage?.authToken)
    .subscribe((res)=>{
      setTimeout(() => {
        this.showAssessment=true;
        this.showVideo=false;
      }, 1000);
    })
  }
}

backToPlayer(){
  this.showAssessment=false;
  this.showVideo=true;
}

showText(){
  this.showComInfo=true;
}

hideText(){
  this.showComInfo=false;
}

setCommentInfo(announceDt){
  console.log("announceDt====",announceDt);
  if(this.announcementCommentForm.valid){
    this.instructorService.setCommentInfo(this.userInitial,announceDt,this.announcementCommentForm.value.comment,sessionStorage.authToken)
    .subscribe(res=>{
      this.showComInfo=false;
      this.announcementCommentForm.patchValue({'comment':''})
      this.toastrService.success("Posted Successfully!!")
      this.getAnnouncementListWithComment(this.instructorInfo?.authToken);
    })
  }
}

showDeleteComment(commt){
  this.currentCommentToDel=commt;
}

deleteComment(){
  this.instructorService.deleteComment(this.currentCommentToDel)
  .subscribe(res=>{
    this.toastrService.success("Deleted Successfully!!")
    this.getAnnouncementListWithComment(this.instructorInfo?.authToken);
  })
}

showEditComment(commt,commentInfo){
  console.log("commt===",commt,commentInfo);
  this.announcementCommentEditForm.patchValue({'comment':commt.comment})
  for(let i=0;i<=commentInfo.length;i++){
    if(commentInfo[i].id == commt.id){
      commt.showEdit=true;
    }
  }
 
}

showTextEdit(commt,commentInfo){
  for(let j=0;j<=commentInfo.length;j++){
    if(commentInfo[j].id == commt.id){
      commt.showComInfo=true;
    }
  }
}

hideTextEdit(commt,commentInfo){
  for(let k=0;k<=commentInfo.length;k++){
    if(commentInfo[k].id == commt.id){
      commt.showComInfo=false;
      commt.showEdit=false;
    }
  }
   
}


updateCommentInfo(commt){
    this.instructorService.updateCommentInfo(commt,this.announcementCommentEditForm.value.comment)
    .subscribe(res=>{
      this.announcementCommentEditForm.patchValue({'comment':''})
      this.toastrService.success("Updated Successfully!!")
      this.getAnnouncementListWithComment(this.instructorInfo?.authToken);
    })
}

showAllComments(){
  this.showAll=!this.showAll;
}

}

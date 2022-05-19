import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { InstructorService } from 'src/services/instructor.service';
import Hls from 'hls.js';
import { NgForm, FormGroup, FormControl, Validators,FormArray, FormBuilder,AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../../../../services/auth.service'; 


@Component({
  selector: 'app-instructor-communication',
  templateUrl: './instructor-communication.component.html',
  styleUrls: ['./instructor-communication.component.scss']
})
export class InstructorCommunicationComponent implements OnInit {

  questionDetails;
  showQuesList: boolean;
  showAnswer: boolean;
  answerForm:FormGroup;
  currentques;
  answerlist;
  activeElemQA='blue';
  activeElemMsg='black';
  activeElemAnn='black';


  messageForm: FormGroup;
  announcementForm:FormGroup;
  announcementEditForm:FormGroup;
  instructorList$;
  search$: Subject<string> = new Subject<string>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  keyword = 'user_name';
  selectedId: any;
  bindchatdata: any[];
  chaterlist;
  userid: any;
  showNewMsg: boolean=false;
  showSelected: boolean=false;
  chat: any[];
  chatone: any[];
  frompfor: any;
  toprof: any;
  conversationWith: any;
  currentChatInfo;
  messageCount: any;

  showAnnouncementList:boolean=true;
  createAnnouncement:boolean=false;
  updateAnnouncement:boolean=false;
  announcementList: any;

  constructor( private authService:AuthService,private cdref:ChangeDetectorRef,private formBuilder:FormBuilder,private route: ActivatedRoute,private toastrService:ToastrService,private instructorService:InstructorService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getQuesList();
    this.getAnnouncementList();
    this.answerForm = this.formBuilder.group({
      answer:['',Validators.required]
    })
    this.authService.isStateChanged.next(5);
    this.getMessageCount();

    this.getLoggedInUser();
    this.getchaterlist();
    this.messageForm= this.formBuilder.group({
      instructor_id: ['', Validators.required],
      instructor: ['', Validators.required],
      message: ['', Validators.required],
    })

    this.announcementForm= this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.announcementEditForm= this.formBuilder.group({
      id:[''],
      title: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.instructorService.getUserListForMsg(sessionStorage.authToken)
    .subscribe(res=>{
      console.log("res-====",res);
        this.instructorList$=res.pipe(takeUntil(this.destroy$));
    })

    this.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => console.log(value));
  }

  getQuesList(){
    this.showQuesList=true;
    this.showAnswer=false;
      this.instructorService.getQuestionareDetailsPerInstructor(sessionStorage.authToken)
      .subscribe(res=>{
          this.questionDetails=res;
      })
  }

  showReply(ques){
    this.showQuesList=false;
    this.showAnswer=true;
    console.log("ques===",ques);
    this.currentques=ques;
    this.answerForm.patchValue({
      answer:''
    })
    this.instructorService.showExistingReply(ques)
    .subscribe(res=>{
      console.log("answer===res===",res);
        this.answerlist=res;
    })
  }

  setAnswerInfo(){
    this.instructorService.setAnswerInfo(sessionStorage.authToken,this.currentques,this.answerForm.value)
    .subscribe(res=>{
        if(res['status'] == 'Success'){
          this.toastrService.success("Updated Successfully!!");
          this.getQuesList();
        }
    })
  }

  showQADetails(){
    this.activeElemQA='blue';
    this.activeElemMsg='black';
    this.activeElemAnn='black';
  }
  showMsgDetails(){
    this.activeElemQA='black';
    this.activeElemMsg='blue';
    this.activeElemAnn='black';
  }

  showAnnDetails(){
    this.activeElemQA='black';
    this.activeElemMsg='black';
    this.activeElemAnn='blue';

    this.showAnnouncementList=true;
    this.createAnnouncement=false;
  }

  // ----------------------------Messsage==============================================
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  composeNewOne(){
    this.showNewMsg=true;
    this.showSelected=false;
  }


  selectEvent(item) {
    console.log("item==========",item);
    this.selectedId=item.id;
    this.messageForm.patchValue({
      'instructor_id':item.id,
      'instructor':item.user_name
    })
    // do something with selected item
  }

  setMessageInfo(){
    this.instructorService.setMessageInfo(this.messageForm.value,sessionStorage.authToken)
    .subscribe(res=>{
        this.toastrService.success("Sent Successfully!!");
        this.messageForm.patchValue({
          'instructor_id':'',
          'instructor':'',
          'message':''
        })
        this.getchaterlist();
        this.showNewMsg=false;
        this.showSelected=false;
    })
  }

  setConversationInfo(){
    console.log("this.currentChatInfo===",this.currentChatInfo);
    this.instructorService.setConversationInfo(this.messageForm.value.message,this.currentChatInfo)
    .subscribe(res=>{
        this.toastrService.success("Sent Successfully!!");
        this.messageForm.patchValue({
          'message':''
        })
        this.instructorService.getMessageList(this.currentChatInfo)
        .subscribe(res=>{
            console.log("message----list---",res);
            this.chat=[];
            this.chatone=[];
            console.log("resresresres===load==",res);
            this.chatone=res['chatdatas'];
            this.frompfor=res['frompprofile'][0];
            this.toprof=res['topprofile'][0];
            for(let i=0;i<this.chatone.length;i++){
              if(this.chatone[i].sender_id == this.userid){
                this.chat.push({"from_chat":(this.chatone[i].message == "null" ? '': this.chatone[i].message),"to_chat":null,"fromprofile":this.frompfor.fromprofile,"toprofile":this.toprof.toprofile}) 
              }else{
                this.chat.push({"from_chat":null,"to_chat":(this.chatone[i].message == "null" ? '': this.chatone[i].message),"fromprofile":this.frompfor.fromprofile,"toprofile":this.toprof.toprofile}) 
              }
            }
            console.log("this.chat====",this.chat);
        })
        
    })
  }

  getLoggedInUser(){
    this.instructorService.getLoggedInUser(sessionStorage.authToken)
    .subscribe(res=>{
      console.log("iiiiiii-----",res)
        this.userid=res['data'][0].id;
    })
  }
  

  getchaterlist(){
    this.instructorService.getchaterlist(sessionStorage.authToken)
      .subscribe(res=>{
        this.bindchatdata=[];
        this.chaterlist=res; 
        console.log("this.chaterlist---------",this.chaterlist,this.userid);
        for(let i=0;i<this.chaterlist.length;i++){
          if(this.userid == this.chaterlist[i].senderid){
            this.bindchatdata.push({"senderid":this.chaterlist[i].senderid,"receiverid":this.chaterlist[i].receiverid,"receiverprofile":this.chaterlist[i].receiverprofile,"receivername":this.chaterlist[i].receivername,"chatmsg":this.chaterlist[i].chatmsg,"newmsg":this.chaterlist[i].newmsg})
          }else if(this.userid == this.chaterlist[i].receiverid){
            this.bindchatdata.push({"senderid":this.chaterlist[i].receiverid,"receiverid":this.chaterlist[i].senderid,"receiverprofile":this.chaterlist[i].senderprofile,"receivername":this.chaterlist[i].sendername,"chatmsg":this.chaterlist[i].chatmsg,"newmsg":this.chaterlist[i].newmsg})
          }
        } 
        console.log("this.bindchatdata",this.bindchatdata);
      })
  }

  getchatmssg(chater){
    console.log("chater====",chater);
    this.currentChatInfo=chater;
    this.showNewMsg=false;
    this.showSelected=true;
    this.conversationWith=chater.receivername;
    this.instructorService.updateMessageNotification(chater.senderid,chater.receiverid)
    .subscribe(resdt=>{
      this.getchaterlist();
      this.getMessageCount();
      this.instructorService.getMessageList(chater)
      .subscribe(res=>{
          console.log("message----list---",res);
          this.chat=[];
          this.chatone=[];
          console.log("resresresres===load==",res);
          this.chatone=res['chatdatas'];
          this.frompfor=res['frompprofile'][0];
          this.toprof=res['topprofile'][0];
          for(let i=0;i<this.chatone.length;i++){
            if(this.chatone[i].sender_id == this.userid){
              this.chat.push({"from_chat":(this.chatone[i].message == "null" ? '': this.chatone[i].message),"to_chat":null,"fromprofile":this.frompfor.fromprofile,"toprofile":this.toprof.toprofile}) 
            }else{
              this.chat.push({"from_chat":null,"to_chat":(this.chatone[i].message == "null" ? '': this.chatone[i].message),"fromprofile":this.frompfor.fromprofile,"toprofile":this.toprof.toprofile}) 
            }
          }
          console.log("this.chat====",this.chat);
      })
    })
  
  
  }


  backToChat(){
    this.showNewMsg=false;
    this.showSelected=true;
  }

  
  getMessageCount(){
    this.instructorService.getMessageCount(sessionStorage.authToken)
    .subscribe(res=>{
      this.messageCount=res['data']
    })
  }

  createNewAnnouncement(){
    this.showAnnouncementList=false;
    this.createAnnouncement=true;
    this.updateAnnouncement=false;
  }

  setAnnouncementInfo(){
    this.instructorService.setAnnouncementInfo(sessionStorage.authToken,this.announcementForm.value)
    .subscribe(res=>{
      this.toastrService.success("Published Successfully!!");
      this.announcementForm.patchValue({
        'title':'',
        'description':''
      })
      this.showAnnouncementList=true;
      this.createAnnouncement=false;
      this.updateAnnouncement=false;
      this.getAnnouncementList();
    })
  }

  
  updateAnnouncementInfo(){
    this.instructorService.updateAnnouncementInfo(sessionStorage.authToken,this.announcementEditForm.value)
    .subscribe(res=>{
      this.toastrService.success("Updated Successfully!!");
      this.showAnnouncementList=true;
      this.createAnnouncement=false;
      this.updateAnnouncement=false;
      this.getAnnouncementList();
    })
  }

  getAnnouncementList(){
    this.instructorService.getAnnouncementList(sessionStorage.authToken)
    .subscribe(res=>{
        this.announcementList=res['data']
    })
  }

  backToList(){
    this.showAnnouncementList=true;
    this.createAnnouncement=false;
    this.updateAnnouncement=false;
  }
  
  deleteAnnouncement(annDt){
      this.instructorService.deleteAnnouncement(annDt)
      .subscribe(Res=>{
        this.toastrService.success("Deleted Successfully!!");
        this.getAnnouncementList();
      })
  }

  editAnnouncement(annDt){
    this.announcementEditForm.patchValue({
      'id':annDt.id,
      'title':annDt.title,
      'description':annDt.description
    })
    this.updateAnnouncement=true;
    this.showAnnouncementList=false;
    this.createAnnouncement=false;
  }

}

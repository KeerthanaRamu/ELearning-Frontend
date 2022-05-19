import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/services/instructor.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup,  Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {


  messageForm: FormGroup;
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

  constructor(private toastrService: ToastrService,private formBuilder: FormBuilder, private instructorService: InstructorService, private router: Router) { }

  ngOnInit(): void {

    this.getLoggedInUser();
    this.getchaterlist();
    this.messageForm= this.formBuilder.group({
      instructor_id: ['', Validators.required],
      instructor: ['', Validators.required],
      message: ['', Validators.required],
    })

    this.getMessageCount();

    this.instructorService.getInstructorListForMsg(sessionStorage.authToken)
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

}

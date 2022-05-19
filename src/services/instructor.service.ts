import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InstructorService {
  public categoryData;
  public urlBase = 'http://localhost:4000/';
  //  public urlBase='https://jpj-dev.i2utors.com:4000/';
  sharedData;
  constructor(private http: HttpClient) { }

  private CartDetails = new BehaviorSubject<any>({});

  setCategory(cat) {
    console.log(" ;;from service :: ", cat);
    this.categoryData = cat;
  }
  getCategory() {
    console.log(" ;;from gettoken :: ", this.categoryData);
    return this.categoryData;
  }

  getCategoryList() {
    const uri = this.urlBase + 'instructor/getCategoryList';
    return this
      .http
      .get(uri)
      .pipe(map(res => {
        return res;
      }));
  }

  getCategoryListMaster() {
    const uri = this.urlBase + 'instructor/getCategoryListMaster';
    return this
      .http
      .get(uri)
      .pipe(map(res => {
        return res;
      }));
  }

  getCoursesPerCategory(categoryInfo,authToken) {
    const uri = this.urlBase + 'instructor/getCoursesPerCategory';
    const obj = { categoryInfo: categoryInfo,authToken:authToken };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getCoursesListForCarousel(categoryInfo,authToken){
    const uri = this.urlBase + 'instructor/getCoursesListForCarousel';
    const obj = { categoryInfo: categoryInfo,authToken:authToken };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getCoursesPerSubCategory(categoryInfo,authToken) {
    const uri = this.urlBase + 'instructor/getCoursesPerSubCategory';
    const obj = { categoryInfo: categoryInfo, authToken:authToken };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  setCartInfo(user) {
    this.CartDetails.next(user);
  }

  getCartInfo() {
    return this.CartDetails.asObservable();
  }

  setCourseDetails(authToken, courseInfo) {
    const uri = this.urlBase + 'instructor/setCourseDetails';
    const obj = { authToken: authToken, courseInfo: courseInfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  setCourseIntendorInfo(authToken, courseId, courseInfo) {
    const uri = this.urlBase + 'instructor/setCourseIntendorInfo';
    const obj = { authToken: authToken, courseId: courseId, courseInfo: courseInfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getCourseInfo(courseId) {
    const uri = this.urlBase + 'instructor/getCourseInfo';
    const obj = { courseId: courseId };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getCourseDetailedView(courseId) {
    const uri = this.urlBase + 'instructor/getCourseDetailedView';
    const obj = { courseId: courseId };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getCoursesListPerUser(authToken,pageInfo) {
    const uri = this.urlBase + 'instructor/getCoursesListPerUser';
    const obj = { authToken: authToken,pageInfo:pageInfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getCoursesList(authToken) {
    const uri = this.urlBase + 'instructor/getCoursesList';
    const obj = { authToken: authToken };
    return this
      .http
      .post(uri,obj)
      .pipe(map(res => {
        return res;
      }));
  }

  editCourseInfo(courseDt) {
    const uri = this.urlBase + 'instructor/editCourseInfo';
    const obj = { courseDt: courseDt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  setSectionDetails(authToken, courseid, sections) {
    const uri = this.urlBase + 'instructor/setSectionDetails';
    const obj = { authToken: authToken, courseid: courseid, sections: sections };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  updateSectionDetails(authToken, courseid, sections) {
    const uri = this.urlBase + 'instructor/updateSectionDetails';
    const obj = { authToken: authToken, courseid: courseid, sections: sections };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  deleteSectionInfo(sec){
    const uri = this.urlBase + 'instructor/deleteSectionInfo';
    const obj = { sec: sec};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  deleteLectureInfo(lect){
    const uri = this.urlBase + 'instructor/deleteLectureInfo';
    const obj = { lect: lect};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getSectionByCourse(courseid) {
    const uri = this.urlBase + 'instructor/getSectionByCourse';
    const obj = { courseid: courseid };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  setLectureDetails(authToken, courseid, sectionDt) {
    const uri = this.urlBase + 'instructor/setLectureDetails';
    const obj = { authToken: authToken, courseid: courseid, sectionDt: sectionDt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  updateLectureDetails(authToken, courseid, sectionDt, lectureDt) {
    const uri = this.urlBase + 'instructor/updateLectureDetails';
    const obj = { authToken: authToken, courseid: courseid, sectionDt: sectionDt, lectureDt: lectureDt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getResourcesListofLecture(userid,courseid,sectionId,lectureId){
    const uri = this.urlBase + 'instructor/getResourcesListofLecture';
    const obj = { userid: userid, courseid: courseid, sectionId: sectionId, lectureId: lectureId };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  deleteResourceInfo(resoucedt){
    const uri = this.urlBase + 'instructor/deleteResourceInfo';
    const obj = { resoucedt: resoucedt};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }


  // getExistingResources(authToken, courseid, sectionDt, lectureDt) {
  //   const uri = this.urlBase + 'instructor/getExistingResources';
  //   const obj = { authToken: authToken, courseid: courseid, sectionDt: sectionDt, lectureDt: lectureDt };
  //   return this
  //     .http
  //     .post(uri, obj)
  //     .pipe(map(res => {
  //       return res;
  //     }));
  // }


  updateLectureResource(formData) {
    const uri = this.urlBase + 'instructor/updateLectureResource';
    return this
      .http
      .post(uri, formData)
      .pipe(map(res => {
        return res;
      }));
  }

  updateLectureVideo(formData) {
    const uri = this.urlBase + 'instructor/updateLectureVideo';
    return this
      .http
      .post(uri, formData)
      .pipe(map(res => {
        return res;
      }));
  }

  updateLectureURL(authToken, courseid, sectionDt, lectureDt) {
    const uri = this.urlBase + 'instructor/updateLectureURL';
    const obj = { authToken: authToken, courseid: courseid, sectionDt: sectionDt, lectureDt: lectureDt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }


  setCourseLandingInfo(authToken, courseid, landingInfo) {
    const uri = this.urlBase + 'instructor/setCourseLandingInfo';
    const obj = { authToken: authToken, courseid: courseid, landingInfo: landingInfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  setCoursePriceInfo(authToken, courseid, priceinfo) {
    const uri = this.urlBase + 'instructor/setCoursePriceInfo';
    const obj = { authToken: authToken, courseid: courseid, priceinfo: priceinfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  
  getAssessmentList(authToken, courseid, sectionid, lectureid) {
    const uri = this.urlBase + 'instructor/getAssessmentList';
    const obj = { authToken: authToken, courseid: courseid, sectionid: sectionid, lectureid:lectureid };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }
  
  setAssessmentInfo(authToken, courseid, sectionid, lectureid, assessmentDt) {
    const uri = this.urlBase + 'instructor/setAssessmentInfo';
    const obj = { authToken: authToken, courseid: courseid, sectionid: sectionid, lectureid:lectureid, assessmentDt:assessmentDt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  updateAssessmentInfo(assessmentUpdateDt){
    const uri = this.urlBase + 'instructor/updateAssessmentInfo';
    const obj = { assessmentUpdateDt: assessmentUpdateDt};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  deleteAssessmentInfo(assessdt){
    const uri = this.urlBase + 'instructor/deleteAssessmentInfo';
    const obj = { assessdt: assessdt};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  setAssessmentResult(videoQueriesList,ansCount,authToken){
    const uri = this.urlBase + 'instructor/setAssessmentResult';
    const obj = { videoQueriesList: videoQueriesList, ansCount:ansCount, authToken:authToken};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getUserCartInfo(authToken) {
    const uri = this.urlBase + 'instructor/getUserCartInfo';
    const obj = { authToken: authToken };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }



  setAddToCartDetails(authToken, coursedt) {
    const uri = this.urlBase + 'instructor/setAddToCartDetails';
    const obj = { authToken: authToken, coursedt: coursedt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getAddToCartDetails(authToken) {
    const uri = this.urlBase + 'instructor/getAddToCartDetails';
    const obj = { authToken: authToken };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  removeFromCartDetails(authToken, cartDt) {
    const uri = this.urlBase + 'instructor/removeFromCartDetails';
    const obj = { authToken: authToken, cartDt: cartDt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  setCheckOutDetails(authToken, checkOutDt) {
    const uri = this.urlBase + 'instructor/setCheckOutDetails';
    const obj = { authToken: authToken, checkOutDt: checkOutDt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getMyLearningsList(authToken) {
    const uri = this.urlBase + 'instructor/getMyLearningsList';
    const obj = { authToken: authToken };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getLearningVideoToPlay(authToken, learndt) {
    const uri = this.urlBase + 'instructor/getLearningVideoToPlay';
    const obj = { authToken: authToken, learndt: learndt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));

  }

  goToCourseInfo(catinfo) {
    const uri = this.urlBase + 'instructor/goToCourseInfo';
    const obj = { catinfo: catinfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getInstructorListPerCategory(catinfo) {
    const uri = this.urlBase + 'instructor/getInstructorListPerCategory';
    const obj = { catinfo: catinfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getInstructorListPerSubCategory(catinfo) {
    const uri = this.urlBase + 'instructor/getInstructorListPerSubCategory';
    const obj = { catinfo: catinfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getSubCategoryList(cat) {
    const uri = this.urlBase + 'instructor/getSubCategoryList';
    const obj = { cat: cat };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getSubCategoryListCount(cat){
    const uri = this.urlBase + 'instructor/getSubCategoryListCount';
    const obj = { cat: cat  };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getSubCategoryListMaster(){
    const uri = this.urlBase + 'instructor/getSubCategoryListMaster';
    return this
      .http
      .get(uri)
      .pipe(map(res => {
        return res;
      }));
  }

  getLevelListCount(cat){
    const uri = this.urlBase + 'instructor/getLevelListCount';
    const obj = { cat: cat  };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getLevelListCountForSubCat(cat){
    const uri = this.urlBase + 'instructor/getLevelListCountForSubCat';
    const obj = { cat: cat  };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  setLectureViewInfo(authToken, cat) {
    const uri = this.urlBase + 'instructor/setLectureViewInfo';
    const obj = { authToken: authToken, cat: cat };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  updateRatingInfo(authToken, ratingdt) {
    const uri = this.urlBase + 'instructor/updateRatingInfo';
    const obj = { authToken: authToken, ratingdt: ratingdt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  setWishlist(authToken, coursedt) {
    const uri = this.urlBase + 'instructor/setWishlist';
    const obj = { authToken: authToken, coursedt: coursedt };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getWishList(authToken) {
    const uri = this.urlBase + 'instructor/getWishList';
    const obj = { authToken: authToken };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getRatingReviewPerCourse(courseId) {
    const uri = this.urlBase + 'instructor/getRatingReviewPerCourse';
    const obj = { courseId: courseId };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  checkCartInfo(authToken, courseId) {
    const uri = this.urlBase + 'instructor/checkCartInfo';
    const obj = { authToken: authToken, courseId: courseId };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getTutorDetails(tutorId) {
    const uri = this.urlBase + 'instructor/getTutorDetails';
    const obj = { tutorId: tutorId };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getRatingReviewPerInstructor(authToken,pageInfo){
    const uri = this.urlBase + 'instructor/getRatingReviewPerInstructor';
    const obj = { authToken: authToken,pageInfo:pageInfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getStudentListPerInstructor(authToken,pageInfo){
    const uri = this.urlBase + 'instructor/getStudentListPerInstructor';
    const obj = { authToken: authToken,pageInfo:pageInfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  publishCourse(authToken, courseid, priceinfo) {
    const uri = this.urlBase + 'instructor/publishCourse';
    const obj = { authToken: authToken, courseid: courseid, priceinfo: priceinfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }));
  }

  getQuestionareDetails(courseInfo){
    const uri = this.urlBase + 'instructor/getQuestionareDetails';
    const obj = { courseInfo: courseInfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  setQuestionInfo(authToken,currentLecture,questionInfo){
    const uri = this.urlBase + 'instructor/setQuestionInfo';
    const obj = { authToken: authToken,currentLecture:currentLecture,questionInfo:questionInfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getQuestionareDetailsPerInstructor(authToken){
    const uri = this.urlBase + 'instructor/getQuestionareDetailsPerInstructor';
    const obj = { authToken: authToken };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  showExistingReply(ques){
    const uri = this.urlBase + 'instructor/showExistingReply';
    const obj = { ques: ques };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  setAnswerInfo(authToken,currentques,ansinfo){
    const uri = this.urlBase + 'instructor/setAnswerInfo';
    const obj = { authToken:authToken,currentques:currentques,ansinfo:ansinfo };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getNotesList(authToken,currentLecture,notesData){
    const uri = this.urlBase + 'instructor/getNotesList';
    const obj = { authToken:authToken,currentLecture:currentLecture,notesData:notesData };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }


  setNotesInfo(authToken,currentLecture,notesData,videoTime){
    const uri = this.urlBase + 'instructor/setNotesInfo';
    const obj = { authToken:authToken,currentLecture:currentLecture,notesData:notesData,videoTime:videoTime };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  updateNotesInfo(notesData,editVal){
    const uri = this.urlBase + 'instructor/updateNotesInfo';
    const obj = {notesData:notesData,editVal:editVal };
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  deleteNotesInfo(notesData){
    const uri = this.urlBase + 'instructor/deleteNotesInfo';
    const obj = {notesData:notesData};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getInstructorListForMsg(authToken){
    const uri = this.urlBase + 'instructor/getInstructorListForMsg';
    var obj={authToken:authToken}
    return this
      .http
      .post(uri,obj)
      .pipe(map(res => {
        return  of(res)
        .pipe(delay(200));  
      }))
  }

  getUserListForMsg(authToken){
    const uri = this.urlBase + 'instructor/getUserListForMsg';
    var obj={authToken:authToken}
    return this
      .http
      .post(uri,obj)
      .pipe(map(res => {
        return  of(res)
        .pipe(delay(200));  
      }))
  }

  setMessageInfo(messageData,authToken){
    const uri = this.urlBase + 'instructor/setMessageInfo';
    const obj = {messageData:messageData,authToken:authToken};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  setConversationInfo(message,currentChat){
    const uri = this.urlBase + 'instructor/setConversationInfo';
    const obj = {message:message,currentChat:currentChat};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getMessageList(chater){
    const uri = this.urlBase + 'instructor/getMessageList';
    const obj = {chater:chater};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getchaterlist(authToken){
    const uri = this.urlBase + 'instructor/getchaterlist';
    const obj = {authToken:authToken};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getLoggedInUser(authToken){
    const uri = this.urlBase + 'instructor/getLoggedInUser';
    const obj = {authToken:authToken};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  updateMessageNotification(senderid,receiverid){
    const uri = this.urlBase + 'instructor/updateMessageNotification';
    const obj = {senderid:senderid,receiverid:receiverid};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getMessageCount(authToken){
    const uri = this.urlBase + 'instructor/getMessageCount';
    const obj = {authToken:authToken};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  setAnnouncementInfo(authToken,announcementDt){
    const uri = this.urlBase + 'instructor/setAnnouncementInfo';
    const obj = {authToken:authToken,announcementDt:announcementDt};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  updateAnnouncementInfo(authToken,announcementDt){
    const uri = this.urlBase + 'instructor/updateAnnouncementInfo';
    const obj = {authToken:authToken,announcementDt:announcementDt};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getAnnouncementList(authToken){
    const uri = this.urlBase + 'instructor/getAnnouncementList';
    const obj = {authToken:authToken};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  deleteAnnouncement(delData){
    const uri = this.urlBase + 'instructor/deleteAnnouncement';
    const obj = {delData:delData};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getAnnouncementListWithComment(authToken){
    const uri = this.urlBase + 'instructor/getAnnouncementListWithComment';
    const obj = {authToken:authToken};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  setCommentInfo(userInitial,announceDt,comment,authToken){
    const uri = this.urlBase + 'instructor/setCommentInfo';
    const obj = {userInitial:userInitial,announceDt:announceDt,comment:comment,authToken:authToken};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  deleteComment(delData){
    const uri = this.urlBase + 'instructor/deleteComment';
    const obj = {delData:delData};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  updateCommentInfo(commtDt,comment){
    const uri = this.urlBase + 'instructor/updateCommentInfo';
    const obj = {commtDt:commtDt,comment:comment};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getFilteredCourseDetails(filterObj,authToken){
    const uri = this.urlBase + 'instructor/getFilteredCourseDetails';
    const obj = {filterObj:filterObj,authToken:authToken};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getFilteredSubCatCourseDetails(filterObj,authToken){
    const uri = this.urlBase + 'instructor/getFilteredSubCatCourseDetails';
    const obj = {filterObj:filterObj,authToken:authToken};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getCourseLevelList(){
    const uri = this.urlBase + 'instructor/getCourseLevelList';
    return this
      .http
      .get(uri)
      .pipe(map(res => {
        return res;
      }))
  }

  setCategoryInfo(categoryDt){
    const uri = this.urlBase + 'instructor/setCategoryInfo';
    const obj = {categoryDt:categoryDt};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  updateCategoryInfo(categoryDt){
    const uri = this.urlBase + 'instructor/updateCategoryInfo';
    const obj = {categoryDt:categoryDt};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  setSubCategoryInfo(subcategoryDt){
    const uri = this.urlBase + 'instructor/setSubCategoryInfo';
    const obj = {subcategoryDt:subcategoryDt};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  updateSubCategoryInfo(subcategoryDt){
    const uri = this.urlBase + 'instructor/updateSubCategoryInfo';
    const obj = {subcategoryDt:subcategoryDt};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getUserDashboardCount(authToken,dateObj){
    const uri = this.urlBase + 'instructor/getUserDashboardCount';
    const obj = {authToken:authToken,dateObj:dateObj};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getUserRevenueDetails(authToken,pageInfo){
    const uri = this.urlBase + 'instructor/getUserRevenueDetails';
    const obj = {authToken:authToken,pageInfo:pageInfo};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getStudentsViewForRevenue(revenuedt,pageInfo){
    const uri = this.urlBase + 'instructor/getStudentsViewForRevenue';
    const obj = {revenuedt:revenuedt,pageInfo:pageInfo};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getInstructorViewForAdmin(coursedt){
    const uri = this.urlBase + 'instructor/getInstructorViewForAdmin';
    const obj = {coursedt:coursedt};
     return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getUserEnrollmentDetails(authToken,pageInfo){
    const uri = this.urlBase + 'instructor/getUserEnrollmentDetails';
    const obj = {authToken:authToken,pageInfo:pageInfo};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getCoursesViewForEnroll(enrolldt,pageInfo){
    const uri = this.urlBase + 'instructor/getCoursesViewForEnroll';
    const obj = {enrolldt:enrolldt,pageInfo:pageInfo};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getUserRatingDetails(authToken,pageInfo){
    const uri = this.urlBase + 'instructor/getUserRatingDetails';
    const obj = {authToken:authToken,pageInfo:pageInfo};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getCoursesViewForRating(ratdt,pageInfo){
    const uri = this.urlBase + 'instructor/getCoursesViewForRating';
    const obj = {ratdt:ratdt,pageInfo:pageInfo};
    return this
      .http
      .post(uri, obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getAdminDashboardCount(){
    const uri = this.urlBase + 'instructor/getAdminDashboardCount';
    return this
      .http
      .get(uri)
      .pipe(map(res => {
        return res;
      }))
  }
  
  getCousesDetails(pageInfo){
    const uri = this.urlBase + 'instructor/getCousesDetails';
    const obj = {pageInfo:pageInfo};
    return this
      .http
      .post(uri,obj)
      .pipe(map(res => {
        return res;
      }))
  }

  getOverallInstructorList(pageInfo){
    const uri = this.urlBase + 'instructor/getOverallInstructorList';
    const obj = {pageInfo:pageInfo};
    return this
      .http
      .post(uri,obj)
      .pipe(map(res => {
        return res;
      }))
  }
  
  getOverallStudentList(pageInfo){
    const uri = this.urlBase + 'instructor/getOverallStudentList';
    const obj = {pageInfo:pageInfo};
    return this
      .http
      .post(uri,obj)
      .pipe(map(res => {
        return res;
      }))
  }
  

}

//end 0f instructor service

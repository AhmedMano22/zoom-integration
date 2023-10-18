

import { Component, Inject, OnInit } from '@angular/core';
import { CallService } from '../call.service';
import { HttpClient } from '@angular/common/http';
import { CreateMeetingDto } from '../models/createMeetingData';
 import { ZoomMtg } from '@zoomus/websdk';
 import { DOCUMENT } from '@angular/common';
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.16.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');
@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.component.html',
  styleUrls: ['./voice-call.component.css'],
})
export class VoiceCallComponent implements OnInit {
  sdkKey = 'xRgxdaNXTZeWxVWwSi_x8w';
  sdkSecret= 'Md0oKwAmc2IodKJ348au3nArgcci7wc9';
  meetingNumber :any;
  passWord = 'SWXTv1';
  signature = '';
  role = '0';
  userName = 'Amr Matar';
  userEmail = '';
  registrantToken = '';
  zakToken = '';
  leaveUrl = 'http://localhost:4200';
  show = false;
  active = 1;
  meetingData: any;
  meetingURL:any;
  urlValue: string = '';
  requestBody: CreateMeetingDto = {
    startDate: "2023-09-23T15:31:02Z",
    userName: "mahmoud",
    userEmail: "mahmoud@algorithms.sa",
    consultantEmail: "mahmoudsayed1006@gmail.com",
    consultantName: "mahmoud sayed",
};

  constructor(private voiceCallService: CallService ,private http: HttpClient,@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {

    this.getAccessToken();
    this.voiceCallService.getSignature().subscribe((res:any)=>{
      this.signature = res.signature
    })
    const element = document.getElementById('zmmtg-root');
    if (element) {
      element.style.zIndex = (-2).toString();
      element.style.background = 'none'
    }
  }

  getAccessToken() {
    this.voiceCallService.getToken();
  }

  initializeCall() {
    this.voiceCallService.createMeeting(this.requestBody).subscribe((data:any)=> {
      this.meetingData = data.data;
      console.log(this.meetingData);
      if (!this.meetingData) {
        // Handle the case where meeting data is not available
        console.error('Meeting data is not available.');
        return;
      }
      this.meetingURL = this.meetingData.start_url;
      this.urlValue = this.meetingData.join_url;
      this.meetingNumber = this.meetingData.id
      const meetlink = document.getElementById("meetlink");
      const zoomMeetingFrame = document.getElementById("zoomMeetingFrame");
      console.log( this.urlValue);

      })
      const meetConfig = {
        apiKey:'xRgxdaNXTZeWxVWwSi_x8w',  // Use api key above mentioned.
        apiSecret: 'Md0oKwAmc2IodKJ348au3nArgcci7wc9', // Use secret key above mentioned.
        meetingNumber: this.meetingNumber,
        userName : 'Amr Matar',
        userEmail:'amrweb@gmail.com',
        passWord: '123',
        leaveUrl: this.leaveUrl,
        role: this.role
      }
      const signature = ZoomMtg.generateSDKSignature({
        meetingNumber: meetConfig.meetingNumber,
       sdkKey:meetConfig.apiKey,
       sdkSecret:meetConfig.apiSecret,
        role: meetConfig.role,
        success: function (res:any) {
          console.log(res.result);
        }
      });
      console.log(signature);
       const element = document.getElementById('zmmtg-root');
        if (element !== null) {
          element.style.display = 'block';
          element.style.zIndex = (0).toString();
        }
        ZoomMtg.init({
          leaveUrl: this.leaveUrl,
          isSupportAV: true,
          success: (success:any) => {
            console.log(success)

            ZoomMtg.join({
              signature: signature,
              meetingNumber: meetConfig.meetingNumber,
              userName: meetConfig.userName,
              userEmail: meetConfig.userEmail,
              sdkKey:meetConfig.apiKey,
              passWord:meetConfig.passWord,
              success: (success:any) => {
                console.log(success)
              },
              error: (error:any) => {
                console.log(error)
              }
            })
          },
          error: (error:any) => {
            console.log(error)
          }
        })
      }






}

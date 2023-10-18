

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Twilio from '@twilio/voice-sdk';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateMeetingDto } from './models/createMeetingData';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private twilioDevice: any;
  private connection: any;
   token:any;
  headers: any;
  public callStatus$ = new BehaviorSubject<string>(''); // Observable to track call status

  constructor(private http: HttpClient) {}
  apiUrl = 'https://business-api.algorithms.ws/api/v1/zoom/';

  getToken(){
    return this.http.post(this.apiUrl + `accessToken`,{}).subscribe((res:any)=>{
      this.token  = res.access_token;
      console.log( this.token );
    });
  }
  getSignature(){
    return this.http.post(this.apiUrl + `sdkToken`,{});
  }
  createMeeting(reqBody: CreateMeetingDto){
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Authorization', `Bearer ${this.token}`);
    return this.http.post(this.apiUrl + `createMeeting`,reqBody, { headers: this.headers });
  }






































  initializeTwilio(token: string): void {
    // this.twilioDevice = new Twilio.Device();
    this.twilioDevice.setup(token);

    this.twilioDevice.on('incoming', (connection: any) => {
      this.connection = connection;
      console.log(connection);

      this.callStatus$.next('incoming'); // Notify the UI that an incoming call is received
    });

    this.twilioDevice.on('disconnect', (connection: any) => {
      this.connection = null;
      console.log(connection);
      this.callStatus$.next('disconnected'); // Notify the UI that the call has ended
    });
  }



  acceptIncomingCall(): void {
    if (this.connection) {
      this.connection.accept();
      this.callStatus$.next('connected'); // Notify the UI that the call is connected
    }
  }

  rejectIncomingCall(): void {
    if (this.connection) {
      this.connection.reject();
      this.callStatus$.next('disconnected'); // Notify the UI that the call is rejected
    }
  }

  endCall(): void {
    if (this.connection) {
      this.connection.disconnect();
      this.callStatus$.next('disconnected'); // Notify the UI that the call is ended
    }
  }


  // createcall(v:any){
  // return  this.http.post('https://eyas-api.algorithms.ws/api/v1/voiceCall/twilloCreateCall',v)
  // }
}

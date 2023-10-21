import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CallService } from '../call.service';
import { CreateMeetingDto } from '../models/createMeetingData';
import { ZoomMtg } from '@zoomus/websdk';

@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.component.html',
  styleUrls: ['./voice-call.component.css'],
})
export class VoiceCallComponent implements OnInit, AfterContentInit {
  private readonly DEFAULT_USER_NAME = 'Amr Matar';
  private readonly DEFAULT_USER_EMAIL = 'amrweb@gmail.com';

  private readonly meetConfig = {
    apiKey: 'xRgxdaNXTZeWxVWwSi_x8w',
    apiSecret: 'Md0oKwAmc2IodKJ348au3nArgcci7wc9',
    leaveUrl: 'http://localhost:4200',
    role: '1',
  };

  requestBody: CreateMeetingDto = {
    startDate: '2023-09-23T15:31:02Z',
    userName: 'mahmoud',
    userEmail: 'mahmoud@algorithms.sa',
    consultantEmail: 'mahmoudsayed1006@gmail.com',
    consultantName: 'mahmoud sayed',
  };

  constructor(private voiceCallService: CallService) {}

  async ngAfterContentInit(): Promise<void> {
    ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    try {
      const meetingResponse: any = await this.voiceCallService
        .createMeeting(this.requestBody)
        .toPromise();
      const { id: meetingNumber, password } = meetingResponse.data;

      const signature = await this.generateZoomSignature(meetingNumber);
      await this.initZoomMeeting(signature, meetingNumber, password);
    } catch (error) {
      console.error('Error creating or joining Zoom meeting:', error);
    }
  }

  private generateZoomSignature(meetingNumber: string): Promise<string> {
    return new Promise((resolve, reject) => {
      ZoomMtg.generateSDKSignature({
        meetingNumber,
        role: this.meetConfig.role,
        sdkKey: this.meetConfig.apiKey,
        sdkSecret: this.meetConfig.apiSecret,
        success: (signature: any) => resolve(signature.result),
        error: (error: any) => reject(error),
      });
    });
  }

  private initZoomMeeting(
    signature: string,
    meetingNumber: string,
    password: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      ZoomMtg.init({
        leaveUrl: this.meetConfig.leaveUrl,
        success: () => {
          ZoomMtg.join({
            meetingNumber,
            passWord: password,
            sdkKey: this.meetConfig.apiKey,
            userName: this.DEFAULT_USER_NAME,
            userEmail: this.DEFAULT_USER_EMAIL,
            signature,
            tk: '',
            success: () => resolve(),
            error: (error: any) => reject(error),
          });
        },
        error: (error: any) => reject(error),
      });
    });
  }

  ngOnInit(): void {}
}

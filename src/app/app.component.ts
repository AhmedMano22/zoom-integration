import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  token: string = '';
  consultantPhone: string = '';
  constructor(private http: HttpClient) { }
 obj = {
  "consultation":1476,
  "time":180
}
  ngOnInit(): void {
    // Send a request to your backend API to obtain the token and call information
//     this.http.post<any>('https://eyas-api.algorithms.ws/api/v1/voiceCall/twilloCreateCall' , this.obj ).subscribe((data) => {
//       this.token = data.data.token;
//       this.consultantPhone = data.data.consultantPhone;
// console.log(data);

//       // Initialize Twilio Device with the obtained token
//       // Twilio.Device.setup(this.token);
//     });
  }

}

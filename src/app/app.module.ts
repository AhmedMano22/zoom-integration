import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoiceCallComponent } from './voice-call/voice-call.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, VoiceCallComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

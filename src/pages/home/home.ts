import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var window

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: any[] = [];
  text: string = "";

  constructor(public navCtrl: NavController, public ngZone: NgZone) {

    this.messages.push({
      text: "Hi, How can I help you?",
      sender: "api"
    })

  }

  /** sendMessage is a function that will send the message written by user to Dialogflow*/
  sendMessage()
  {

    let message = this.text;

    this.messages.push({
      text: message,
      sender: 'me'
    });

    this.text = "";

    window["ApiAIPlugin"].requestText({
      query: message
    }, (response)=>{
      
      this.ngZone.run(()=>{
        this.messages.push({
          text: response.result.fulfillment.speech,
          sender: "api"
        });
      })

    }, (error)=>{alert(JSON.stringify(error));
    })
  }

}

import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Subscription} from 'rxjs';

interface Data {
  name: string;
  status: string;
}

interface Error {
  symbol: string;
  value: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  public receivedMessages: string[] = [];
  public data: Data[] = [];
  public receivedErrors: string[] = [];
  public error: Error[] = [];
  private topicSubscription: Subscription;
  public count = 0;

  constructor(private rxStompService: RxStompService) {
  }

  ngOnInit() {
    console.log('I am Watching');
    this.topicSubscription = this.rxStompService.watch('/topic/dog').subscribe((message: Message) => {
        // this.receivedMessages.length = 0;
        // this.data.length = 0;
        console.log('I am executing inside loop', message.body);
        this.receivedMessages.push(message.body);
        console.log('the received message', message.body);
        this.data.push(...JSON.parse(message.body));
        console.log('xxxxxxxxxxx', this.data);
        this.count++;
      },
      (error: any) => {
        console.log('I am in error inside loop' + error);

        const message = `Message generated at ${error}`;
        this.rxStompService.publish({destination: '/topic/error', body: message});
        //  const quote = {symbol: 'APPL', value: 'hai'};
        //  this.rxStompService.publish({destination: '/topic/error', body: JSON.stringify(quote)});
      });

    this.topicSubscription = this.rxStompService.watch('/topic/error').subscribe((message: Message) => {
      // this.receivedErrors.length = 0;
      this.receivedErrors.push(message.body);
      console.log('the received error', message.body);
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
    let message = '';
     message = `Error Message generated at ${new Date}`;
    this.rxStompService.publish({destination: '/topic/error', body: message});
    // const quote = {symbol: 'APPL', value: 'hai'};
    // this.rxStompService.publish({destination: '/topic/error', body: JSON.stringify(quote)});
    //  console.log('the server msg is=====>', JSON.stringify(quote));
  }
}

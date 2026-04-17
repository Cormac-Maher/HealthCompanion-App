import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonBadge, IonLabel } from '@ionic/angular/standalone';
import { QuotesService } from '../services/quotes';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonBadge, IonLabel],
})
export class HomePage implements OnInit{
  quote: string = 'Loading';
author: string = '';

  fiveADay: number = 0;
  sleepScore: number = 0;
  moodScore: number = 0;
  exerciseScore: number = 0;
  hydrationScore: number = 0;
  overallScore: number = 0;

  constructor(private quoteServices: QuotesService, private storageServices: StorageService) {}

  ngOnInit() {
    this.quoteServices.getQuote().subscribe((data: any) => {
          console.log(data);  
      this.quote = data.quote;
      this.author = data.author;
    });
  }

    async ionViewWillEnter() {
    const saved = await this.storageServices.load('fiveADay');
    if (saved != null) {
      this.fiveADay = saved;
}
    const savedSleep = await this.storageServices.load('sleepHours');
      if (savedSleep != null) 
        {
        if(savedSleep >= 8)
          this.sleepScore = 5;
        else if(savedSleep >= 7)
          this.sleepScore = 4;
        else if(savedSleep >= 6)
          this.sleepScore = 3;               
        else if(savedSleep >= 5)
          this.sleepScore = 2;        
        else if(savedSleep >= 4)
          this.sleepScore = 1;
        else
          this.sleepScore = 0;

        }
    }
  

  calculateOverall() {
    this.overallScore = 
    (this.fiveADay + this.sleepScore + this.moodScore + this.exerciseScore + this.hydrationScore) / 5;
  }

}

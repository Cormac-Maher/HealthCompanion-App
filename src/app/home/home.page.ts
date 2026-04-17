import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonBadge, IonLabel } from '@ionic/angular/standalone';
import { QuotesService } from '../services/quotes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonBadge, IonLabel],
})
export class HomePage implements OnInit{
  quote: string = 'Loading';
author: string = '';

  dietScore: number = 0;
  sleepScore: number = 0;
  moodScore: number = 0;
  exerciseScore: number = 0;
  hydrationScore: number = 0;
  overallScore: number = 0;

  constructor(private services: QuotesService) {}

  ngOnInit() {
    this.services.getQuote().subscribe((data: any) => {
          console.log(data);  
      this.quote = data.quote;
      this.author = data.author;
    });
  }

  calculateOverall() {
    this.overallScore = 
    (this.dietScore + this.sleepScore + this.moodScore + this.exerciseScore + this.hydrationScore) / 5;
  }

}

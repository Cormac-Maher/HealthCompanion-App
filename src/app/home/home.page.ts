import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonBadge, IonLabel } from '@ionic/angular/standalone';
import { QuotesService } from '../services/quotes';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NetworkService } from '../services/network';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [DecimalPipe, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonBadge, IonLabel],
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

  constructor(private quoteServices: QuotesService, private networkService: NetworkService, private storageServices: StorageService, private router: Router) {}

async ngOnInit() {
  const online = await this.networkService.isOnline();
  if (online) {
    this.quoteServices.getQuote().subscribe((data: any) => {
      this.quote = data.quote;
      this.author = data.author;
    });
  } else {
    this.quote = 'No internet connection available.';
    this.author = '';
  }
}

  goTo(page: string) {
    this.router.navigate([page]);
  }

  async reset() {
    this.fiveADay = 0;
    this.sleepScore = 0;
    this.moodScore = 0;
    this.exerciseScore = 0;
    this.hydrationScore = 0;
    this.overallScore = 0;

    await this.storageServices.save('fiveADay', 0);
    await this.storageServices.save('sleepHours', 0);
    await this.storageServices.save('moodScore', 0);
    await this.storageServices.save('exerciseScore', 0);
    await this.storageServices.save('exercised', false);
    await this.storageServices.save('cups', 0);
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

      const savedMood = await this.storageServices.load('moodScore');
      if (savedMood != null) { this.moodScore = savedMood; }

      const savedExercise = await this.storageServices.load('exerciseScore');
      if (savedExercise != null) { this.exerciseScore = savedExercise; }

      const savedCups = await this.storageServices.load('cups');
      if (savedCups != null) { this.hydrationScore = savedCups; }

      if (savedCups >= 12)
        this.hydrationScore = 5;
      else if (savedCups >= 10)
        this.hydrationScore = 4;
      else if (savedCups >= 8)
        this.hydrationScore = 3;
      else if (savedCups >= 6)
        this.hydrationScore = 2;
      else if (savedCups >= 4)
        this.hydrationScore = 1;
      else if (savedCups < 4)
        this.hydrationScore = 0;      

      this.calculateOverall();
    }
  

  calculateOverall() {
    this.overallScore = 
    (this.fiveADay + this.sleepScore + this.moodScore + this.exerciseScore + this.hydrationScore) * 4;
  }

}

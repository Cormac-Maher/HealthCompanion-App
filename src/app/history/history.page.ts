import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage'

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonButton]
})

export class HistoryPage implements OnInit {

  history: { date: string, score: number }[] = [];

  constructor(private storageService: StorageService) {}

  async ngOnInit() 
  {
    const saved = await this.storageService.load('scoreHistory');
    if (saved != null) 
    {
    this.history = [...saved].reverse();
    }
  }

  getScoreColour(score: number): string 
  {
    if (score >= 80) return '#0bdc1c';
    if (score >= 60) return '#f9ed3f';
    if (score >= 40) return '#ff6f00';
    return '#f32424';
  }

  async resetHistory() 
  {
  this.history = [];
  await this.storageService.save('scoreHistory', []);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonRange, IonBackButton, IonButtons, IonCardTitle } from '@ionic/angular/standalone';import { StorageService } from '../services/storage';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonRange, IonBackButton, IonButtons, IonCardTitle]
})
export class FoodPage implements OnInit {

  portions: number = 0;
  message: string = '';

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    const saved = await this.storageService.load('fiveADay');
    if (saved != null) {
      this.portions = saved;
    }
  }

  async save() {
    await this.storageService.save('fiveADay', this.portions);
  }

}

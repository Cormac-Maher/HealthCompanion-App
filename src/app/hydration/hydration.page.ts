import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonButtons, IonBackButton, IonCardTitle } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-hydration',
  templateUrl: './hydration.page.html',
  styleUrls: ['./hydration.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonBackButton, IonCardTitle]
})

export class HydrationPage implements OnInit {

  cups: number = 0;
  message: string = '';

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    const saved = await this.storageService.load('cups');
    if (saved != null) {
      this.cups = saved;
    }
  }

  increase() {
    this.cups++;
  }

  decrease() {
    if (this.cups > 0) {
      this.cups--;
    }
  }

  async save() {
    await this.storageService.save('cups', this.cups);
    this.message = 'Saved!';
  }
}

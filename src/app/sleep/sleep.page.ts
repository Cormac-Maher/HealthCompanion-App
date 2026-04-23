import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonRange, IonBackButton, IonButtons, IonCardTitle, IonCard, IonCardContent, IonCardHeader } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.page.html',
  styleUrls: ['./sleep.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonRange, IonBackButton, IonButtons, IonCardTitle, IonCard, IonCardContent, IonCardHeader]
})
export class SleepPage implements OnInit {

  hours: number = 0;
  message: string = '';

  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() 
  {
    const saved = await this.storageService.load('sleepHours');
    if (saved != null) 
      {
      this.hours = saved;
    }
  }

  async save() 
  {
    await this.storageService.save('sleepHours', this.hours);
    this.router.navigate(['/home']);
  }

}
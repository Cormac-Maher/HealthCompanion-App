import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonRadio, IonButton, IonRadioGroup, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mood',
  templateUrl: './mood.page.html',
  styleUrls: ['./mood.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonRadio, IonButton, IonRadioGroup, IonButtons, IonBackButton]
})
export class MoodPage implements OnInit {

  moodScore: number = 0;
  message: string = '';

  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() {
    const saved = await this.storageService.load('moodScore');
    if (saved != null) {
      this.moodScore = saved;
    }
  }

  async save() {
    await this.storageService.save('moodScore', this.moodScore);
    this.router.navigate(['/home']);
  }

}

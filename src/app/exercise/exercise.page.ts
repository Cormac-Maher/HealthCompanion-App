import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonRadio, IonButton, IonSelectOption, IonCheckbox, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage';
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonButton, IonSelectOption, IonCheckbox, IonBackButton, IonButtons]
})
export class ExercisePage implements OnInit {

  exercised: boolean = false;
  exerciseType: string = '';
  exerciseScore: number = 0;
  message: string = '';

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    const savedExercised = await this.storageService.load('exercised');
    const savedType = await this.storageService.load('exerciseType');

    if (savedExercised != null) {
      this.exercised = savedExercised;
      this.exerciseScore = this.exercised ? 5 : 0;
    }
    if (savedType != null) {
      this.exerciseType = savedType;
    }
  }

onCheckboxChange(event: any) {
  this.exercised = event.detail.checked;
  this.exerciseScore = this.exercised ? 5 : 0;
}

  async save() {
    await this.storageService.save('exercised', this.exercised);
    await this.storageService.save('exerciseType', this.exerciseType);
    await this.storageService.save('exerciseScore', this.exerciseScore);
    this.message = 'Saved!';
  }
}

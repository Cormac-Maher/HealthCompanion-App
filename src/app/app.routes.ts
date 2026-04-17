import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'mood',
    loadComponent: () => import('./mood/mood.page').then( m => m.MoodPage)
  },
  {
    path: 'hydration',
    loadComponent: () => import('./hydration/hydration.page').then( m => m.HydrationPage)
  },
  {
    path: 'food',
    loadComponent: () => import('./food/food.page').then( m => m.FoodPage)
  },
  {
    path: 'sleep',
    loadComponent: () => import('./sleep/sleep.page').then( m => m.SleepPage)
  },
  {
    path: 'exercise',
    loadComponent: () => import('./exercise/exercise.page').then( m => m.ExercisePage)
  },
];

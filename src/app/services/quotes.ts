import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  private apiUrl = 'https://dummyjson.com/quotes/random';

  constructor(private http: HttpClient) {}

  getQuote(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

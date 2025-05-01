import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clients`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  createOrder(order: any): Observable<any> {
    console.log('URL de l\'API:', `${this.apiUrl}/orders`);
    console.log('Envoi de la commande:', JSON.stringify(order, null, 2));
    return this.http.post(`${this.apiUrl}/orders`, order);
  }
} 
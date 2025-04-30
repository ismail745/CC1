import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentDate: Date = new Date();
  selectedClient: any = null;
  clients: any[] = [];
  products: any[] = [];
  orderLines: any[] = [];
  tvaRate: number = 20;

  constructor(private apiService: ApiService) {
    this.addNewLine();
  }

  ngOnInit() {
    this.loadClients();
    this.loadProducts();
  }

  loadClients() {
    this.apiService.getClients().subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => {
        console.error('Error loading clients:', error);
      }
    );
  }

  loadProducts() {
    this.apiService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  addNewLine() {
    this.orderLines.push({
      product: null,
      quantity: 1,
      priceHT: 0
    });
  }

  removeLine(index: number) {
    this.orderLines.splice(index, 1);
  }

  calculateLineTotal(line: any): number {
    return line.priceHT * line.quantity;
  }

  calculateTotalHT(): number {
    return this.orderLines.reduce((total, line) => total + this.calculateLineTotal(line), 0);
  }

  calculateTotalTTC(): number {
    const totalHT = this.calculateTotalHT();
    return totalHT * (1 + this.tvaRate / 100);
  }

  onProductChange(line: any) {
    if (line.product) {
      line.priceHT = line.product.prixUnitaireHT;
    } else {
      line.priceHT = 0;
    }
  }

  saveOrder() {
    if (!this.selectedClient) {
      alert('Veuillez sélectionner un client');
      return;
    }

    // Vérifier que toutes les lignes ont un produit et une quantité valide
    const invalidLines = this.orderLines.filter(line => !line.product || line.quantity <= 0);
    if (invalidLines.length > 0) {
      alert('Veuillez sélectionner un produit et une quantité valide pour toutes les lignes');
      return;
    }

    const order = {
      client: this.selectedClient._id,
      lignes: this.orderLines.map(line => ({
        produit: line.product._id,
        quantite: line.quantity
      }))
    };

    console.log('Client sélectionné:', this.selectedClient);
    console.log('Lignes de commande:', this.orderLines);
    console.log('Commande préparée:', order);

    this.apiService.createOrder(order).subscribe(
      (response) => {
        console.log('Réponse du serveur:', response);
        alert('Commande enregistrée avec succès');
        this.resetForm();
      },
      (error) => {
        console.error('Erreur détaillée:', error);
        console.error('Message d\'erreur:', error.message);
        console.error('Status:', error.status);
        console.error('Status text:', error.statusText);
        alert('Erreur lors de l\'enregistrement de la commande: ' + error.message);
      }
    );
  }

  resetForm() {
    this.selectedClient = null;
    this.orderLines = [];
    this.addNewLine();
  }
} 
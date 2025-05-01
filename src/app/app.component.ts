import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentDate: string = new Date().toISOString().split('T')[0];
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
    if (this.orderLines.length > 1) {
      this.orderLines.splice(index, 1);
    } else {
      alert('Vous ne pouvez pas supprimer la dernière ligne du tableau');
    }
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

  getAvailableProducts(currentLine: any): any[] {
    return this.products.filter(product => 
      !this.orderLines.some(line => 
        line !== currentLine && 
        line.product && 
        line.product._id === product._id
      )
    );
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
      })),
      date: new Date(this.currentDate)
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

  exportToPDF() {
    const doc = new jsPDF();
    
    // En-tête de la facture
    doc.setFontSize(20);
    doc.text('Facture', 105, 20, { align: 'center' });
    
    // Informations du client
    doc.setFontSize(12);
    if (this.selectedClient) {
      doc.text(`Client: ${this.selectedClient.nom}`, 20, 30);
      doc.text(`Email: ${this.selectedClient.email}`, 20, 40);
    }
    
    // Date
    doc.text(`Date: ${this.currentDate}`, 20, 50);
    
    // Tableau des produits
    const tableData = this.orderLines.map(line => [
      line.product ? line.product.libelle : '',
      line.priceHT.toFixed(2),
      line.quantity,
      this.calculateLineTotal(line).toFixed(2)
    ]);
    
    // Ajouter les totaux
    tableData.push(['', '', 'Total HT:', this.calculateTotalHT().toFixed(2)]);
    tableData.push(['', '', `TVA (${this.tvaRate}%):`, (this.calculateTotalTTC() - this.calculateTotalHT()).toFixed(2)]);
    tableData.push(['', '', 'Total TTC:', this.calculateTotalTTC().toFixed(2)]);
    
    autoTable(doc, {
      startY: 60,
      head: [['Produit', 'Prix HT', 'Quantité', 'Total HT']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10 }
    });
    
    // Sauvegarder le PDF
    doc.save('facture.pdf');
  }
} 
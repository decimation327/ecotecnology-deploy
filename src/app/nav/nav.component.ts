import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerticalModalComponent } from '../vertical-modal/vertical-modal.component';
import { CarritoServiceService } from '../servicios/carrito-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private dialog: MatDialog, private carritoService: CarritoServiceService) { }
  cantidadProductosEnCarrito: Number = 0;
  openVerticalModal() {
    const dialogRef = this.dialog.open(VerticalModalComponent, {
      width: '800px',
      panelClass: 'vertical-modal-dialog-container'
    });    
  }
  ngOnInit(): void {
    this.carritoService.cantidadTotal$.subscribe(cantidad => {
      this.cantidadProductosEnCarrito = cantidad; 
    });
}
}

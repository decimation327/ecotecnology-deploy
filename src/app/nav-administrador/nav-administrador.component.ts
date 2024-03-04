import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service.service';
import { MatDialog } from '@angular/material/dialog';
import { CarritoServiceService } from '../servicios/carrito-service.service';
import { Router } from '@angular/router'; // Importar Router
import Swal from 'sweetalert2';
import { VerticalModalComponent } from '../vertical-modal/vertical-modal.component';


@Component({
  selector: 'app-nav-administrador',
  templateUrl: './nav-administrador.component.html',
  styleUrls: ['./nav-administrador.component.css']
})
export class NavAdministradorComponent implements OnInit{

  constructor(private authService: AuthService, private dialog: MatDialog, private carritoService: CarritoServiceService, private router: Router) {}

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

  cerrarSesion(): void {
    this.authService.logout();
    Swal.fire('¡Sesión cerrada!', 'Has cerrado sesión correctamente', 'success'); // Muestra una alerta de éxito
  }


  confirmarCerrarSesion(): void {
    Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      text: 'Se cerrará tu sesión actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, cerrar sesión y redirigir al home
        this.cerrarSesion();
        this.router.navigate(['/home']);
      }
    });
  }
}

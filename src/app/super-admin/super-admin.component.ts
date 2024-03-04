// super-admin.component.ts
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from '../servicios/auth.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})

export class SuperAdminComponent {
  showMenu: boolean = false;
  registroData = {
    idRol: null,
    correo: '',
    contrasena: '',
    nombreCompleto: '',
    imagenPerfil: '',
    telefono: '' // Almacena la URL de la imagen
  };
  imageUrl: string = ''; 
  mostrarContrasena: boolean = false;


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result; // Asignamos el valor a imageUrl
    };

    reader.readAsDataURL(file);
  }
      

  constructor(
    private backendService: BackendServiceService,
    private router: Router,
    private authService: AuthService
  ) {
    
  }

  registrarAdministrador(): void {
    if (this.registroData.idRol && this.registroData.correo && this.registroData.contrasena && this.registroData.nombreCompleto) {
      this.backendService.crearUsuario(this.registroData).subscribe(
        response => {
          Swal.fire('¡Éxito!', `Usuario Administrador ${this.registroData.nombreCompleto} agregado exitosamente`, 'success')
          .then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              // Recargar la página después de que el usuario haga clic en "OK"
              window.location.reload();
            }
          });
          console.log('Usuario administrador creado exitosamente:', response);
        },
        error => {
          Swal.fire('Error', 'No se pudo crear el usuario administrador', 'error')
          .then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              // Recargar la página después de que el usuario haga clic en "OK"
              window.location.reload();
            }
          });
          console.error('Error al crear usuario administrador:', error);

        }
      );
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }
  cerrarSesion(): void {
    this.authService.logout();
    Swal.fire('¡Sesión cerrada!', 'Has cerrado sesión correctamente', 'success'); // Muestra una alerta de éxito
  }
  

  avisoRol: string = '';

  mostrarAvisoRol(): void {
    this.avisoRol = 'El número 1 es para un usuario, el número 2 es para un usuario Administrador.';
  }
  
  ocultarAvisoRol(): void {
    this.avisoRol = '';
  }

  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  opcionSeleccionada(opcion: string) {
    console.log(`Opción seleccionada: ${opcion}`);

    switch (opcion) {
      case 'Ventas en el día':
        // Lógica para la opción "Ventas en el día"
        break;
      case 'Agregar Administrador':
        this.router.navigate(['/super-admin']);
        break;
      case 'Eliminar Usuario':
        this.router.navigate(['/eliminarUsuarioSpAd']);
        break;
      case 'Eliminar Usuario Administrador':
        this.router.navigate(['/eliminarUsuarioAdministradorSpAd']);
        break;
      case 'Cerrar Sesión':
        this.router.navigate(['/home']);
        break;
      default:
        // En el caso de otras opciones, asumimos que son rutas y las navegamos
        this.router.navigate([opcion.toLowerCase().replace(' ', '-')]);
        break;
    }
  }
}

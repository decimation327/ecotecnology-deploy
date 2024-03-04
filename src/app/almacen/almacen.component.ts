import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BackendServiceService } from '../servicios/backend-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})

export class AlmacenComponent {

  
  mostrarBotonVolver: boolean = true;
  mostrarModal: boolean = false; // Estado para controlar la visibilidad del modal

  formProducto: FormGroup; // Corregimos la declaración de formProducto aquí


        constructor(private location: Location, private fb: FormBuilder, private backendService: BackendServiceService, private http: HttpClient) {

          // Inicializa tu formulario en el constructor
      this.formProducto = this.fb.group({
      // Define los campos de tu formulario aquí, por ejemplo:
      nombreProducto: ['', Validators.required],
      // Otros campos...
    });


    this.formProducto = this.fb.group({
      nombreProducto: ['', [Validators.required]], // Nombre del producto como obligatorio
      cantidad: ['', [Validators.required, Validators.min(1)]], // Cantidad con mínimo de 1
      precio: ['', [Validators.required, Validators.min(0)]], // Precio con mínimo de 0
      marca: ['', [Validators.required]], // Marca como obligatorio
      categoria: ['', [Validators.required]], // Categoría como obligatorio
      activo: ['', [Validators.required]], // Activo como obligatorio
      descripcion: ['', [Validators.required]], // Descripción como obligatorio
      urlImagen: [''] // URL de imagen como opcional
    });


         }

        goBack(): void {
          this.location.back();
        }


        // Método para abrir el modal
        abrirModal(): void {
          this.mostrarModal = true;
        }

        // Método para cerrar el modal
        cerrarModal(): void {
          this.mostrarModal = false;
        }


  // Método para agregar un nuevo producto
/// Método para agregar un nuevo producto
agregarProducto(): void {
  this.backendService.almacenarProducto(this.formProducto.value)
    .subscribe({
      next: (response) => {
        console.log('Producto almacenado exitosamente:', response);
        Swal.fire('Éxito', 'Producto almacenado exitosamente.', 'success');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al guardar el producto:', error);
        Swal.fire('Error', 'Error al guardar el producto. Por favor, inténtalo de nuevo más tarde.', 'error');
      }
    });
}

}
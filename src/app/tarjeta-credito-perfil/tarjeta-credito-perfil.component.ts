import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from '../servicios/auth.service.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarjeta-credito-perfil',
  templateUrl: './tarjeta-credito-perfil.component.html',
  styleUrls: ['./tarjeta-credito-perfil.component.css']
})
export class TarjetaCreditoPerfilComponent implements OnInit {
  barrio: string = '';
  municipio: string = '';
  direccionCompleta: string = '';
  idCuenta: string | null = null;

  constructor(private backendService: BackendServiceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.idCuenta = this.authService.getIdCuenta();
    if (this.idCuenta) {
      this.cargarInformacionDireccion();
    }
  }

  
  // ... código anterior

cargarInformacionDireccion(): void {
  if (this.idCuenta) {
    console.log('ID de cuenta:', this.idCuenta);

    const idCuentaNumero = parseInt(this.idCuenta);

    this.backendService.listarDireccionesPorCuenta(idCuentaNumero)
      .subscribe(
        (response) => {
          if (response && response.length > 0) {
            const primeraDireccion = response[0];

            // Asigna valores directamente a los campos
            this.barrio = primeraDireccion.barrio || '';
            this.municipio = primeraDireccion.municipio || '';
            this.direccionCompleta = primeraDireccion.direccionCompleta || '';

            // Guarda los valores en localStorage
            localStorage.setItem('barrio', this.barrio);
            localStorage.setItem('municipio', this.municipio);
            localStorage.setItem('direccionCompleta', this.direccionCompleta);

            // Imprime los valores para verificar
            console.log('Valores cargados:', this.barrio, this.municipio, this.direccionCompleta);
          } else {
            Swal.fire('Info', 'No se encontró información de dirección para la cuenta actual. Puede que la cuenta no tenga una dirección asociada.', 'info');
          }
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            this.handleDireccionError(error);
          }
        }
      );
  }
}

// ... código posterior


  
  
  editarDireccion(): void {
    console.log('Editar dirección');
    // Implementa la lógica de edición si es necesario
  }

  // ...

  guardarDireccion(): void {
    if (this.idCuenta) {
      const direccion = {
        barrio: this.barrio,
        municipio: this.municipio,
        direccionCompleta: this.direccionCompleta,
        idCuenta: parseInt(this.idCuenta)
      };
  
      if (!direccion.barrio || !direccion.municipio || !direccion.direccionCompleta) {
        Swal.fire('Error', 'Por favor, complete todos los campos de la dirección', 'error');
        return;
      }
  
      this.backendService.insertarDireccion(direccion).subscribe(
        (response) => {
          if (response && response.success) {
            console.log('Dirección insertada con éxito:', response);
            Swal.fire('Éxito', 'Dirección insertada correctamente', 'success');
  
            // Actualiza los valores después de la inserción
           
          } else {
            this.handleDireccionError(response);
          }
        },
        (error) => {
          this.handleDireccionError(error);
        }
      );
    }
  }
  
  
  
       


// ...

  private handleDireccionError(error: any): void {
    console.error('Error al obtener o actualizar la dirección:', error);
  
    if (error instanceof HttpErrorResponse) {
      console.error('Respuesta completa:', error);
  
      if (error.status === 200) {
        try {
          // Intentar analizar la respuesta como JSON
          let jsonResponse = JSON.parse(error.error.text);
  
          // Verificar si la respuesta es un JSON válido
          if (jsonResponse && typeof jsonResponse === 'object') {
            console.log('Respuesta del servidor (JSON):', jsonResponse);
  
            // Aquí puedes agregar más lógica según la estructura de tu respuesta
            if (jsonResponse.error) {
              // Manejar el caso específico cuando hay un error
              console.error('Error en la respuesta del servidor:', jsonResponse.error);
              Swal.fire('Error', jsonResponse.error, 'error');
            } else {
              // Manejar el caso de éxito
              console.log('Dirección insertada con éxito:', jsonResponse);
              Swal.fire('Éxito', 'Dirección insertada correctamente', 'success');
              this.cargarInformacionDireccion();
            }
          } else {
            // Si no es JSON, manejar el mensaje de éxito
            console.log('Mensaje de éxito:', error.error.text);
            Swal.fire('Éxito', error.error.text, 'success');
            this.cargarInformacionDireccion();
          }
        } catch (parseError) {
          console.error('Error al analizar la respuesta JSON:', parseError);
          
          // En este punto, si el análisis falla, asumimos que la respuesta no es JSON válido
          console.log('Respuesta no es JSON válido:', error.error.text);
          Swal.fire('Éxito', error.error.text, 'success');
          this.cargarInformacionDireccion();
        }
      } else if (error.status === 404) {
        console.log('No se encontró ninguna dirección para el ID de cuenta especificado.');
        Swal.fire('Info', 'No se encontró ninguna dirección para la cuenta actual. Puede que la cuenta no tenga una dirección asociada.', 'info');
      } else {
        console.error('Estado de la respuesta:', error.status);
        Swal.fire('Error', 'Hubo un problema al obtener o actualizar la dirección. Por favor, inténtalo de nuevo más tarde.', 'error');
      }
    } else {
      console.error('Error al obtener o actualizar la dirección:', error);
      Swal.fire('Error', 'Hubo un problema al obtener o actualizar la dirección. Por favor, inténtalo de nuevo más tarde.', 'error');
    }
  }
  
  
  
  
}
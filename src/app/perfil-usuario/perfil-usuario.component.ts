import { Component } from '@angular/core';
import { Location } from '@angular/common'; 


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
 

  constructor( private location: Location) {
    
  }

  goBack(): void {
    this.location.back();
  }


}

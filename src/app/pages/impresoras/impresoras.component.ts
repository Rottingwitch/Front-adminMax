import { Component, OnInit } from '@angular/core';
import { Impresora } from 'src/app/models/impresora.model';
import { ImpresoraService } from 'src/app/services/impresora.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impresoras',
  templateUrl: './impresoras.component.html',
  styles: [
  ]
})
export class ImpresorasComponent implements OnInit {

  public impresora: Impresora[] = [];
  public cargando: boolean = true; 

  constructor( private impresoraService: ImpresoraService ) { }

  ngOnInit(): void {
    this.cargarImpresora();
  }

  cargarImpresora() {

    this.cargando = true;
    this.impresoraService.cargarImpresoras()
        .subscribe( impresora => {
          // console.log(impresora);          
          this.cargando = false;
          this.impresora = impresora;
        })
  }

  borrarImpresora( impresora: Impresora ) {

    Swal.fire({
      title: 'Borrar Impresora?',
      text: `Seguro quiere borrar la impresora con el serial ${ impresora.serial }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.value) {

        this.impresoraService.borrarImpresoras( impresora )
            .subscribe( resp => {
              
              this.cargarImpresora();      
              Swal.fire(
                'Medico borrado!',
                'Your file has been deleted.',
                'success'
              );
            });
      }
    });
     
  }






}

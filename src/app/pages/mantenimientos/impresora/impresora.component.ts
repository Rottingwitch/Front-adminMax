import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImpresoraService } from '../../../services/impresora.service';

@Component({
  selector: 'app-impresora',
  templateUrl: './impresora.component.html',
  styles: [
  ]
})
export class ImpresoraComponent implements OnInit {

  public printerForm : FormGroup;

  constructor( private fb: FormBuilder,
               private impresoraService: ImpresoraService  ) { }

  ngOnInit(): void {

    this.printerForm = this.fb.group({
      serial:['asd', Validators.required ],
      modelo:['asd', Validators.required ],
      ciudad:['asd', Validators.required ],
      empresa:['asd', Validators.required ],
      centro_operacion:['121', Validators.required ],
      sucursal:['asdas', Validators.required ],
    })

  }

  guardarImpresora(){
    console.log(this.printerForm.value);

    this.impresoraService.crearImpresoras( this.printerForm.value )
        .subscribe( resp => {
          console.log( resp );          
        })



    
  }

}

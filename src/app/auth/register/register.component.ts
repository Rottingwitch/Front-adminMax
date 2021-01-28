import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formPosteado = false;

  public registerForm = this.fb.group({

    nombre: [ 'walther', Validators.required ],
    email: [ 'aux@ceramigres.com', [ Validators.required, Validators.email ] ],
    password: [ '123', Validators.required ],
    password2: [ '123', Validators.required ],
    terminos: [ true, Validators.required ],
  },
  {
    validators: this.passwordIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService ) { }

  crearUsuario() {
    this.formPosteado = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      return;            
    } 

    // Realizar la creacion
    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp => {
          console.log(' usuario creado');         
          console.log( resp );            
        }, (err) => { 
          console.warn( err ); 
        });
    
  }

  campoNoValido( campo: string ): boolean {
    
    if ( this.registerForm.get(campo).invalid && this.formPosteado ) {
      return true;      
    } else {
      return false;
    }

  }


  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formPosteado
  }


  contrasenaNoValido() {

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) && this.formPosteado ) {
      return true;      
    } else {
      return false;
    }

    

  }


  passwordIguales( pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {
      
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true });

      }

    }

  }



}

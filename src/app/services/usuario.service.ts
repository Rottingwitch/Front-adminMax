import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interfaces';
import { RegisterForm } from '../interfaces/register-form.interfaces';

import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router ) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  get token(): string {
     return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }





  validaToken(): Observable<boolean> {
    
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {

        const { nombre, email, cargo, uid, role } = resp.usuarios;
        this.usuario = new Usuario( nombre, email, cargo, '', uid, role );        
        localStorage.setItem('token', resp.token );
        return true;
      }),
      map( resp => true),
      catchError( error => of(false) )   
    );

  }


  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post( `${ base_url }/usuarios`, formData )
                    .pipe(
                      tap( ( resp: any ) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )

  }

  actualizarUsuario( data: { email: string, nombre: string, cargo: string, password: string } ) {

    data = { 
      ...data,
      cargo: this.usuario.cargo,
      password: this.usuario.password
    }

    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }


  login( formData: LoginForm ) {
    
    return this.http.post( `${ base_url }/login`, formData )
                    .pipe(
                      tap( ( resp: any ) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )

  }
  


}

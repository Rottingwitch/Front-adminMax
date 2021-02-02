import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Impresora } from '../models/impresora.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ImpresoraService {

   constructor( private http: HttpClient ) { }

  cargarImpresoras() {

    const url = `${ base_url }/impresoras`;
    return this.http.get( url )
           .pipe(
             map( ( resp: { ok: boolean, impresora: Impresora[] } ) => resp.impresora )
           ); 

  }


  crearImpresoras( impresora: Impresora ) {

    const url = `${ base_url }/impresoras`;
    return this.http.post( url, impresora )
  }

  
  actualizarImpresoras( impresora: Impresora ) {  
    const url = `${ base_url }/impresoras/${ impresora._id }`;
    return this.http.put( url, impresora )
  }

  borrarImpresoras(  impresora: Impresora ) {

    const url = `${ base_url }/impresoras/${ impresora._id }`;    
    return this.http.delete( url )
  }




}

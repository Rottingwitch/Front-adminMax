import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public titulosSubs$: Subscription;

  constructor( private router : Router ) { 

    this.titulosSubs$ =  this.getArgumentosRuta()    
                          .subscribe( ({ titulo }) => {
                            this.titulo = titulo;
                            document.title = `AdminMax - ${ titulo }`;        
                        });

  }
  ngOnDestroy(): void {
    this.titulosSubs$.unsubscribe();
  }

   getArgumentosRuta() {

    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( ( event: ActivationEnd ) => event.snapshot.firstChild === null ),
      map( ( event: ActivationEnd ) =>  event.snapshot.data ),
    );

   }



}

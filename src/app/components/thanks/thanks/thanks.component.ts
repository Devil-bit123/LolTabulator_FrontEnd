import { inject, OnChanges } from '@angular/core';
// import { ChangeDetectorRef, Component, input, Input, SimpleChanges } from '@angular/core';
// import {MatCardModule} from '@angular/material/card';
// import {MatButtonModule} from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-thanks',
//   standalone: true,
//   imports: [MatCardModule,CommonModule],
//   templateUrl: './thanks.component.html',
//   styleUrl: './thanks.component.css'
// })
// export class ThanksComponent {

//   @Input() responseType:string="";

//   TxtContainer="";
//   TxtP="";

//   imgUrl="";

//   /**
//    *
//    */
//   constructor(private cdr: ChangeDetectorRef) {

//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['responseType']) {
//       // Mostrar los cambios que están ocurriendo
//       console.log('ngOnChanges - responseType changed:', changes['responseType'].currentValue);
//       this.changeText(this.responseType); // Pasar el valor de responseType
//       this.cdr.detectChanges();
//     }
//   }



//   changeText(rType:string){
//     console.log('changeText - received responseType:', rType);
//     if(rType==='ok'){
//       this.TxtContainer="Gracias por perder tu timepo :D!";
//       this.TxtP="no te olvides de reportar al jungla";
//       this.imgUrl="https://giffiles.alphacoders.com/527/52728.gif";
//     }else{
//       this.TxtContainer="Parece que eres un trol, tu ya respondiste >:C";
//       this.TxtP="Se ha generado un reporte de troleo para Riot.";
//       this.imgUrl="https://media.tenor.com/frXMLLje3bkAAAAi/jhin-emote.gif";
//     }
//   }

// }



import { ChangeDetectorRef, Component, input, Input, OnInit, SimpleChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../core/services/player/player.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatButtonModule],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.css'
})
export class ThanksComponent implements OnInit, OnChanges {


  private router=inject(Router)
  TxtContainer="";
  TxtP="";

  imgUrl="";

  itsReady=false;
  mensaje: string = '';

  /**
   *
   */
  constructor(private cdr: ChangeDetectorRef, private _playerService:PlayerService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this._playerService.mensaje$.subscribe(mensaje => {
      this.changeText(mensaje);
    });

  }


  ngOnInit(): void {
    this._playerService.mensaje$.subscribe(mensaje => {
      //console.log('Mensaje recibido:', mensaje); // Verifica que el mensaje no esté vacío
      if (mensaje) {
        this.mensaje = mensaje; // Actualiza la variable mensaje
        this.changeText(mensaje);
        this.cdr.detectChanges(); // Forzar la detección de cambios
      } else {
        //console.warn('Mensaje recibido vacío');
      }
    });
  }


  changeText(rType:string){
    //console.log('changeText - received responseType:', rType);

    if(rType=='ok'){
      //console.log('entre al ko')
      //this.itsReady=true;
      this.TxtContainer="Gracias por perder tu timepo :D!";
      this.TxtP="no te olvides de reportar al jungla";
      this.imgUrl="https://giffiles.alphacoders.com/527/52728.gif";
    }else{
      //this.itsReady=true;
      //console.log('entre al trol')
      this.TxtContainer="Parece que eres un trol, tu ya respondiste >:C";
      this.TxtP="Se ha generado un reporte de troleo para Riot.";
      this.imgUrl="https://media.tenor.com/frXMLLje3bkAAAAi/jhin-emote.gif";
    }
    this.itsReady=true;
  }

  goToDashboard(){
    this.router.navigate(['dashboard']);
  }

}

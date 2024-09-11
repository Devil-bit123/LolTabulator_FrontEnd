import { Component, inject, OnInit, ChangeDetectionStrategy, ViewEncapsulation  } from '@angular/core';
import { Player } from '../../../core/interfaces/player';
import { PlayerService } from '../../../core/services/player/player.service';


import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { LineComponent } from '../../line/line/line.component';
import { CommonModule } from '@angular/common';
import { OtpComponent } from '../../otp/otp/otp.component';

import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-sistemas',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    LineComponent,
    CommonModule,
    OtpComponent,
    MatButtonModule
    ],
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SistemasComponent implements OnInit {

  currentPlayer!: Player;
  sistemasInput:string="";
  firstQuestionResponsed=false;
  secondQuestionResponsed=false;
  thirdQuestionResponsed=false;

  public _playerService = inject(PlayerService)

  otpInput:string="";

  constructor(private playerService:PlayerService) {

  }

  ngOnInit(): void {
    this._playerService.playerSubject.subscribe((player) => {
    });
  }


  responseQuestionSistemas(response:string){
    this.sistemasInput=response;
    this._playerService.playerSubject.next({
      ...this._playerService.playerSubject.value, // Mantén las otras propiedades
      sistemas: this.sistemasInput === 'true',   // Actualiza 'sistemas' con el valor recibido
    });
    this.firstQuestionResponsed=true;
    //console.log('Valor de player después de la actualización:', this._playerService.playerSubject.value);
  }

  handleSelectionChange(value: string): void {
    //console.log('Received value from child:', value);
    this.secondQuestionResponsed=true;
  }

  handleOtpSubmit(value: string): void {
    //console.log('Received value from child:', value);
    this.thirdQuestionResponsed=true;
  }

}

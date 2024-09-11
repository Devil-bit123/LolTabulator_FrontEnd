import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { PlayerService } from '../../../core/services/player/player.service';

interface Line {
  name: string;
}

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [MatChipsModule,MatCardModule,MatProgressBarModule,MatSelectModule],
  templateUrl: './line.component.html',
  styleUrl: './line.component.css'
})
export class LineComponent implements OnInit {

  lineInput:string="";
  lines: Line[] = [
    {name: "Top"},
    {name: 'Mid'},
    {name: 'Jg'},
    {name: 'Adc'},
    {name: 'Sup'},
  ];

  public _playerService = inject(PlayerService)

  @Output() selectionChanged: EventEmitter<string> = new EventEmitter<string>();


  constructor(private playerService:PlayerService) {

  }

  ngOnInit(): void {
    this._playerService.playerSubject.subscribe((player) => {
    });
  }

  responseQuestionLine(response:string){
    this.lineInput=response;
    this._playerService.playerSubject.next({
      ...this._playerService.playerSubject.value, // Mantén las otras propiedades
      line: this.lineInput,   // Actualiza 'sistemas' con el valor recibido
    });
    //console.log('Valor de player después de la actualización:', this._playerService.playerSubject.value);
  }

  onImageClicked(response:string){
    this.lineInput=response;
    this.responseQuestionLine(this.lineInput);
    this.emitEvent(this.lineInput);
  }

  emitEvent(value: string): void {
    this.selectionChanged.emit(value);
  }

}

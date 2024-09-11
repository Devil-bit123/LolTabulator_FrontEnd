
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player, partialPlayer } from '../../interfaces/player';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  public playerSubject = new BehaviorSubject<partialPlayer>({
    sistemas: false,
    line: 'none',
    otp: 'none',
  });
  player$ = this.playerSubject.asObservable();

  private mensajeSubject = new BehaviorSubject<string>('');
  mensaje$: Observable<string> = this.mensajeSubject.asObservable();

constructor() { }


 updatePlayer(player: Player) {
  this.playerSubject.next(player);
}

getPlayers():Observable<Player[]>{
  return this.http.get<Player[]>(`${this.apiUrl}players`);
}

postPlayers(player:Player):Observable<Player>{
  return this.http.post<Player>(`${this.apiUrl}players`, player);
}

setMensaje(mensaje: string): void {
  this.mensajeSubject.next(mensaje);
}
}

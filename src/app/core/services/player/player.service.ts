
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../interfaces/player';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

constructor() { }

getPlayers():Observable<Player[]>{
  return this.http.get<Player[]>(`${this.apiUrl}players`);
}

postPlayers(player:Player):Observable<Player>{
  return this.http.post<Player>(`${this.apiUrl}players`, player);
}

}

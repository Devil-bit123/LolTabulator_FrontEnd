import { CookieService } from 'ngx-cookie-service';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { PlayerService } from '../../../core/services/player/player.service';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Player } from '../../../core/interfaces/player';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ThanksComponent } from '../../thanks/thanks/thanks.component';



export interface Champion {
  name: string;
}

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    MatChipsModule,
    MatCardModule,
    MatProgressBarModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    AsyncPipe,
    ThanksComponent
  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent implements OnInit {
  champions: Champion[] = [
    { name: 'Aatrox' },
    { name: 'Ahri' },
    { name: 'Akali' },
    { name: 'Alistar' },
    { name: 'Amumu' },
    { name: 'Anivia' },
    { name: 'Annie' },
    { name: 'Ashe' },
    { name: 'Aurelion Sol' },
    { name: 'Azir' },
    { name: 'Bard' },
    { name: 'Blitzcrank' },
    { name: 'Brand' },
    { name: 'Braum' },
    { name: 'Caitlyn' },
    { name: 'Camille' },
    { name: 'Cassiopeia' },
    { name: "Cho'Gath" },
    { name: 'Corki' },
    { name: 'Darius' },
    { name: 'Diana' },
    { name: 'Dr. Mundo' },
    { name: 'Draven' },
    { name: 'Ekko' },
    { name: 'Elise' },
    { name: 'Evelynn' },
    { name: 'Ezreal' },
    { name: 'Fiddlesticks' },
    { name: 'Fiora' },
    { name: 'Fizz' },
    { name: 'Galio' },
    { name: 'Gangplank' },
    { name: 'Garen' },
    { name: 'Gnar' },
    { name: 'Gragas' },
    { name: 'Graves' },
    { name: 'Hecarim' },
    { name: 'Heimerdinger' },
    { name: 'Illaoi' },
    { name: 'Irelia' },
    { name: 'Ivern' },
    { name: 'Janna' },
    { name: 'Jarvan IV' },
    { name: 'Jax' },
    { name: 'Jayce' },
    { name: 'Jhin' },
    { name: 'Jinx' },
    { name: "Kai'Sa" },
    { name: 'Kalista' },
    { name: 'Karma' },
    { name: 'Karthus' },
    { name: 'Kassadin' },
    { name: 'Katarina' },
    { name: 'Kayle' },
    { name: 'Kayn' },
    { name: 'Kennen' },
    { name: "Kha'Zix" },
    { name: 'Kindred' },
    { name: 'Kled' },
    { name: "Kog'Maw" },
    { name: 'LeBlanc' },
    { name: 'Lee Sin' },
    { name: 'Leona' },
    { name: 'Lissandra' },
    { name: 'Lucian' },
    { name: 'Lulu' },
    { name: 'Lux' },
    { name: 'Malphite' },
    { name: 'Malzahar' },
    { name: 'Maokai' },
    { name: 'Master Yi' },
    { name: 'Miss Fortune' },
    { name: 'Mordekaiser' },
    { name: 'Morgana' },
    { name: 'Nami' },
    { name: 'Nasus' },
    { name: 'Nautilus' },
    { name: 'Neeko' },
    { name: 'Nidalee' },
    { name: 'Nocturne' },
    { name: 'Nunu y Willump' },
    { name: 'Olaf' },
    { name: 'Orianna' },
    { name: 'Ornn' },
    { name: 'Pantheon' },
    { name: 'Poppy' },
    { name: 'Pyke' },
    { name: 'Qiyana' },
    { name: 'Quinn' },
    { name: 'Rakan' },
    { name: 'Rammus' },
    { name: "Rek'Sai" },
    { name: 'Renekton' },
    { name: 'Rengar' },
    { name: 'Riven' },
    { name: 'Rumble' },
    { name: 'Ryze' },
    { name: 'Sejuani' },
    { name: 'Senna' },
    { name: 'Seraphine' },
    { name: 'Sett' },
    { name: 'Shaco' },
    { name: 'Shen' },
    { name: 'Shyvana' },
    { name: 'Singed' },
    { name: 'Sion' },
    { name: 'Sivir' },
    { name: 'Skarner' },
    { name: 'Sona' },
    { name: 'Soraka' },
    { name: 'Swain' },
    { name: 'Syndra' },
    { name: 'Tahm Kench' },
    { name: 'Taliyah' },
    { name: 'Taric' },
    { name: 'Teemo' },
    { name: 'Thresh' },
    { name: 'Tristana' },
    { name: 'Trundle' },
    { name: 'Tryndamere' },
    { name: 'Twisted Fate' },
    { name: 'Twitch' },
    { name: 'Udyr' },
    { name: 'Urgot' },
    { name: 'Varus' },
    { name: 'Vayne' },
    { name: 'Veigar' },
    { name: "Vel'Koz" },
    { name: 'Vex' },
    { name: 'Vi' },
    { name: 'Viktor' },
    { name: 'Vladimir' },
    { name: 'Volibear' },
    { name: 'Warwick' },
    { name: 'Wukong' },
    { name: 'Xayah' },
    { name: 'Xerath' },
    { name: 'Xinzhao' },
    { name: 'Yasuo' },
    { name: 'Yone' },
    { name: 'Yorick' },
    { name: 'Zac' },
    { name: 'Zed' },
    { name: 'Zeri' },
    { name: 'Ziggs' },
    { name: 'Zilean' },
    { name: 'Zoe' },
    { name: 'Zyra' },
  ];

  imgUrl="https://i.giphy.com/M51FEiXf0rhmSQekQN.webp";

  options: Champion[] = this.champions;
  filteredOptions: Observable<Champion[]>;

  otpInput: string = '';
  @Output() selectionChanged: EventEmitter<string> = new EventEmitter<string>();
  otpForm: FormGroup;
  public _playerService = inject(PlayerService);
  itsLoading = false;
  itsResponsed = false;
  typeOfResponse="";


  constructor(private playerService: PlayerService, private fb: FormBuilder, private cookieService: CookieService) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{1,}$/)]],
    });

    const otpControl = this.otpForm.get('otp') as FormControl;

    this.filteredOptions = otpControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Champion[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this._playerService.playerSubject.subscribe((player) => {});
  }

  responseQuestionOtp(response: string) {
    this.otpInput = response;
    this._playerService.playerSubject.next({
      ...this._playerService.playerSubject.value, // Mantén las otras propiedades
      otp: this.otpInput, // Actualiza 'sistemas' con el valor recibido
    });
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      this.itsLoading = true;
      this.itsResponsed = false;

      this.responseQuestionOtp(this.otpForm.value.otp);
      const currentPlayer = this._playerService.playerSubject.value;
      const PlayerResponses: Player = {
        sistemas: currentPlayer.sistemas ?? false, // Usa valores predeterminados si es necesario
        line: currentPlayer.line ?? '',
        otp: currentPlayer.otp ?? '',
      };

      if(this.cookieService.get('usCt')){

        this.playerService.setMensaje('trol');

      }else{

        this._playerService.postPlayers(PlayerResponses).subscribe({
          next: (response) => {

            this.playerService.setMensaje('ok');
            this.cookieService.set('usCt', response.token?);
            //this.itsResponsed = true;

          },
          error: (error) => {
            console.log(error);

            this.playerService.setMensaje('trol');


          },
        });

      }

      this.itsResponsed = true;
      this.itsLoading=false;
      //console.log('PlayerResponses:', PlayerResponses);
    } else {
      //console.log('Form is invalid');
    }
  }

  emitEvent(value: string): void {
    this.selectionChanged.emit(value);
  }



}

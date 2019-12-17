import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { GameService } from '../game.service';
import { Game } from './../game';
import 'rxjs/add/operator/switchMap';


import { NgForm } from '@angular/forms';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';
import { Router} from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators,FormControl } from '@angular/forms';

// import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'view-game',
  templateUrl: './view-game.component.html',
  styleUrls: ['./view-game.component.css'],
  providers: [GameService]
})
export class ViewGameComponent implements OnInit {

  @Input() game: Game;

  constructor(
      private gameService: GameService,
      private route: ActivatedRoute,
      private location: Location
      ) {}

ngOnInit(): void {
  this.route.params
    .switchMap((params: Params) => this.gameService.getGame(params['id']))
    .subscribe(game => this.game = game);
}


goBack(): void {
  this.location.back();
}

}

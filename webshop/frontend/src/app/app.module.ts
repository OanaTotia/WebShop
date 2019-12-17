import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { GameService } from './game.service';


import { AppComponent } from './app.component';
import { AllGamesComponent } from './all-games/all-games.component';
import { AddGameComponent } from './add-game/add-game.component';
import { ViewGameComponent } from './view-game/view-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';

const appRoutes: Routes =[
  {path: 'add-game', component: AddGameComponent},
  {path: 'all-games', component: AllGamesComponent},
  {path: 'view-game/:id', component: ViewGameComponent},
  {path: 'edit-game/:id', component: EditGameComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AllGamesComponent,
    AddGameComponent,
    ViewGameComponent,
    EditGameComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

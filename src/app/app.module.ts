import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PlayerComponent } from './player/player.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { SetupComponent } from './setup/setup.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
   declarations: [
      AppComponent,
      SearchComponent,
      PlayerComponent,
      AuthComponent,
      SetupComponent,
      SettingsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

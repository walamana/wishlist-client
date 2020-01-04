import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AuthComponent } from './auth/auth.component';
import { SetupComponent } from './setup/setup.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: "", component: SetupComponent},
  {path: "room/:ticket/:mode/settings", component: SettingsComponent},
  {path: "room/:ticket/:mode/search", component: SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

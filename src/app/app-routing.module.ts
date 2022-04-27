import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteComponent } from './pages/note/note.component';
import { RegisterComponent } from './pages/register/register.component';

import { AuthGuard } from './shared/guard/auth.guard';
const routes: Routes = [
  { path: '', redirectTo : '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent},
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'dashboard', component: MainLayoutComponent, canActivate: [AuthGuard]}, 
  { path: 'new-note', component: NoteComponent, canActivate: [AuthGuard]},
  { path: 'edit-note/:id', component: NoteComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

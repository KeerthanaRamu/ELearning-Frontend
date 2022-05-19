import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/services/auth.service'; 
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService :AuthService, public router: Router){

  }

  canActivate() : boolean{
    if(!this.authService.isUserLoggedIn){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
 
}

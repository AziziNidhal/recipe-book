import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';


@Injectable()
export class RecipesCanLoadGuard implements CanLoad {
    constructor(private authService: AuthService){}
    canLoad(
        route: Route
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated();
    }
}

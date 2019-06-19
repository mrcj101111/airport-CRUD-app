import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.accessToken;
        const authRequest = req.clone({
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + authToken)
                .set('Access-Control-Allow-Origin', '*')
        });
        return next.handle(authRequest);
    }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getAuthToken();
   
    // add auth header with jwt if user is logged in and request is to api url
//     const currentUser = this.authenticationService.getUser();
//     const isLoggedIn = currentUser && currentUser.token;
//     if (isLoggedIn) {
//       console.log(currentUser.token,currentUser)
//         request = request.clone({
//             setHeaders: {
//                 Authorization: `Bearer ${currentUser.token}`
//             }
//         });
//            }

//     return next.handle(request);
// }
if (token) {
  // If we have a token, we set it to the header
  request = request.clone({
     
     setHeaders: {  
      Authorization: `Bearer ${this.authenticationService.getAuthToken()}`  
    }  
  });
}

return next.handle(request).pipe(
 catchError((err) => {
   if (err instanceof HttpErrorResponse) {
       if (err.status === 401) {
       // redirect user to the logout page
    }
 }
 return throwError(err);
})
)
}
}

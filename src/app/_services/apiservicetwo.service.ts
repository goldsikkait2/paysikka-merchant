import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiservicetwoService {
  serverEndpoint = `${environment.apiUrl}`;
  constructor( 
    private http: HttpClient
  ) {
    if (environment.production) {
      this.serverEndpoint = environment.apiUrl;
    }
  }
 
  
  
   
  /**
   *
   * @param endpoint
   * @param data
   * @param headers
   */
  post(endpoint: any, data: any, data2:any,  headers?: {}) {
    return this.http.post(this.serverEndpoint + endpoint, data, headers);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  get(endpoint: any, params?: {}) {
    return this.http.get(this.serverEndpoint + endpoint, params);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  delete(endpoint: any, params?: {}) {
    return this.http.delete(this.serverEndpoint + endpoint, params);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  put(endpoint:any, params?: {}) {
    return this.http.put(this.serverEndpoint + endpoint, params);
  }
  
}

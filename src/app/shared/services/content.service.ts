import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env'

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private readonly url = environment.currentUrl;

  constructor(private http: HttpClient) { }

  public fetchData<T>(path: string, params?: { [key: string]: string | number }): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.get<T>(`${this.url}${path}`, { params: httpParams });
  }
}

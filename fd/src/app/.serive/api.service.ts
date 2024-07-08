import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import {
  ProductServiceService,
  worklog,
  type,
  details,
  optionData,
  StaffDetails,
  options,
  Cardinfo,
} from '../.serive/product-service.service';
import { Observable, catchError, throwError } from 'rxjs';

interface temp {
  taskid: number
}


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  [x: string]: any;
  constructor(private http: HttpClient) { }



  gettoken():string | null{
    return localStorage.getItem("token");
  }

  addwork(work: worklog): Observable<string> {
    return this.http
      .post<string>('http://localhost:3000/work', work, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  addstaff(staff: StaffDetails): Observable<any> {
    return this.http
      .post<string>('http://localhost:3000/staff', staff, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  getWorkerDetails() {
    return this.http.get<details[]>('http://localhost:3000/staff');
  }



  getOstaff() {
    return this.http.get<options[]>('http://localhost:3000/getstaff');
  }


  getworklog(strdate:string) {
    const date=new HttpParams().set('date',strdate)
    return this.http.get<any[]>('http://localhost:3000/worklog/',{params:date});
  }

  editwork(data: worklog): Observable<any> {
    return this.http
      .post<string>('http://localhost:3000/worklog', data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  
  getcardinfo(strdate:string) {
  let para=new HttpParams().set('date',strdate);
    return this.http.get<any>('http://localhost:3000/cardinfo',{params:para})
  }

  // getcardinfo() {
   
  //     return this.http.get<any>('http://localhost:3000/cardinfo')
  //   }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
}

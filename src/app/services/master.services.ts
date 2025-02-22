import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { salesdata } from '../model/salesdata';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }



  loadsalesdata(){
    return this.http.get<salesdata[]>("http://localhost:3000/sales")
  }
}

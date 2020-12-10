import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tema } from '../model/Tema';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')!)
  }

  getAllTemas(): Observable<Tema[]>{
    return this.http.get<Tema[]>('http://localhost:9000/tema', this.token)
  }

  getByIdTema(id: number): Observable<Tema>{
    return this.http.get<Tema>(`http://localhost:9000/tema/${id}`, this.token)
  }

  postTema(tema: Tema){
    return this.http.post<Tema>('http://localhost:9000/tema', tema, this.token)
  }

  putTema(tema:Tema){
    return this.http.delete<Tema>('http://localhost:9000/tema', this.token)
  }

  deleteTema(id: number){
    return this.http.delete<Tema>(`http://localhost:9000/tema/${id}`, this.token)
  }
}

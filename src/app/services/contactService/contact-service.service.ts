import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private http:HttpClient) { }

  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>('api/contacts')
  }

  getContact(id:number):Observable<Contact>{
    return this.http.get<Contact>('api/contacts/' + id)
  }

  updateContact(contact:Contact):Observable<Contact[]>{
    return this.http.put<Contact[]>('api/contacts', contact);
  }

  addContact(contact: Contact):Observable<Contact>{
    return this.http.post<Contact>('api/contacts', contact)
  }

  deleteContact(id:number):Observable<Contact>{
    return this.http.delete<Contact>('api/contacts/' + id);
  }

  searchContactByFirstname(search: string):Observable<Contact[]>{
    return this.http.get<Contact[]>('api/contacts/?firstname=' + search);
  }

  searchContactByLastname(search: string):Observable<Contact[]>{
    return this.http.get<Contact[]>('api/contacts/?lastname=' + search);
  }
}

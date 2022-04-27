import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ContactServiceService } from 'src/app/services/contactService/contact-service.service';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {
 @Input() contact?: Contact; 
  contacts: Contact[] = [];
  
  constructor(private contactService: ContactServiceService, private http:HttpClient) { }

  ngOnInit(): void {
  }

}

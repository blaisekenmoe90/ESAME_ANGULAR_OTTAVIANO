import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ContactServiceService } from 'src/app/services/contactService/contact-service.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactService: ContactServiceService,) { }

  ngOnInit(): void {
    this.getAllContacts();
  }


  getAllContacts(){
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ContactServiceService } from 'src/app/services/contactService/contact-service.service';
import { FormsModule } from '@angular/forms';
import { Contact } from 'src/app/interfaces/contact';
import { MessageServiceService } from 'src/app/services/messageService/message-service.service';
import { Message} from 'src/app/interfaces/message'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {


  
  // contact: Contact = {
  //   id: 2342, 
  //   firstname: 'test', 
  //   lastname: 'test', 
  //   email: 'test', 
  //   type: 'test', 
  //   imageUrl: 'test'
  // }

  message: Message = {
    id: 27364,
    userId: 49875239874, 
    type: 'incoming', 
    message: 'ciao tutttru'
  }

  contacts: Contact[] = [];

  constructor(private contactService: ContactServiceService, private messageService: MessageServiceService, private http:HttpClient) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  // metodi del contact-service

  getAllContacts(){
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
      console.log(this.contacts);
    });
  }

  getOneContact(){
    this.contactService.getContacts2(6).subscribe(data => {
      console.log(data);
    })
  }

  // updateContacts(){
  //   this.contactService.updateContact(this.contact)
  //       .subscribe(data =>{    
  //       });
  //   this.getAllContacts();
  // }

  // metodi del message-services

  getAllMessages(){
    this.messageService.getMessages().subscribe(data => {
      console.log(data);
    })
  }

  getOneAnswer(){
    this.messageService.getRandomMessage().subscribe(data => {
      console.log(data);
    })
  }

  addNewMessage(){
    this.messageService.addMessage(this.message)
      .subscribe(data => {
      })
    this.getAllMessages();
  }
  


}

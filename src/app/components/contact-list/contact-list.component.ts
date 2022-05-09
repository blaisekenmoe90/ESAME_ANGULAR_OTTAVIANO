import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ContactServiceService } from 'src/app/services/contactService/contact-service.service';
import { FormsModule } from '@angular/forms';
import { Contact } from 'src/app/interfaces/contact';
import { MessageServiceService } from 'src/app/services/messageService/message-service.service';
import { Message} from 'src/app/interfaces/message'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  message: Message = {
    id: 27364,
    userId: 49875239874, 
    type: 'incoming', 
    message: 'ciao tutttru'
  }

  contacts: Contact[] = [];
  @Input() id: number = Number(this.activatedRoute.snapshot.params['id']); // preleva il valore id dall'url e lo salva nella varabile id

  constructor(private contactService: ContactServiceService, private messageService: MessageServiceService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  // METODI DEL CONTACT SERVICE

  getAllContacts(){
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  // METODI DEL MESSAGE SERVICE

  getAllMessages(){
    this.messageService.getMessages().subscribe(data => {
    })
  }

  getOneAnswer(){
    this.messageService.getRandomMessage().subscribe(data => {
    })
  }

  addNewMessage(){
    this.messageService.addMessage(this.message)
      .subscribe(data => {
      })
    this.getAllMessages();
  }
  


}

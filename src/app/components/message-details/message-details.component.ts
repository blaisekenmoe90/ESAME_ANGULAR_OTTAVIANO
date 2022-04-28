import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContactServiceService } from 'src/app/services/contactService/contact-service.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { MessageServiceService } from 'src/app/services/messageService/message-service.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {

  contact!:Contact;
  @Input() id: string = this.activatedRoute.snapshot.params['userId']; // preleva il valore userId dall'url e lo salva nella varabile id

  constructor(
    private location: Location, 
    private activatedRoute: ActivatedRoute, 
    private contactService: ContactServiceService,
    private messageService: MessageServiceService,
    ) { }

  ngOnInit(): void {
    // ottiene tutti i contatti dal contact service 
    this.contactService.getContact(Number(this.id)).subscribe(data => {
      this.contact = data; // salva nella variabile contact i dati ritornati dal service 
      console.log(this.contact);
    })

    // ottiene tutti i messaggi dal message service
    this.messageService.getMessages().subscribe(data => {
      console.log(data);
    })
  }  

  // torna alla pagina precedente
  goBack():void{
    this.location.back();
  }
}

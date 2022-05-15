import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContactServiceService } from 'src/app/services/contactService/contact-service.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { MessageServiceService } from 'src/app/services/messageService/message-service.service';
import { Message } from 'src/app/interfaces/message';
import { Answer } from 'src/app/interfaces/answer';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {
  
  messageToAdd: string = "";
  messages:Message[] = [];
  contact!:Contact;
  @Input() id: number = Number(this.activatedRoute.snapshot.params['userId']); // preleva il valore userId dall'url, lo casta a number e lo salva nella varabile id

  constructor(
    private location: Location, 
    private activatedRoute: ActivatedRoute, 
    private contactService: ContactServiceService,
    private messageService: MessageServiceService,
    ) { }

  ngOnInit(): void {

    // ottiene tutti i contatti
    this.getContacts();

    // ottiene tutti i messaggi dal message service
    this.getMessages();

  }   // fine onInit


  // torna alla pagina precedente
  goBack():void{
    this.location.back();
  }

  // ottiene tutti i contatti dal contact service
  getContacts(){
    // ottiene tutti i contatti dal contact service 
    this.contactService.getContact(Number(this.id)).subscribe(data => {
      this.contact = data; // salva nella variabile contact i dati ritornati dal service 
      // console.log(this.contact);
    })
  }

  // ottiene tutti i messaggi dal message service e li filtra
  getMessages(){
  this.messageService.getMessages().subscribe(data => {
    // il filter prende in input data e ne ritorna solo il valore desiderato, in questo 
    // caso userId, questo viene poi assegnato alla variabile id
    this.messages = data.filter(data => data.userId == this.id); 
    for (let i = 0; i < this.messages.length; i++){
      this.messages[i].deleted = false;
    }
  })
  }
 
   add(text: string){
     // crea l'oggetto message da passare in input 
     let message : Message = {
       userId: this.id,
       type: 'outcoming',
       message: text,
       deleted: false,

        // cast dell'oggetto, è necessario perché nell'oggetto appena creato manca il parametro id , quindi normalmente non sarebbe possibile creare questo oggetto
     } as Message;

     
     // richiama il metodo addMessage del servizio 
     this.messageService.addMessage(message).subscribe(data=>{
       
      this.messages.push(message); // inserisco nell'array il nuovo messaggio

       this.messageService.getRandomMessage().subscribe(data2=>{
        let answer : Message = { // creo un oggetto di tipo Message
          type: 'incoming',
          userId: this.id,
          message: data2.answer,
          deleted: false,
        } as Message; // cast a Message
        this.messageService.addMessage(answer).subscribe(data3=>{})
         this.messages.push(answer); // inserisco nell'arrayla risposta
       })
     })
   }

   delete(message: Message){
    message.deleted = true;
    this.messageService.updateMessage(message).subscribe(data=>{
    })
    }

    searchAMessage(message: string):void {
      this.messageService.searchMessage(message).subscribe(response => {
        this.messages = response.filter(data => data.id == this.id);
      })
    }
}

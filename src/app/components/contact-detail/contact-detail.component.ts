import { Component, ContentChildren, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ActivatedRoute } from '@angular/router';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { ContactServiceService } from 'src/app/services/contactService/contact-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  contact!:Contact;  
    // preleva il valore id dall'url e lo salva nella varabile id
  id: number =  Number(this.activatedRoute.snapshot.params['id']);
  deleteContact?:any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService:ContactServiceService,
    private location: Location,
    ) { }
 
  ngOnInit(): void {
    if(this.id==0){
      this.contact = {
        id: this.id,
      } as Contact
    }
    else{
      this.contactService.getContact(this.id).subscribe(data => {
        this.contact = data; // salva nella variabile contact i dati ritornati dal service      
    })
    }
      
  }
  
  addNewContact(firstname:string, lastname:string, email:string, type:string){
    let newContact:Contact = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      type: type,
    }as Contact;
    this.contactService.addContact(newContact).subscribe(data=>{
      this.goBack();
    })
  }

  // torna alla pagina precedente
  goBack():void{
    this.location.back();
  }

  updateContactDetails() {
    // chiama la funzione updateContact() del contact service che aggiorna 
    // il contatto con i dati inseriti come parametri
    // in questo modo le modifiche rimangono anche in seguito al refresh della pagina
    this.contactService.updateContact(this.contact).subscribe(data => {
      this.goBack();
    })
  }

  deleteCurrentContact(id:number):void{this.contactService.deleteContact(id).subscribe(()=>{this.goBack()});
  }
}
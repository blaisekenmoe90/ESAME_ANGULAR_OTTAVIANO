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
  @Input() id: string = this.activatedRoute.snapshot.params['id']; // preleva il valore id dall'url e lo salva nella varabile id
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService:ContactServiceService,
    private location: Location,
    ) { }
 
  ngOnInit(): void {
    // chiama la funzione getContacts2 del contact service e fai il cast della variabile id
    // prima di passarla come parametro di getContacts2() 
    this.contactService.getContact(Number(this.id)).subscribe(data => {
      this.contact = data; // salva nella variabile contact i dati ritornati dal service 
      console.log(this.contact);
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
}
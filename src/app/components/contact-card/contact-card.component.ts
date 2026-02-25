import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/Contact.interface';


@Component({
    selector: 'app-contact-card',
    templateUrl: './contact-card.component.html',
    styleUrls: ['./contact-card.component.css'],
    imports: []
})
export class ContactCardComponent implements OnInit {

  @Input() contact: IContact;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  navigate() {
    // console.log('mas tocao');
    this.router.navigate([`/Contacto/${this.contact.id}`]);
  }

}

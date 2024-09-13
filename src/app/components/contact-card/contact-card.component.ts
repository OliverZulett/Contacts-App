import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/Contact.interface';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-contact-card',
    templateUrl: './contact-card.component.html',
    styleUrls: ['./contact-card.component.css'],
    standalone: true,
    imports: [NgIf]
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

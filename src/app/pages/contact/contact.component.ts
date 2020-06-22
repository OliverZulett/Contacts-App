import { Component, OnInit } from '@angular/core';
import { IContact } from '../../models/Contact.interface';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  id: Observable<string>;
  contact: IContact;
  contacts: IContact[];
  formContact: FormGroup;

  constructor( private router: ActivatedRoute ) {
    this.setId();
    this.loadContacts();
    this.loadContact();
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private setId() {
    this.id = this.router.params.pipe(map(p => p.id));
  }

  private loadContact(): void {
    this.id.subscribe( id => {
      this.contact = this.contacts.find( contact => contact.id === id);
      console.log(this.contact);
    });
  }

  private loadContacts() {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));
  }

  private buildForm(): void {
    this.formContact = new FormGroup({
      personalData: new FormGroup({
        firstName: new FormControl(
          this.contact.firstName,
          Validators.required
        )
      })
    });
  }

}

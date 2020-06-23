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

  updateContact(): void {
    // console.log(this.formContact);
    this.contact = {...this.contact, ...this.formContact.value.personalData};
    const index: number = this.contacts.findIndex( contact => contact.id === this.contact.id);
    this.contacts[index] = this.contact;
    this.saveContactsToLocalStorage();
    // console.log(this.contact);
    // console.log(this.contacts);
  }

  ngOnInit(): void {
  }

  private setId(): void {
    this.id = this.router.params.pipe(map(p => p.id));
  }

  private loadContact(): void {
    this.id.subscribe( id => {
      this.contact = this.contacts.find( contact => contact.id === id);
      console.log(this.contact);
    });
  }

  private loadContacts(): void {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));
  }

  private buildForm(): void {
    this.formContact = new FormGroup({
      personalData: new FormGroup({
        firstName: new FormControl(
          this.contact.firstName,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[A-Za-z]+')
          ]
        ),
        secondName: new FormControl(
          this.contact.secondName,
          [
            Validators.minLength(2),
            Validators.pattern('[A-Za-z]+')
          ]
        ),
        firstSurname: new FormControl(
          this.contact.firstSurname,
          [
            Validators.minLength(2),
            Validators.pattern('[A-Za-z]+')
          ]
        ),
        secondSurname: new FormControl(
          this.contact.secondSurname,
          [
            Validators.minLength(2),
            Validators.pattern('[A-Za-z]+')
          ]
        ),
        cellPhone: new FormControl(
          this.contact.cellPhone,
          [
            Validators.minLength(7),
            Validators.maxLength(8)
          ]
        ),
        email: new FormControl(
          this.contact.email,
          Validators.pattern('[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
        ),
        phone: new FormControl(
          this.contact.phone === 0 ? '' : this.contact.phone,
          [
            Validators.minLength(7),
            Validators.maxLength(8)
          ]
        ),
        adress: new FormControl(
          this.contact.adress
        )
      })
    });
  }

  private saveContactsToLocalStorage(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

}

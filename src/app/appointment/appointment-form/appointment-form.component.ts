import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validator } from './validators';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent implements OnInit {
  days = [
    {
      name: 'monday',
    },
    { name: 'tuesday' },
    { name: 'wednseday' },
    { name: 'thurseday' },
    { name: 'friday' },
    { name: 'saturday' },
    { name: 'sunday' },
  ];
  services: { name: string; image: string }[] = [
    {
      name: 'service-name',
      image: 'assets/service_1.webp',
    },
  ];
  seletedService = {
    image: '',
    name: '',
  };
  constructor(private Fb: FormBuilder) {}

  appointment = this.Fb.group({
    firstName: ['', [Validator.nameValidator, Validator.spaceValidator]],
    lastName: ['', [Validator.nameValidator, Validator.spaceValidator]],
    adress: ['', [Validator.nameValidator]],
    age: ['', []],
    day: ['', [Validator.dateTimeValidator]],
    services: [{ name: '', image: '' }, Validator.servicesValidator],
    phoneNumber: ['', [Validator.phoneNumberValidator]],
  });
  submit() {
    console.log(this.appointment.controls.day);
  }
  ngOnInit() {
    this.appointment.valueChanges.subscribe((change) => {
      // Update the errors object whenever the FormGroup changes
      this.seletedService = change.services
        ? change.services
        : { name: '', image: '' };
      this.updateErrors();
    });
  }

  updateErrors() {
    this.errors = {
      firstName: this.appointment.controls.firstName.errors,
      lastName: this.appointment.controls.lastName.errors,
      adress: this.appointment.controls.adress.errors,
      age: this.appointment.controls.age.errors,
      day: this.appointment.controls.day.errors,
      services: this.appointment.controls.services.errors,
      phoneNumber: this.appointment.controls.phoneNumber.errors,
    };
  }
  errors = {
    firstName: this.appointment.controls.firstName.errors,
    lastName: this.appointment.controls.lastName.errors,
    adress: this.appointment.controls.adress.errors,
    age: this.appointment.controls.age.errors,
    day: this.appointment.controls.day.errors,
    services: this.appointment.controls.services.errors,
    phoneNumber: this.appointment.controls.phoneNumber.errors,
  };
}

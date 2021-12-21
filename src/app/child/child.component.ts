import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/_helpers/must-match.validator'; 

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

   
   @Output() parentFunction: EventEmitter<any> = new EventEmitter();

  minDate = new Date();
  list:any []=[];
  registerForm: FormGroup;
    submitted = false
  constructor(private fb:FormBuilder) { 
    this.registerForm = this.fb.group({
      
      firstName: ['', [Validators.required, Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      Company: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      date: ['', Validators.required],
      Role: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
   
  
  }

  ngOnInit(): void {
    this.parentFunction.emit(this.list)
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      
      this.list.push(this.registerForm.value);
      console.log(this.registerForm.value);
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../common/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  //Khai báo các biến tương ứng với các trường dữ liệu trong form
  phoneNumber: string;
  password: string;
  reTypePassword: string;
  fullname: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor(private router: Router, private UserService: UserService) {
    this.phoneNumber = '';
    this.password = '';
    this.reTypePassword = '';
    this.fullname = '';
    this.address = '';
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }
  
  register() {
    const registerDTO: RegisterDTO = {
      "fullname": this.fullname,
      "phone_number": this.phoneNumber,
      "address": this.address,
      "password": this.password,
      "retype_password": this.reTypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }
    this.UserService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        console.log(response);
        this.router.navigate(['/login']);
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        alert(`can't register error: ${error.error}`)
      }
    })
  }
  //Tạo hàm kiểm tra password và reTypePassword
  checkPasswordsMatch() {
    if (this.password !== this.reTypePassword) {
      this.registerForm.form.controls[`reTypePassword`].setErrors({ 'passwordMismatch': true });
    } else {
      this.registerForm.form.controls[`reTypePassword`].setErrors(null);
    }
  }
  //Tạo hàm check tuổi 
  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth)
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
      } else {
        this.registerForm.form.controls[`dateOfBirth`].setErrors(null);
      }
    }
  }
}

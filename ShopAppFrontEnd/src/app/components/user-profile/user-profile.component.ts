import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../response/user/user.response';
import { TokenService } from '../../services/token.service';
import { UpdateUserDTO } from '../../common/update.user.dto';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  userResponse?: UserResponse;
  token: string = this.tokenService.getToken() ?? '';

  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private tokenService: TokenService,
    private datePipe: DatePipe) {
    this.userProfileForm = this.formBuilder.group({
      fullname: [''],
      address: [''],
      date_of_birth: [Date.now()],
    });
  }

  ngOnInit(): void {
    debugger
    this.userService.getUserDetail(this.token).subscribe({
      next: (response: any) => {
        debugger
        this.userResponse = {
          ... response
        }
        this.userProfileForm.patchValue({
          fullname: this.userResponse?.fullname ?? '',
          address: this.userResponse?.address ?? '',
          date_of_birth: this.datePipe.transform(this.userResponse?.date_of_birth, 'yyyy-MM-dd')
        })
        this.userService.saveUserToLocalStorage(this.userResponse);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    })
  }

  save(): void{
    debugger
    if(this.userProfileForm.valid){
      const updateUserDTO: UpdateUserDTO = {
        fullname: this.userProfileForm.get('fullname')?.value,
        address: this.userProfileForm.get('address')?.value,
        date_of_birth: this.userProfileForm.get('date_of_birth')?.value,
      }
      this.userService.updateUserDetail(this.token, updateUserDTO).subscribe({
        next: (response: any) => {
          this.userService.removeUserFromLocalStorage();
          this.tokenService.removeToken();
          this.router.navigate(['/login'])
        },
        error: (error:any) => {
          alert(error.error.message)
        }
      })
    }
  }
}

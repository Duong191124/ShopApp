import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginDTO } from '../../common/login.dto';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../response/user/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../common/role';
import { UserResponse } from '../../response/user/user.response';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '';
  password: string = '';

  roles: Role[] = []; //mảng roles
  rememberMe: boolean = true;
  selectedRole: Role | undefined; //Biến để lưu giá trị được chọn từ dropdown
  userResponse?: UserResponse

  constructor(private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    //Gọi api lấy danh sách roles và lưu vào biến roles
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        //Sử dụng kiểu Role[]
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger
        console.log('error getting roles', error);
      }
    });
  }

  login() {
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    }

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        const { token } = response;
        if(this.rememberMe){
          this.tokenService.setItem(token);
          this.userService.getUserDetail(token).subscribe({
            next: (userResponses: any) => {
              debugger
              this.userResponse = {
                ...userResponses
              };
              this.userService.saveUserToLocalStorage(this.userResponse);
              if(this.userResponse?.role.name == 'admin'){
                this.router.navigate(['admin']);
              }else if(this.userResponse?.role.name == 'user'){
                this.router.navigate(['/']);
              }
            },
            complete: () => {
              debugger
            },
            error: (error: any) => {
              debugger
              console.error("Error: ", error);
            }
          })
        }
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger
        console.error('Login error:', error);
        alert(error?.error?.message);
      }
    });
  }
}

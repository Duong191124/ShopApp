import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../response/user/user.response';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  userResponse?: UserResponse | null

  constructor(private tokenService: TokenService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserFromLocalStorage();
  }
  logout(): void {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserFromLocalStorage();
    this.router.navigate(['/'])
  }
  
  showAdminComponent(componentName: string): void {
    debugger
    if (componentName === 'orders') {
      this.router.navigate(['/admin/orders']);
    } else if (componentName === 'categories') {
      this.router.navigate(['/admin/categories']);
    } else if (componentName === 'products') {
      this.router.navigate(['/admin/products']);
    } else if (componentName === 'users') {
      this.router.navigate(['/admin/users']);
    }
  }
}

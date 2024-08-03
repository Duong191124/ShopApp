import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../response/user/user.response';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse
  isLogin: boolean = false;
  activeNavItem: number = 0;

  constructor(private userService: UserService, private tokenService: TokenService){}

  ngOnInit(): void {
    this.userResponse = this.userService.getUserFromLocalStorage();
    if(this.userResponse != null){
      this.isLogin = true;
    }
  }

  logout(): void{
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.isLogin = false;
    this.userResponse = this.userService.getUserFromLocalStorage();
  }

  setActiveNavItem(index: number){
    this.activeNavItem = index;
  }
}

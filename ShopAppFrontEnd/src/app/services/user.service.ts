import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../common/register.dto';
import { LoginDTO } from '../common/login.dto';
import { enviroment } from '../enviroment/enviroment';
import { LoginResponse } from '../response/user/login.response';
import { UserResponse } from '../response/user/user.response';
import { UpdateUserDTO } from '../common/update.user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${enviroment.apiBaseUrl}/users/register`;
  private apiLogin = `${enviroment.apiBaseUrl}/users/login`;
  private apiuserDetail = `${enviroment.apiBaseUrl}/users/details`;
  private apiConfig = {
    headers: this.createHeaders()
  }
  
  private createHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  register(registerDTO: RegisterDTO):Observable<any>{
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig)
  }

  login(loginDTO: LoginDTO):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.apiLogin, loginDTO, this.apiConfig);
  }

  getUserDetail(token: string){
    return this.http.post(this.apiuserDetail, {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  updateUserDetail(token: string, updateUserDTO: UpdateUserDTO){
    debugger
    let userResponse = this.getUserFromLocalStorage();
    return this.http.put(`${this.apiuserDetail}/${userResponse?.id}`, updateUserDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  saveUserToLocalStorage(userResponse?: UserResponse){
    try {
      if(userResponse == null || !userResponse){
        return;
      }
      const userResponseJSON = JSON.stringify(userResponse);
      localStorage.setItem('user', userResponseJSON);
      console.log("ok");
    } catch (error) {
      console.log("error", error);
    }
  }

  getUserFromLocalStorage(userResponse?: UserResponse){
    try {
      const userResponseconvert = localStorage.getItem('user');
      const userResponse = JSON.parse(userResponseconvert!);
      return userResponse;
    } catch (error) {
      console.log("error", error);
    }
  }

  removeUserFromLocalStorage(): void{
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.log(error);
    }
  }

  getUsers(params: { page: number, limit: number, keyword: string }): Observable<any> {
    const url = `${enviroment.apiBaseUrl}/users`;
    return this.http.get<any>(url, { params: params });
  }

  resetPassword(userId: number): Observable<any> {
    const url = `${enviroment.apiBaseUrl}/users/reset-password/${userId}`;
    return this.http.put<any>(url, null, this.apiConfig);
  }

  toggleUserStatus(params: { userId: number, enable: boolean }): Observable<any> {
    const url = `${enviroment.apiBaseUrl}/users/block/${params.userId}/${params.enable ? '1' : '0'}`;
    return this.http.put<any>(url, null, this.apiConfig);
  }
}

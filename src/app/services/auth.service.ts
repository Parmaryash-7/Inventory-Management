import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  public auth_token_glob = '';
  private base_url = environment.API_URL;
  private isAuthenticated = false;
  private userEmail: string | null = null;

  private getHttpOptions(contentType:any='application/json', auth_token: any) {
    this.auth_token_glob = auth_token;
    if(this.auth_token_glob){
      return { headers: { "Content-Type": contentType, "auth_token": this.auth_token_glob},};
    }
    return { headers: { "Content-Type": contentType}};
  }


  login(email: string, password: string) {
    const apiUrl = `${this.base_url}/login`;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post(apiUrl, formData);
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userEmail = null;
    localStorage.removeItem("auth");
    localStorage.removeItem("userEmail");
    this.auth_token_glob = null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("auth") === "true";
  }

  getUserEmail(): string | null {
    return localStorage.getItem("userEmail");
  }
}

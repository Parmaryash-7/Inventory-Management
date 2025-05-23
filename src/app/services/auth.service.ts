import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  private isAuthenticated = false;
  private userEmail: string | null = null;

  login(email: string, password: string): boolean {
    if (email === "yash@gmail.com" && password === "123") {
      this.isAuthenticated = true;
      this.userEmail = email;
      localStorage.setItem("auth", "true");
      localStorage.setItem("userEmail", email);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userEmail = null;
    localStorage.removeItem("auth");
    localStorage.removeItem("userEmail");
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("auth") === "true";
  }

  getUserEmail(): string | null {
    return localStorage.getItem("userEmail");
  }
}

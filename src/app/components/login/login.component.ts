import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  errorMessage = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(loginForm: NgForm): void {
    this.errorMessage = "";

    if (!loginForm.valid) {
      // Mark all controls as touched to show validation errors on submit
      Object.values(loginForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return; // Stop if form invalid
    }

    const isLoggedIn = this.authService.login(this.email, this.password);

    if (isLoggedIn) {
      this.router.navigate(["/admin"]);
    } else {
      this.errorMessage = "Invalid credentials.";
    }
  }

  onInputChange() {
    this.errorMessage = ""; // clear error message on input change
  }
}

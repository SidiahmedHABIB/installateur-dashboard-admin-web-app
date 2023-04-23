import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminModel } from 'src/app/models/admin.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  AdminFromGroup!: FormGroup;
  errorMessage!: string;
  theAdmin!: AdminModel
  Admin!: AdminModel


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,) { }

  ngOnInit(): void {
    this.AdminFromGroup = this.fb.group({
      id: this.fb.control(1),
      name: this.fb.control("dd"),
      email: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      datetime: this.fb.control(new Date()),
    })
  }
  handleLogin() {
    this.Admin = this.AdminFromGroup.value;
    console.log(this.AdminFromGroup.value)
    this.authService.login(this.Admin.email, this.Admin.password).subscribe({
      next: (admin: AdminModel) => {
        this.theAdmin = admin;
        if (!this.theAdmin) {
          return alert("User not found");
        }
        console.log(this.theAdmin)
        this.authService.authenticateAdmin(this.theAdmin).subscribe({
          next: (data: boolean) => {
            this.router.navigateByUrl("/admin/dashboard");
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }


}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageUsersModel, UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users!: UserModel[];
  addUser!: FormGroup;
  editUser!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 4;
  totalPages: number = 0;
  errorMessage: any = "";
  currentAction: string = "all";
  addUserValue!: UserModel;
  editUserValue!: UserModel;

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.handleGetPageAllUsers();
    this.addUser = this.fb.group({
      id: this.fb.control(null),
      firstName: this.fb.control(null, [Validators.required]),
      lastName: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      creatAt: this.fb.control(new Date()),
      updateAt: this.fb.control(new Date())
    });
    this.editUser = this.fb.group({
      id: this.fb.control(1),
      firstName: this.fb.control(null, [Validators.required]),
      lastName: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      creatAt: this.fb.control(new Date()),
      updateAt: this.fb.control(new Date())
    });

  }
  handlOpenEditUser(index: number) {
    this.editUserValue = this.users[index];
    this.editUser = this.fb.group({
      id: this.fb.control(this.editUserValue.id),
      firstName: this.fb.control(this.editUserValue.firstName, [Validators.required]),
      lastName: this.fb.control(this.editUserValue.lastName, [Validators.required]),
      email: this.fb.control(this.editUserValue.email, [Validators.required]),
      password: this.fb.control(this.editUserValue.password, [Validators.required]),
      creatAt: this.fb.control(this.editUserValue.creatAt),
      updateAt: this.fb.control(new Date()),
      imageUser: this.fb.control(this.editUserValue.imageUser)
    });
  }
  handleEditUser() {
    this.editUserValue = this.editUser.value;
    console.log(this.editUserValue);
    this.userService.updateUser(this.editUserValue).subscribe({
      next: (data: UserModel) => {
        alert("updated successfully");
        console.log(data);
        this.handleGetPageAllUsers();
        this.editUser.reset()
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }
  handleCreateUser() {
    this.addUserValue = this.addUser.value;
    console.log(this.addUserValue);
    this.userService.addUser(this.addUserValue).subscribe({
      next: (data: UserModel) => {
        alert("add successfully");
        console.log(data);
        this.handleGetPageAllUsers();
        this.addUser.reset()
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }

  handleGetPageAllUsers() {
    this.userService.getPageUsers(this.currentPage, this.pageSize).subscribe({
      next: (data: PageUsersModel) => {
        this.users = data.users;
        this.totalPages = data.totalPages
        console.log(this.totalPages)
        console.log(this.users[0].lastName);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.errorMessage = error.message;
      }
    });
  }


  handleDeleteUser(uId: number) {
    let conf = confirm("Are u sure ?");
    if (conf == false) return;
    this.userService.deleteUser(uId).subscribe({
      next: (data: boolean) => {
        if (data === true) {
          alert("Deleted successfully");
          this.handleGetPageAllUsers();
        }
        else {
          this.handleGetPageAllUsers();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }

  handlegoToNextPage(index: number) {
    this.currentPage = index;
    if (this.currentAction === "all") {
      this.handleGetPageAllUsers();

    } else {
      this.handleGetPageAllUsers();
    }
  }

  handleGoToUserDetails(u: UserModel) {
    this.router.navigateByUrl("/admin/user-details/" + u.id);
  }


}

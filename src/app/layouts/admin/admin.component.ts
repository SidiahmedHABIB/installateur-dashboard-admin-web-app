import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminModel, PageAdminModel } from 'src/app/models/admin.model';
import { UserModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admins!: AdminModel[];
  addAdmin!: FormGroup;
  editAdmin!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 4;
  totalPages: number = 0;
  errorMessage: any = "";
  currentAction: string = "all";
  addAdminValue!: AdminModel;
  editAdminValue!: AdminModel;

  constructor(private fb: FormBuilder, private adminService: AdminService) { }
  ngOnInit(): void {
    this.handleGetPageAllAdmins();
    this.addAdmin = this.fb.group({
      id: this.fb.control(null),
      firstName: this.fb.control(null, [Validators.required]),
      lastName: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      creatAt: this.fb.control(new Date()),
      updateAt: this.fb.control(new Date())
    });
    this.editAdmin = this.fb.group({
      id: this.fb.control(1),
      firstName: this.fb.control(null, [Validators.required]),
      lastName: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      creatAt: this.fb.control(new Date()),
      updateAt: this.fb.control(new Date())
    });

  }
  handlOpenEditAdmin(index: number) {
    this.editAdminValue = this.admins[index];
    this.editAdmin = this.fb.group({
      id: this.fb.control(this.editAdminValue.id),
      firstName: this.fb.control(this.editAdminValue.firstName, [Validators.required]),
      lastName: this.fb.control(this.editAdminValue.lastName, [Validators.required]),
      email: this.fb.control(this.editAdminValue.email, [Validators.required]),
      password: this.fb.control(this.editAdminValue.password, [Validators.required]),
      creatAt: this.fb.control(this.editAdminValue.creatAt),
      updateAt: this.fb.control(new Date()),
    });
  }
  handleEditAdmin() {
    this.editAdminValue = this.editAdmin.value;
    console.log(this.editAdminValue);
    this.adminService.updateAdmin(this.editAdminValue).subscribe({
      next: (data: AdminModel) => {
        alert("updated successfully");
        console.log(data);
        this.handleGetPageAllAdmins();
        this.editAdmin.reset()
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }
  handleCreateAdmin() {
    this.addAdminValue = this.addAdmin.value;
    console.log(this.addAdminValue);
    this.adminService.addAdmin(this.addAdminValue).subscribe({
      next: (data: boolean) => {
        if (data === true) {
          alert("Admin add successfully ");
          this.addAdmin.reset()
          this.handleGetPageAllAdmins();
        }
        else {
          alert("Error: email is already taken!");
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }

  handleGetPageAllAdmins() {
    this.adminService.getPageAdmins(this.currentPage, this.pageSize).subscribe({
      next: (data: PageAdminModel) => {
        this.admins = data.admins;
        this.totalPages = data.totalPages
        console.log(this.totalPages)
        console.log(this.admins[0].lastName);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.errorMessage = error.message;
      }
    });
  }


  handleDeleteAdmin(uId: number) {
    let conf = confirm("Are u sure ?");
    if (conf == false) return;
    this.adminService.deleteAdmin(uId).subscribe({
      next: (data: boolean) => {
        if (data === true) {
          alert("Deleted successfully");
          this.handleGetPageAllAdmins();
        }
        else {
          this.handleGetPageAllAdmins();
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
      this.handleGetPageAllAdmins();

    } else {
      this.handleGetPageAllAdmins();
    }
  }
}

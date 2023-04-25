import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyModel, PageCompanyModel } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies!: CompanyModel[];
  addCompany!: FormGroup;
  editCompany!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 4;
  totalPages: number = 0;
  errorMessage: any = "";
  currentAction: string = "all";
  addCompanyValue!: CompanyModel;
  editCompanyValue!: CompanyModel;
  base64_1: any = '';

  constructor(private fb: FormBuilder, private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.handleGetPageAllCompanies();
    this.addCompany = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required]),
      location: this.fb.control(null, [Validators.required]),
      phone: this.fb.control(null, [Validators.required]),
      imageCompany: this.fb.control(null),
      creatAt: this.fb.control(new Date()),
      updateAt: this.fb.control(new Date())
    });
    this.editCompany = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required]),
      location: this.fb.control(null, [Validators.required]),
      phone: this.fb.control(null, [Validators.required]),
      imageCompany: this.fb.control(null),
      creatAt: this.fb.control(new Date()),
      updateAt: this.fb.control(new Date())
    });
  }

  handleEditCompany() {
    this.editCompanyValue = this.editCompany.value;
    console.log(this.editCompanyValue);
    this.companyService.updateCompany(this.editCompanyValue).subscribe({
      next: (data: CompanyModel) => {
        alert("updated successfully");
        console.log(data);
        this.handleGetPageAllCompanies();
        this.editCompany.reset()
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }
  handlOpenEditCompany(index: number) {
    this.editCompanyValue = this.companies[index];
    this.editCompany = this.fb.group({
      id: this.fb.control(this.editCompanyValue.id),
      name: this.fb.control(this.editCompanyValue.name, [Validators.required]),
      email: this.fb.control(this.editCompanyValue.email, [Validators.required]),
      location: this.fb.control(this.editCompanyValue.location, [Validators.required]),
      phone: this.fb.control(this.editCompanyValue.phone, [Validators.required]),
      imageCompany: this.fb.control(this.editCompanyValue.imageCompany),
      creatAt: this.fb.control(this.editCompanyValue.creatAt),
      updateAt: this.fb.control(new Date())
    });
  }

  handleCreateCompany() {
    this.addCompanyValue = this.addCompany.value;
    console.log(this.addCompany.value);
    this.companyService.addCompany(this.addCompanyValue).subscribe({
      next: (data: CompanyModel) => {
        alert("add Company successfully");
        console.log(data);
        this.handleGetPageAllCompanies();
        this.addCompany.reset()
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }
  handleGetPageAllCompanies() {
    this.companyService.getPageAllCompanies(this.currentPage, this.pageSize).subscribe({
      next: (data: PageCompanyModel) => {
        this.companies = data.companies;
        this.totalPages = data.totalPages
        console.log(this.totalPages)
        console.log(this.companies[0].name);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.errorMessage = error.message;
      }
    });
  }
  handlegoToNextPage(index: number) {
    this.currentPage = index;
    if (this.currentAction === "all") {
      this.handleGetPageAllCompanies();

    } else {
      this.handleGetPageAllCompanies();
    }
  }
  handleGoToCompanyDetails(c: CompanyModel) {
    this.router.navigateByUrl("/admin/company-details/" + c.id);
  }

  getImagePath1(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64_1 = reader.result;
    }
  }
  handleDeleteCompany(companyId: number) {
    let conf = confirm("Are you sure ?");
    if (conf == false) return;
    this.companyService.deleteCompany(companyId).subscribe({
      next: (data: boolean) => {
        if (data === true) {
          alert("Deleted successfully");
          this.handleGetPageAllCompanies();
        }
        else {
          this.handleGetPageAllCompanies();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }
}

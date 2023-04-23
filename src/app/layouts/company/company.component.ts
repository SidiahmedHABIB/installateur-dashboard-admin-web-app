import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  pageSize: number = 2;
  totalPages: number = 0;
  errorMessage: any = "";
  currentAction: string = "all";
  addCompanyValue!: CompanyModel;
  editCompanyValue!: CompanyModel;

  constructor(private fb: FormBuilder, private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.handleGetPageAllCompanies();
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


}

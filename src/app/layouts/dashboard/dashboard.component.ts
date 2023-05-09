import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoxModel } from 'src/app/models/box.model';
import { CompanyModel } from 'src/app/models/company.model';
import { InterModel, PageInterModel } from 'src/app/models/inter.model';
import { UserModel } from 'src/app/models/user.model';
import { BoxService } from 'src/app/services/box/box.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { InterService } from 'src/app/services/inter/inter.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  boxes!: BoxModel[];
  totalBoxes!: number;
  technicians!: UserModel[];
  totalTechnicians!: number;
  companies!: CompanyModel[];
  totalCompanies!: number;
  errorMessage: any = "";
  currentAction: string = "all";
  intervations!: InterModel[];
  totalPages: number = 0;
  pageSize: number = 4;
  currentPage: number = 0;

  constructor(private router: Router,
    private boxService: BoxService,
    private companyService: CompanyService,
    private userService: UsersService,
    private interService: InterService,
  ) { }

  ngOnInit(): void {
    this.handleGetAllBoxes();
    this.handleGetAllCompanies();
    this.handleGetAllUsers();
    this.handleGetPageInters();
  }
  handleGetPageInters() {
    this.interService.getPageIntersByStatus("ONHOLD", this.currentPage, this.pageSize).subscribe({
      next: (data: PageInterModel) => {
        this.intervations = data.interventions;
        this.totalPages = data.totalPages
        console.log("total:" + this.totalPages)
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
      this.handleGetPageInters();

    } else {
      this.handleGetPageInters();
    }
  }

  handleGetAllBoxes() {
    this.boxService.getAllBoxes().subscribe({
      next: (data: BoxModel[]) => {
        this.boxes = data;
        this.totalBoxes = data.length;
        console.log("total Box " + this.totalBoxes)
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.errorMessage = error.message;
      }
    });
  }
  handleGetAllCompanies() {
    this.companyService.getAllCompanies().subscribe({
      next: (data: CompanyModel[]) => {
        this.companies = data;
        this.totalCompanies = data.length;
        console.log("total Companies " + this.totalCompanies)
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.errorMessage = error.message;
      }
    });
  }
  handleGetAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data: UserModel[]) => {
        this.technicians = data;
        this.totalTechnicians = data.length;
        console.log("total Companies " + this.totalTechnicians)
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.errorMessage = error.message;
      }
    });
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    // this.dashboardService.disconnect();
  }
  handleGoToUserDetails(u: UserModel) {
    this.router.navigateByUrl("/admin/user-details/" + u.id);
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoxModel, PageBoxModel } from 'src/app/models/box.model';
import { CompanyModel } from 'src/app/models/company.model';
import { BoxService } from 'src/app/services/box/box.service';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  boxes!: BoxModel[];
  companyId!: number;
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  errorMessage: any = "";
  currentAction: string = "all";


  constructor(private companyService: CompanyService, private route: ActivatedRoute, private boxService: BoxService) {
    this.companyId = this.route.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.handleGetPageAllBoxesByCompany();
  }

  handleGetPageAllBoxesByCompany() {
    this.boxService.getPageAllBoxesByCompany(this.companyId, this.currentPage, this.pageSize).subscribe({
      next: (data: PageBoxModel) => {
        this.boxes = data.boxes;
        this.totalPages = data.totalPages
        console.log(this.totalPages)
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
      this.handleGetPageAllBoxesByCompany();

    } else {
      this.handleGetPageAllBoxesByCompany();
    }
  }


}

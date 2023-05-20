import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyModel } from 'src/app/models/company.model';
import { InterModel, PageInterModel } from 'src/app/models/inter.model';
import { BoxService } from 'src/app/services/box/box.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { InterService } from 'src/app/services/inter/inter.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  companyInters!: InterModel[];
  addBox!: FormGroup;
  editBox!: FormGroup;
  addInter!: FormGroup;
  editInter!: FormGroup;
  companyId!: number;
  company!: CompanyModel;
  currentPageBox: number = 0;
  currentPageInter: number = 0;
  pageSize: number = 5;
  totalPagesBox: number = 0;
  totalPagesInter: number = 0;
  errorMessage: any = "";
  currentAction: string = "all";
  showComment!: string;
  addInterValue!: InterModel;
  editInterValue!: InterModel;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private boxService: BoxService, private companyService: CompanyService, private interService: InterService, private router: Router) {
    this.companyId = this.route.snapshot.params['id'];

  }


  ngOnInit(): void {
    this.handleGetCompanyById();
    this.handleGetPageCompanyInters();
    this.addInter = this.fb.group({
      id: this.fb.control(null),
      comment: this.fb.control(null, [Validators.required]),
      appointmentAt: this.fb.control(null),
      user: this.fb.control(null),
      creatAt: this.fb.control(new Date()),
      updateAt: this.fb.control(new Date()),
      status: this.fb.control("TOPLAN"),
    });
    this.editInter = this.fb.group({
      id: this.fb.control(null),
      comment: this.fb.control(null, [Validators.required]),
      appointmentAt: this.fb.control(null),
      user: this.fb.control(null),
      creatAt: this.fb.control(new Date()),
      updateAt: this.fb.control(new Date()),
      status: this.fb.control(null),
    });
  }

  handleGoToInterDetails(c: InterModel) {
    this.router.navigateByUrl("/admin/inter-details/" + c.id);
  }

  handleEditInter() {
    this.editInterValue = this.editInter.value;
    console.log(this.editInter);
    this.interService.updateIntervention(this.editInterValue, this.companyId).subscribe({
      next: (data: InterModel) => {
        alert("Updated Intervention successfully");
        console.log(data);
        this.handleGetPageCompanyInters();
        this.editInter.reset()
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }
  handlOpenEditInter(index: number) {
    this.editInterValue = this.companyInters[index];
    console.log("object: " + this.editInterValue.comment);
    this.editInter = this.fb.group({
      id: this.fb.control(this.editInterValue.id),
      comment: this.fb.control(this.companyInters[index].comment, [Validators.required]),
      appointmentAt: this.fb.control(this.editInterValue.appointmentAt),
      user: this.fb.control(this.editInterValue.user),
      creatAt: this.fb.control(this.editInterValue.creatAt),
      updateAt: this.fb.control(new Date()),
      status: this.fb.control(this.editInterValue.status),

    });
    console.log(this.editInter);
  }
  handleCreateInter() {
    this.handleGetCompanyById();
    this.addInterValue = this.addInter.value;
    console.log(this.addBox);
    this.interService.addIntervention(this.addInterValue, this.companyId).subscribe({
      next: (data: InterModel) => {
        alert("Add Intervention successfully");
        console.log(data);
        this.handleGetPageCompanyInters();
        this.addInter.reset()
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }
  handleGetPageCompanyInters() {
    this.interService.getPageHaveIntersByCompany(this.companyId, this.currentPageInter, this.pageSize).subscribe({
      next: (data: PageInterModel) => {
        this.companyInters = data.interventions;
        this.totalPagesInter = data.totalPages
        console.log("total inters :" + this.totalPagesInter)
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.errorMessage = error.message;
      }
    });
  }
  handlegoToNextPageInters(index: number) {
    this.currentPageInter = index;
    if (this.currentAction === "all") {
      this.handleGetPageCompanyInters();

    } else {
      this.handleGetPageCompanyInters();
    }
  }
  handleDeleteInter(interId: number) {
    let conf = confirm("Are you sure ?");
    if (conf == false) return;
    this.interService.deleteIntervention(interId).subscribe({
      next: (data: boolean) => {
        if (data === true) {
          alert("Deleted successfully");
          this.handleGetPageCompanyInters();
        }
        else {
          this.handleGetPageCompanyInters();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }
  handlOpenShowInterComment(index: number) {
    this.showComment = "";
    this.showComment = this.companyInters[index].comment
  }
  ///
  handleGetCompanyById() {
    this.companyService.getCompanyById(this.companyId).subscribe({
      next: (data: CompanyModel) => {
        this.company = data;
        console.log(this.company.name);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.errorMessage = error.message;
      }
    });
  }



}

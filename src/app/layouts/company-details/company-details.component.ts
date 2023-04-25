import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentMirror, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BoxModel, PageBoxModel } from 'src/app/models/box.model';
import { CompanyModel } from 'src/app/models/company.model';
import { ImageModel, PageImageModel } from 'src/app/models/image.model';
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
  boxes!: BoxModel[];
  companyInters!: InterModel[];
  boxImages: ImageModel[] = [];
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
  addBoxValue!: BoxModel;
  editBoxValue!: BoxModel;
  addInterValue!: InterModel;
  editInterValue!: InterModel;



  constructor(private fb: FormBuilder, private route: ActivatedRoute, private boxService: BoxService, private companyService: CompanyService, private interService: InterService) {
    this.companyId = this.route.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.handleGetPageAllBoxesByCompany();
    this.handleGetCompanyById();
    this.handleGetPageCompanyInters();
    this.addBox = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, [Validators.required]),
      entity: this.fb.control(null, [Validators.required]),
      nserie: this.fb.control(null, [Validators.required]),
      creatAt: this.fb.control(new Date()),
      updateAt: this.fb.control(new Date()),
      status: this.fb.control("NOTINSTALLED"),
      matricul: this.fb.control(null),
      boxValue: this.fb.control(null),
      isSend: this.fb.control(null),
      reportBox: this.fb.control(null),
    });
    this.editBox = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, [Validators.required]),
      status: this.fb.control(null, [Validators.required]),
      entity: this.fb.control(null, [Validators.required]),
      nserie: this.fb.control(null, [Validators.required]),
      creatAt: this.fb.control(new Date()),
      updateAt: this.fb.control(new Date()),
      matricul: this.fb.control(null),
      boxValue: this.fb.control(null),
      isSend: this.fb.control(null),
      reportBox: this.fb.control(null),
    });
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

  // box method
  handleEditBox() {
    this.editBoxValue = this.editBox.value;
    this.editBoxValue.componyBox = this.company;
    console.log(this.editBoxValue.componyBox.name);
    this.boxService.updateBox(this.editBoxValue, this.companyId).subscribe({
      next: (data: BoxModel) => {
        alert("updated successfully");
        console.log(data);
        this.handleGetPageAllBoxesByCompany();
        this.editBox.reset()
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }
  handlOpenEditBox(index: number) {
    this.editBoxValue = this.boxes[index];
    this.editBox = this.fb.group({
      id: this.fb.control(this.editBoxValue.id),
      name: this.fb.control(this.editBoxValue.name, [Validators.required]),
      status: this.fb.control(this.editBoxValue.status, [Validators.required]),
      entity: this.fb.control(this.editBoxValue.entity, [Validators.required]),
      nserie: this.fb.control(this.editBoxValue.nserie, [Validators.required]),
      creatAt: this.fb.control(this.editBoxValue.creatAt),
      updateAt: this.fb.control(new Date()),
      matricul: this.fb.control(this.editBoxValue.matricul),
      boxValue: this.fb.control(this.editBoxValue.boxValue),
      isSend: this.fb.control(this.editBoxValue.isSend),
      reportBox: this.fb.control(this.editBoxValue.reportBox),
    });
  }

  handleCreateBox() {
    this.handleGetCompanyById();
    this.addBoxValue = this.addBox.value;
    console.log(this.addBox);
    this.boxService.addBox(this.addBoxValue, this.companyId).subscribe({
      next: (data: BoxModel) => {
        alert("add box successfully");
        console.log(data);
        this.handleGetPageAllBoxesByCompany();
        this.addBox.reset()
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }

  handleGetPageAllBoxesByCompany() {
    this.boxService.getPageAllBoxesByCompany(this.companyId, this.currentPageBox, this.pageSize).subscribe({
      next: (data: PageBoxModel) => {
        this.boxes = data.boxes;
        this.totalPagesBox = data.totalPages
        console.log(this.totalPagesBox)
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.errorMessage = error.message;
      }
    });
  }
  handlegoToNextPageBox(index: number) {
    this.currentPageBox = index;
    if (this.currentAction === "all") {
      this.handleGetPageAllBoxesByCompany();

    } else {
      this.handleGetPageAllBoxesByCompany();
    }
  }
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
  handleDeleteBox(boxId: number) {
    let conf = confirm("Are you sure ?");
    if (conf == false) return;
    this.boxService.deleteBox(boxId).subscribe({
      next: (data: boolean) => {
        if (data === true) {
          alert("Deleted successfully");
          this.handleGetPageAllBoxesByCompany();
        }
        else {
          this.handleGetPageAllBoxesByCompany();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }
  handleGetBoxImages(boxId: number) {
    this.boxService.getBoxImages(boxId).subscribe({
      next: (data: PageImageModel) => {
        this.boxImages = data.images;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }



}

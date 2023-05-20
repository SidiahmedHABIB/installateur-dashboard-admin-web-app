import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BoxModel, PageBoxModel } from 'src/app/models/box.model';
import { CompanyModel } from 'src/app/models/company.model';
import { ImageModel, PageImageModel } from 'src/app/models/image.model';
import { BoxService } from 'src/app/services/box/box.service';

@Component({
  selector: 'app-intervention-details',
  templateUrl: './intervention-details.component.html',
  styleUrls: ['./intervention-details.component.css']
})
export class InterventionDetailsComponent implements OnInit {
  interId!: number;
  boxes!: BoxModel[];
  boxImages: ImageModel[] = [];
  addBox!: FormGroup;
  editBox!: FormGroup;
  currentPageBox: number = 0;
  pageSize: number = 5;
  totalPagesBox: number = 0;
  errorMessage: any = "";
  currentAction: string = "all";
  addBoxValue!: BoxModel;
  editBoxValue!: BoxModel;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private boxService: BoxService,) {
    this.interId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.handleGetPageAllBoxesByCompany();
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
      isSend: this.fb.control(false),
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
  }
  // box method
  handleEditBox() {
    this.editBoxValue = this.editBox.value;
    console.log(this.editBoxValue.interventionBox.comment);
    this.boxService.updateBox(this.editBoxValue, this.interId).subscribe({
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
    this.addBoxValue = this.addBox.value;
    console.log(this.addBox);
    this.boxService.addBox(this.addBoxValue, this.interId).subscribe({
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
    this.boxService.getPageAllBoxesByCompany(this.interId, this.currentPageBox, this.pageSize).subscribe({
      next: (data: PageBoxModel) => {
        this.boxes = data.boxes;
        this.totalPagesBox = data.totalPages
        console.log("total Box Pages" + this.totalPagesBox)
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

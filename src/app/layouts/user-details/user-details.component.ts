import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterModel, PageInterModel } from 'src/app/models/inter.model';
import { InterService } from 'src/app/services/inter/inter.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId!: number;
  currentPage: number = 0;
  pageSize: number = 4;
  totalPages: number = 0;
  errorMessage: any = "";
  currentAction: string = "all";
  showComment: string = "";
  userInter!: InterModel[];
  intervention!: InterModel;


  constructor(private userService: UsersService, private route: ActivatedRoute, private interService: InterService) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.handleGetPageUserInters();
  }
  handleGetPageUserInters() {
    this.interService.getPageHaveUserInters(this.userId, this.currentPage, this.pageSize).subscribe({
      next: (data: PageInterModel) => {
        this.userInter = data.interventions;
        this.totalPages = data.totalPages
        console.log("total:" + this.totalPages)
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.errorMessage = error.message;
      }
    });
  }
  handlEditPlanedInder(index: number) {
    this.intervention = this.userInter[index];
    this.intervention.status = "PLANNED"
    this.interService.plannedIntervention(this.intervention).subscribe({
      next: (data: InterModel) => {
        alert("Planned successfully");
        console.log(data);
        this.handleGetPageUserInters();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }

  handlOpenShowInterComment(index: number) {
    this.showComment = "";
    this.intervention = this.userInter[index];
    this.showComment = this.intervention.comment
  }


  handlegoToNextPage(index: number) {
    this.currentPage = index;
    if (this.currentAction === "all") {
      this.handleGetPageUserInters();

    } else {
      this.handleGetPageUserInters();
    }
  }


}

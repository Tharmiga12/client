import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonService } from "./../common.service";
import { ServerModule } from "@angular/platform-server";
import { User } from "../user.model";
import { Subject } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {
  @Input()
  fromParent: User = {
    userName: "",
    email: "",
    _id: ""
  };

  userAdded = new Subject();

  @Output() sendToParent = new EventEmitter();

  constructor(public CommonService: CommonService) {}

  ngOnInit() {
    this.userAdded.subscribe(res => {
      this.CommonService.getLatestUser();
    });
    //default
    this.CommonService.getLatestUser();
  }

  editUser(user: User) {
    // debugger;
    this.sendToParent.emit(user);
  }

  deleteUser(_id: string) {
    // debugger;
    if (confirm("Are you sure to delete this record?")) {
      this.CommonService.deleteUser(_id).subscribe(res => {
        this.CommonService.getLatestUser();
      });
    }
  }
}

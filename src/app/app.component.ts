import { Component } from "@angular/core";
import { CommonService } from "./common.service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  submitted = false;
  title = "register form";

  userName = new FormControl("", Validators.required);
  // email = new FormControl("", Validators.required);
  email = new FormControl("", [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  ]);

  fromParent: User = {
    userName: "",
    email: "",
    _id: ""
  };
  isEdit?: boolean;

  constructor(public CommonService: CommonService, private fb: FormBuilder) {}

  onSubmit() {
    this.submitted = true;
    if (this.userName.valid && this.email.valid) {
      if (!this.isEdit) {
        this.CommonService.createUser(this.fromParent).subscribe(response => {
          this.CommonService.getLatestUser();

          this.reset();
        });
      } else {
        this.CommonService.updateUser(this.fromParent).subscribe(response => {
          this.CommonService.getLatestUser();

          this.reset();
          this.isEdit = false;
        });
      }
    }
  }

  receiveUser(user: User) {
    this.fromParent = Object.assign({}, user);
    this.isEdit = true;
  }

  reset() {
    this.userName.reset();
    this.email.reset();
    this.submitted = false;
  }
}

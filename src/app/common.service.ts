import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subject, catchError, throwError } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  constructor(private fb: FormBuilder, private _http: HttpClient) {}

  readonly baseURL = "http://localhost:3000/api/employees/";
  list: User[] = [];

  createUser(user: { userName?: string; email?: string; _id: any }) {
    return this._http.post(this.baseURL, user);
  }

  getLatestUser() {
    return this._http.get(this.baseURL).subscribe(res => {
      this.list = res as User[];
    });
  }

  updateUser(user: { userName?: string; email?: string; _id: string }) {
    return this._http.put(this.baseURL + user._id, user);
  }

  deleteUser(_id: String) {
    // debugger
    return this._http.delete(this.baseURL + _id);
  }
}

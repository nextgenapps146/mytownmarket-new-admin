import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/services/auth.service";
import { UtilityService } from "src/services/utility.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage implements OnInit {
  username = "";

  constructor(
    private route: Router,
    private utils: UtilityService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (
      this.username !== undefined &&
      this.username !== null &&
      this.username.trim() !== ""
    ) {
      console.log('username', this.username);
      this.utils.fullname = this.username;
      this.authService.createUser(this.username);
    } else {
      this.utils.showToast("Full name should be entered");
    }
  }
}

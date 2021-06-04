import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UserInterface} from "./interfaces/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: UserInterface | null;
  userSub;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(auth?) {
    if (this.userSub) this.userSub.unsubscribe();
    this.userSub = this.authService.user.subscribe(async (userDoc: UserInterface | undefined | null) => {
      if (userDoc === undefined) {
        await this.authService.createUserDoc(auth)
      } else {
        this.user = userDoc; // UserDoc or Null
      }
    })
  }

  register() {
    this.authService.signInWithGoogle().then(auth => {
      this.getUser(auth.user);
    })
  }

  logout() {
    this.authService.logout();
  }

}

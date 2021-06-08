import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostPageComponent } from "./pages/post-page/post-page.component";
import { BlogPageComponent } from "./pages/blog-page/blog-page.component";
import {AddPageComponent} from "./pages/add-page/add-page.component";
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  {
    path: '',
    component: BlogPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'post/:postID',
    component: PostPageComponent
  },
  {
    path: 'add',
    component: AddPageComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

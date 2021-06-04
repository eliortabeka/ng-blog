import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostPageComponent } from "./pages/post-page/post-page.component";
import { BlogPageComponent } from "./pages/blog-page/blog-page.component";

const routes: Routes = [
  {
    path: '',
    component: BlogPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'post/:postID',
    component: PostPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

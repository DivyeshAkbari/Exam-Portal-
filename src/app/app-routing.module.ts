import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DeshboardComponent } from './pages/admin/deshboard/deshboard.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizeComponent } from './pages/admin/add-quize/add-quize.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyOTPComponent } from './pages/verify-otp/verify-otp.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
  }
  ,
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent,
    pathMatch:'full',
  },
  {
    path:'verify-OTP',
    component:VerifyOTPComponent,
    pathMatch:'full',
  },
  {
    path:'update-password',
    component:UpdatePasswordComponent,
    pathMatch:'full',
  },
  {
    path:'admin',
    component:DeshboardComponent,
    // pathMatch:'full',
    canActivate:[adminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'categories',
        component:ViewCategoriesComponent,
      },
      {
        path:'add-category',
        component:AddCategoryComponent,
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quize',
        component:AddQuizeComponent
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'view-questions/:qid/:title',
        component:ViewQuestionsComponent
      },
      {
        path:'add-question/:qid/:title',
        component:AddQuestionComponent
      },
      {
        path:'question/:questionid',
        component:UpdateQuestionComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    // pathMatch:'full',
    canActivate:[normalGuard],
    children:[
      {
        path:':catId',
        component:LoadQuizComponent
      },
      {
        path:'instructions/:qid',
        component:InstructionsComponent
      },
    ]
  },

  {
    path:'start/:qid',
    component:StartComponent,
    canActivate:[normalGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

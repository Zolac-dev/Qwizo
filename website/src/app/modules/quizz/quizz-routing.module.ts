import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzPage } from './pages/quizz/quizz.page';

const routes: Routes = [
  {path : "", component : QuizzPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzRoutingModule { }

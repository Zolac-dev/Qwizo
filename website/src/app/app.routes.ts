import { Routes } from '@angular/router';

export const routes: Routes = [
    { path : "quizz", loadChildren : ()=>import("./modules/quizz/quizz.module").then(m=>m.QuizzModule) },
	{ path : "config", loadChildren : ()=>import("./modules/configuration/configuration.module").then(m=>m.ConfigurationModule) },

	// { path : "test" , component : TestPage},
	{ path : "" , redirectTo : "quizz", pathMatch : "full"}

];

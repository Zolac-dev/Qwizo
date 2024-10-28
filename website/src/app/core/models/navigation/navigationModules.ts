import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChalkboard, faGear } from "@fortawesome/free-solid-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";

interface NavigationModule{
	name : string;
	url : string;
	icon : IconDefinition;
	order : number;
}

enum NavigationModuleID{
	QUIZZ_PANEL = "quizz",
	CONFIG = "config"
}

let navigationModules : {[key in NavigationModuleID] : NavigationModule} = {
	[NavigationModuleID.QUIZZ_PANEL] : {
		name : "Quizz",
		url : "quizz",
		icon : faChalkboard,
		order : 1,
	},
	[NavigationModuleID.CONFIG] : {
		name : "Params",
		url : "config",
		icon : faGear,
		order : 99,
	},
}

export { NavigationModuleID, navigationModules };
export type { NavigationModule };


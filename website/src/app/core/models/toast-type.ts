import { IconDefinition } from "@fortawesome/free-regular-svg-icons"
import { faInfo, faExclamation, faCheck } from "@fortawesome/free-solid-svg-icons"

enum ToastType{
	INFO,
	WARNING,
	ERROR,
	SUCCESS
}

const toastIcons : {[key in ToastType] : IconDefinition} = {
    [ToastType.INFO] : faInfo, 
    [ToastType.WARNING] : faExclamation,
    [ToastType.ERROR] : faExclamation,
    [ToastType.SUCCESS] : faCheck
  }

interface ToastModel{
	message: string,
	type: ToastType,
	seconds : number
}

export { ToastType, toastIcons }
export type { ToastModel }

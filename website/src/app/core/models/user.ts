export interface User{
    id : string
    name : string
    messages : { message : string, date : Date}[]
    score : number
    validate : boolean
}
import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(controlName:string, matchingControlName:string){
    return (formGroup:FormGroup) =>{
        let control = formGroup.get(controlName);
        let matchingControl = formGroup.get(matchingControlName);
        
        if(matchingControl!.errors && !matchingControl?.errors["confirmedValidator"]){
            return;
        }

        if(control?.value != matchingControl?.value){
            matchingControl?.setErrors({confirmedValidator: true});
        }
        else{
            matchingControl?.setErrors(null);
        }
    }
}
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function futureOrTodayDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const dateValue = control.value.initialDate 
        ? new Date(control.value.initialDate) 
        : new Date(control.value);
  
      dateValue.setHours(0, 0, 0, 0);
  
      return dateValue < today ? { pastDate: true } : null;
    };
}
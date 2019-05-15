import {AbstractControl, ValidatorFn} from '@angular/forms';

export function  maxLines(limit: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const exceeded = control.value.length && control.value.split('\n').length > limit;
    return exceeded ? {'maxLines': {value: true}} : null;
  };
}

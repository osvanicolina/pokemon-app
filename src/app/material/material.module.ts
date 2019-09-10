import { NgModule } from '@angular/core';
import { MatButtonModule, MatChipsModule} from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatChipsModule
]
@NgModule({
  imports: [
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }

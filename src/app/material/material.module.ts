import { NgModule } from '@angular/core';
import { MatButtonModule, MatChipsModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';

const MaterialComponents = [
  MatButtonModule,
  MatChipsModule,
  MatCardModule
]
@NgModule({
  imports: [
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }

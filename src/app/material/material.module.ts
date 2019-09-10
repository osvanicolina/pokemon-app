import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatChipsModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';

const MaterialComponents = [
  MatButtonModule,
  MatChipsModule,
  MatCardModule,
  MatGridListModule,
  FlexLayoutModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
]
@NgModule({
  imports: [
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }

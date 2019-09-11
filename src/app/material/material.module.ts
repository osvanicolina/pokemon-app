import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatChipsModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MaterialComponents = [
  MatButtonModule,
  MatChipsModule,
  MatCardModule,
  MatGridListModule,
  FlexLayoutModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
]
@NgModule({
  imports: [
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }

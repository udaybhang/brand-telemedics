import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectSearchfComponent } from './mat-select/mat-select-search.component';



@NgModule({
  declarations: [MatSelectSearchfComponent],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatSelectSearchfComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ]
})
export class MatSelectSearchModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SudokuSchemaComponent } from './sudoku-schema.component';
import { SudokuCellComponent } from './sudoku-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    SudokuSchemaComponent,
    SudokuCellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteEditWindowComponent } from './delete-edit-window/delete-edit-window.component';
import { PostWindowComponent } from './post-window/post-window.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DeleteEditWindowComponent, PostWindowComponent],
  imports: [CommonModule, FormsModule],
  exports: [DeleteEditWindowComponent, PostWindowComponent],
})
export class WindowsModule {}

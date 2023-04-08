import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteEditWindowComponent } from './delete-edit-window/delete-edit-window.component';
import { PostWindowComponent } from './post-window/post-window.component';
import { FormsModule } from '@angular/forms';
import { EditInformationWindowComponent } from './edit-information-window/edit-information-window.component';
import { PostDetailsWindowComponent } from './post-details-window/post-details-window.component';

@NgModule({
  declarations: [
    DeleteEditWindowComponent,
    PostWindowComponent,
    EditInformationWindowComponent,
    PostDetailsWindowComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    DeleteEditWindowComponent,
    PostWindowComponent,
    EditInformationWindowComponent,
    PostDetailsWindowComponent,
  ],
})
export class WindowsModule {}

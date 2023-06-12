import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, FooterComponent],
  imports: [CommonModule, TaskManagerRoutingModule],
  exports:[HeaderComponent, FooterComponent]
})
export class TaskManagerModule {}

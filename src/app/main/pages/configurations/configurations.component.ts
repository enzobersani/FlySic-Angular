import { Component } from '@angular/core';
import { TabItemComponent } from "../../../shared/components/navigation/tab/tab-item/tab-item.component";
import { TabHeaderComponent } from "../../../shared/components/navigation/tab/tab-item/tab-header/tab-header.component";
import { TabComponent } from "../../../shared/components/navigation/tab/tab.component";
import { TabBodyComponent } from "../../../shared/components/navigation/tab/tab-item/tab-body/tab-body.component";
import { NewPasswordComponent } from "../new-password/new-password.component";
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [TabItemComponent, TabHeaderComponent, TabComponent, TabBodyComponent, NewPasswordComponent, ProfileComponent],
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.scss'
})
export class ConfigurationsComponent {

}
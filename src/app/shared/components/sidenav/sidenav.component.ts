import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {AngularSplitModule} from "angular-split";
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatTooltip} from "@angular/material/tooltip";
import {NotificationsComponent} from "../../../features/notifications/notifications.component";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {JobOffersComponent} from "../../../features/job-offers/job-offers.component";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatIconButton,
    MatToolbar,
    MatIcon,
    AngularSplitModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatTooltip,
    MatExpansionModule,
    NotificationsComponent,
    RouterLink,
    NgIf,
    JobOffersComponent
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav

  @ViewChild('sidenavEnd', { static: false }) sidenavEnd!: MatSidenav

  showLeftSidenav: boolean = true

  showRightSidenav: boolean = true

  mainArea: boolean = true
}

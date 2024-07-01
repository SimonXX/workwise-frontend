import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class  AppComponent implements OnInit, OnDestroy{
  title = 'FrontEndApplications';

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}

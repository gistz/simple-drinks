import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { DrinksListComponent } from './drinks/components/drinks-list-component';
import { LayoutType } from './drinks/models/drinks.models';
import { AppConfigService } from './core/app-config.service';
import { AppConfigModel } from './core/appConfig.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  layoutTypes = LayoutType;
  router = inject(Router);
  appConfig : AppConfigModel;
  
  constructor(appConfigService: AppConfigService,private renderer: Renderer2){
    this.appConfig = appConfigService.getConfig();
    
  }

  ngOnInit(): void {
    this.applyConfigThemes();
  }

  applyConfigThemes(){
    this.renderer.addClass(document.body, this.appConfig.theme);
    this.renderer.addClass(document.querySelector('#app-header'), this.appConfig.headerColor);
  }
  
}

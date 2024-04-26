import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksListComponent } from './drinks-list-component';
import { LayoutType, Drink, DrinkListConfig } from '../models/drinks.models';
import { DrinksService } from '../services/drinks.service';
import { Observable } from 'rxjs';
import { DrinkConfigService } from '../services/drink-config.service';

@Component({
  selector: 'app-drinks-page',
  standalone: true,
  imports: [CommonModule, DrinksListComponent],
  providers: [DrinksService],
  template: `
    @if(drinkListConfigs){ @for(drinkListConfig of drinkListConfigs; track
    drinkListConfig.id ){
    <app-drinks-list
      [layout]="drinkListConfig.layout"
      [headerText]="drinkListConfig.headerText"
      [queryString]="drinkListConfig.queryString"
      [showControls]="drinkListConfig.showControls"
      [itemLimit]="drinkListConfig.itemLimit"
      [linkEnabled]="drinkListConfig.linkEnabled"
    ></app-drinks-list>
    } } @else {
    <article class=" large no-padding center-align middle-align">
      <div class="padding">
        <progress class="circle large center-align"></progress>
      </div>
    </article>
    }
  `,
})
export class DrinksPageComponent {
  layoutTypes = LayoutType;
  drinkListConfigs!: DrinkListConfig[];

  constructor(private readonly drinkConfigServices: DrinkConfigService) {}

  ngOnInit() {
    this.drinkConfigServices
      .loadConfigurations('drinks-config2.json')
      .then((res) => {
        this.drinkListConfigs = this.drinkConfigServices.getConfig();
      });
  }
}

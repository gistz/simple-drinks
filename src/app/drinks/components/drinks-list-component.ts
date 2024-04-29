import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutType, Drink } from '../models/drinks.models';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DrinksService } from '../services/drinks.service';

@Component({
  selector: 'app-drinks-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: `
    article{
      cursor:pointer;
    }
  `,
  template: ` <header>
      <nav>
        <h5 class="max">{{ headerText }}</h5>
        @if(showControls){
        <button class=" transparent" (click)="changeLayout(LayoutType.Compact)">
          <i>view_list</i>
        </button>
        <button class=" transparent" (click)="changeLayout(LayoutType.Tiles)">
          <i>cards</i>
        </button>
        }
      </nav>
    </header>

    <div class="grid">
      @switch (layout) { @case (LayoutType.Tiles) { @for(drink of drinks$ | async |
      slice: itemLimit; track drink.idDrink){
      <div
        class="s12 m6 l3"
        [routerLink]="linkEnabled ? ['drink', drink.idDrink] : null"
      >
        <article class="no-padding border fill">
          <img class="responsive large" [src]="drink.strDrinkThumb" />
          <div class="padding">
            <h6 class="small-text">{{ drink.strDrink }}</h6>
          </div>
        </article>
      </div>
      } } @case (LayoutType.Compact) { @for(drink of drinks$ | async| slice: itemLimit;;
      track drink.idDrink){
      <div
        class="s12 m6 l3"
        [routerLink]="linkEnabled ? ['drink', drink.idDrink] : null"
      >
        <article class="border fill no-padding">
          <div class="row">
            <img class="round large" [src]="drink.strDrinkThumb" />
            <div class="max">
              <h6 class="small">{{ drink.strDrink }}</h6>
            </div>
          </div>
        </article>
      </div>
      } } @default {
      <article class=" large no-padding center-align middle-align">
        <div class="padding">
          <progress class="circle large center-align"></progress>
        </div>
      </article>
      } }
    </div>
    
    <div class='large-space'></div>
    `,
})
export class DrinksListComponent {
  LayoutType = LayoutType;
  @Input() layout: LayoutType | string = LayoutType.Default;
  @Input() drinks: Drink[] = [];
  @Input() headerText: string = 'Alcoholic Drinks';
  @Input() queryString: string = 'a=Alcoholic';
  @Input() showControls: boolean = false;
  @Input() itemLimit: number = 0;
  @Input() linkEnabled: boolean = true;
  
  drinks$!: Observable<Drink[]>;

  constructor(private readonly drinksService: DrinksService) {}

  ngOnInit() {
    this.drinks$ = this.drinksService.getDrinks(this.queryString);
  }

  changeLayout(layoutType: LayoutType) {
    this.layout = layoutType;
  }
}

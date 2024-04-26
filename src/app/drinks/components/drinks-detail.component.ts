import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DrinksService } from '../services/drinks.service';
import { DrinkDetail } from '../models/drinks.models';
import { Observable } from 'rxjs';
import { StartsWithPipe } from '../../shared/starts-with.pipe';

@Component({
  selector: 'app-drinks-detail',
  standalone: true,
  imports: [CommonModule, StartsWithPipe],
  providers: [DrinksService],
  template: `
    <div class="large-space"></div>

    @if(drinkDetail$ | async; as drinkDetail) {
    <article class="no-padding fill">
      <div class="grid no-space">
        <div class="s7">
          <img class="responsive" [src]="drinkDetail?.strDrinkThumb" />
        </div>
        <div class="s5">
          <div class="padding">
            <h3>{{ drinkDetail.strDrink }}</h3>

            <h5 class="small">Ingredients</h5>
            <article class="scroll">
              @for(ingredients of drinkDetail | startsWith : 'strIngredient' |
              keyvalue; track $index){
              <a class="row padding">
                <div class="max">
                  <h6 class="small">{{ ingredients.value }}</h6>
                </div>
              </a>
              <div class="divider"></div>
              }
            </article>
            <h5 class="small">Instructions</h5>            
            @for(instructions of drinkDetail | startsWith : 'strInstructions' |
            keyvalue; track $index){
            <div class="row padding">
              @if(instructions.key | json  | slice: 16 : -1){
                <button class="square">{{instructions.key | json  | slice: 16 : -1}}</button>
              } @else {
                <button class="square">EN</button>
              }
              
              <div class="max">
                <div>{{instructions.value}}</div>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </article>
    } @else {
    <article class=" medium no-padding center-align middle-align">
      <div class="padding">
        <progress class="circle large center-align"></progress>
      </div>
    </article>
    }
  `,
})
export class DrinksDetailComponent implements OnInit {
  public drinkDetail$!: Observable<DrinkDetail>;

  constructor(
    private route: ActivatedRoute,
    private drinksService: DrinksService
  ) {}

  ngOnInit() {
    const idDrink = this.route.snapshot.paramMap.get('id') as string;
    this.drinkDetail$ = this.drinksService.getDrinksDetail(idDrink);
  }
}

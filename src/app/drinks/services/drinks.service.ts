import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Drink, DrinkDetail } from '../models/drinks.models';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../core/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class DrinksService {

  private baseURI: string;

  constructor(private readonly http: HttpClient, appConfigService:AppConfigService) {
    this.baseURI = appConfigService.getConfig().API_URL_DRINKS;
  }

  getDrinks(queryString: string = 'a=Alcoholic'): Observable<Drink[]> {
    return this.http
      .get<{ drinks: Drink[] }>(
        this.baseURI + '/filter.php?' + queryString
      )
      .pipe(map((response) => response.drinks));
  }

  getDrinksDetail(drinkId: string): Observable<DrinkDetail>  {
    return this.http
      .get<{ drinks: DrinkDetail[]}>(
        this.baseURI  + `/lookup.php?i=${drinkId}`
      ).pipe(map((response)=> response.drinks[0]));
  }
}

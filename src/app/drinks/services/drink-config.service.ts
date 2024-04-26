import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppConfigModel } from '../../core/appConfig.model';
import { DrinkListConfig } from '../models/drinks.models';

@Injectable({
  providedIn: 'root',
})
export class DrinkConfigService {
  private _config!: DrinkListConfig[];

  constructor(private httpClient: HttpClient) {}
  readonly JSON_DATA_DIR_URL: string = 'assets/json/';

  getConfig(): DrinkListConfig[] {
    return this._config;
  }

  setConfig(config: any) {
    this._config = config;
  } 

  loadConfigurations(jsonDataUrl: string): Promise<any> {
    return firstValueFrom(this.httpClient.get(this.JSON_DATA_DIR_URL + jsonDataUrl)).then((jsonData) => {
      this.setConfig(jsonData);
      return jsonData;
    })
  }
}


import { Injectable, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, delay, firstValueFrom, of, tap } from 'rxjs';
import { AppConfigModel } from './appConfig.model';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private _config: any;

  constructor(private httpClient: HttpClient) {}
  readonly JSON_DATA_DIR_URL: string = 'assets/json/';

  getConfig(): AppConfigModel {
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
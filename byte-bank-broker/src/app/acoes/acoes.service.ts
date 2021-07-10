import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, pluck } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelos/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  getAcoes(nomeAcao?: string) {
    const params = nomeAcao ? new HttpParams().append('valor', nomeAcao) : undefined;
    return this.httpClient.get<AcoesAPI>(`${environment.api}/acoes`, { params })
      .pipe(
        pluck('payload'),
        map(acoes => acoes.sort((acaoA, acaoB) => this._orderByCode(acaoA, acaoB)))
      );
  }

  private _orderByCode(acaoA: Acao, acaoB: Acao) {

    if (acaoA.codigo > acaoB.codigo) return 1;
    if (acaoA.codigo < acaoB.codigo) return -1;
    return 0;

  }
}

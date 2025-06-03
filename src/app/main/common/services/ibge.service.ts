import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SelectItemModel } from '../../../shared/components/forms/select/models/select-item.model';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private apiCidades = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private http: HttpClient) { }

  buscarCidadePorUf(uf: string): Observable<any> {
    return this.http.get(`${this.apiCidades}/${uf}/municipios`);
  }
}
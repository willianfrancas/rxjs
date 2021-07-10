import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { AcoesService } from './acoes.service';
@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {

  acoesInput = new FormControl();
  // acoes: Acoes;
  // unsubscribeAcoes: Subscription;

  todasAcoes$ = this.acoesService.getAcoes()
    .pipe(
      tap(fluxo => console.log(fluxo + ' inicial')));

  filtroInput$ = this.acoesInput.valueChanges.pipe(
    tap(console.log),
    debounceTime(700),
    filter(nomeAcao => nomeAcao.length >= 3 || !nomeAcao.length),
    distinctUntilChanged(),
    switchMap(nomeAcao => this.acoesService.getAcoes(nomeAcao)),
    tap(fluxo => console.log(fluxo + ' filtro'))
  );

  acoes$ = merge(this.todasAcoes$, this.filtroInput$);

  constructor(private acoesService: AcoesService) { }

  ngOnInit() {
    // this.unsubscribeAcoes = this.acoesService.getAcoes()
    //   .subscribe(acoes => {
    //     this.acoes = acoes;
    //   });
  }

  ngOnDestroy() {
    console.log('unsubscribed');
    // this.unsubscribeAcoes.unsubscribe();
  }
}

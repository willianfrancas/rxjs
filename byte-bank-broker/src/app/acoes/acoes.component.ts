import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
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
    debounceTime(1000),
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

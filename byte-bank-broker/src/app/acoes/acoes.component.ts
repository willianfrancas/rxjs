import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  acoes$ = this.acoesService.getAcoes();

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

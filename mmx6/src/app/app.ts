import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterOutlet } from '@angular/router';
import { Button } from '@openng/optimus-ui/button';
import { Table, TableModule } from '@openng/optimus-ui/table';
import { NgClass } from '../../node_modules/@angular/common/types/_common_module-chunk';

@Component({
  imports: [RouterOutlet, FormsModule, Button, TableModule],
  selector: 'app-root',
  styleUrl: './app.css',
  //templateUrl: './app.html',
  template: `
    <h1>Hello, {{ title() }}</h1>
      <p>Congratulations! Your app is running. 🎉</p>

      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" [disabled]="ativado" (click)="click()"> Aumentar vidas </button>
      <p-button [disabled]="ativado" (onClick)="click()" label="Incrementar 2"/>

      <p> Minhas vidas {{ vidas }} </p>
      <p> Meu texto: <input [(ngModel)] ="name"> </p>
      <p>Vejo que está: {{ name }} </p>

      @for (charac of characters; track charac){
          <br>
          {{ charac }}
      } 

      <p-table [value] = characters>
        <ng-template #header>
          <tr>
            <th> Nome </th>
            
          </tr>
          <ng-template #body let-charac stripedRows [tableStyle]="{ 'min-width': '50rem' }">
            <tr>
                <td>
                    {{ charac }}
                </td>
            </tr>
          </ng-template>

        </ng-template>
    </p-table>
      <router-outlet/>
  `
  ,
  
})
export class App {
  protected readonly title = signal('Megaman X6');
  public ativado = false;
  vidas = 0;

  name = '';

  characters = ['Megagam X', 'Zero', 'Gate']

  click(){
    this.vidas = this.vidas + 1;
  }
}

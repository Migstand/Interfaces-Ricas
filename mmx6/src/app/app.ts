import { Component, signal, WritableSignal,  OnInit, inject, computed} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data, RouterOutlet } from '@angular/router';
import { Button, ButtonModule } from '@openng/optimus-ui/button';
import { Table, TableModule } from '@openng/optimus-ui/table';
import { InputText } from '@openng/optimus-ui/inputtext';
import { TagModule } from '@openng/optimus-ui/tag';
import { Badge } from '@openng/optimus-ui/badge';
import { AccordionModule } from '@openng/optimus-ui/accordion';
import { SelectModule } from '@openng/optimus-ui/select';
import { MessageModule } from '@openng/optimus-ui/message';
import { DatePipe } from '@angular/common';


interface Dica {
    numero: number;
    fase: string;
    descricao: string;
    dificuldade: boolean;
    data: Date;
    
}

interface Fase{
  nome: string;
}

interface Dificuldade{
  dificuldade: boolean;
}

@Component({
  imports: [RouterOutlet, FormsModule, ButtonModule, TableModule, TagModule, AccordionModule, InputText, SelectModule, FormsModule, MessageModule, DatePipe],
  selector: 'app-root',
  styleUrl: './app.css',
  // templateUrl: './app.html',
  template: `
      <header class="flex justify-center gap-2">
        <h1>{{ title() }}</h1>
      </header>
    
      <main class="flex flex-col gap-4"> 
        <section class="flex flex-col gap-4">
          <p-button [disabled]="false" (onClick)="CriarDica()" class="pr-6" label="Criar Nova Dica" icon="pi pi-check" iconPos="right"/> 
          <p-button [disabled]="false" (onClick)="Apagar()" label="Apagar" severity="danger"/>
          <p-button [disabled]="false" (onClick)="Apagar()" label="Atualizar" severity="warn"/>
          <p-button [disabled]="false" (onClick)="Apagar()" label="Listar"  severity="info" />
          <p-button [disabled]="false" (onClick)="Apagar()" label="Detalhar" severity="help" />
          <!-- @if (criar){ -->
          <!-- <input pInputText placeholder = "Fase" class="p-2" [(ngModel)] = "fase"> -->
          
          <div class="card flex justify-center">
            <p-select [options]="fases" [(ngModel)]="fase" [checkmark]="true" optionLabel="nome" [editable]="false" [showClear]="true" placeholder="Fase" class="w-full md:w-56" />
          </div>
          
          <input pInputText placeholder = "Descrição" class="p-1" [(ngModel)] = "descricao">
          
          <!-- <input pInputText placeholder = "Dificuldade" class="p-1" [(ngModel)] = "dificuldade"> -->
          <p>É difícil?</p>
          <div class="card flex justify-center">
            <p-select [options]="dificuldades" [(ngModel)]="dificuldade" [checkmark]="true" optionLabel="dificuldade" [editable]="false" [showClear]="true" placeholder="Dificuldade" class="w-full md:w-56" />
          </div>
          
          <!-- <input pInputText placeholder = "Personagem" class="p-1" [(ngModel)] = "personagem"> -->
          <!-- } -->
        </section>
        
        <section>
          <p-table [value] = dicas() stripedRows="">
            <ng-template #header>
              <tr>
                <th> Nº </th>
                <th> Fase </th>
                <th> Descricao </th>
                <th> Dificuldade </th>
                <th> Data Publicada </th>
              </tr>
              <ng-template #body let-dica>
                <tr>
                    <td>
                        {{ dica.numero }}
                    </td>
                    <td>
                        {{ dica.fase }}
                    </td>
                    <td>
                        {{ dica.descricao }}
                    </td>
                    <td>
                      @if (dica.dificuldade == false){
                        <p-message severity="success">Fácil</p-message>
                      } @else{
                        <p-message severity="error">Difícil</p-message>
                      }
                    </td>
                    <td>
                        {{ dica.data | date:'dd/MM/yyyy' }}
                    </td>
                </tr>
                </ng-template>

                </ng-template>
            </p-table>
        </section>
        
      </main>
      

    <router-outlet/>
  `,
  
})

export class App{
  protected readonly title = signal('Dicas de Mega Man X6');
  public ativado = false;

  dicas: WritableSignal<Dica[]> = signal([
    {numero: 1, fase: "Shild Shelldon", descricao: "Siga pelo caminho de baixo para pegar os itens", dificuldade: false, data: new Date()},
    {numero: 2, fase: "Ground Scaravich", descricao: "Quando repetir uma secção, saia da fase e entre de novo", dificuldade: false, data: new Date()},
    {numero: 3, fase: "Comander Yammark", descricao: "Com um pulo duplo ou dash para cima é possível passar a fase sem repeti-la", dificuldade: false, data: new Date()},
    {numero: 4, fase: "Infinity Mijinion", descricao: "Use o tiro carregado da arma 'Yammar Option' ", dificuldade: false, data: new Date()},
    {numero: 5, fase: "Rainy Turtloid", descricao: "Com um damage boost é possivel pegar os itens sem a armadura especial", dificuldade: false, data: new Date()},
    {numero: 6, fase: "Metal Shark Player", descricao: "Com o item 'Hyper Dash' é possível passar a fase mais facilmente", dificuldade: false, data: new Date()},
    {numero: 7, fase: "Blaze Heatnix", descricao: "Use o tiro carregado da arma 'Metal Ancor' para derrotar os mini bosses ", dificuldade: false, data: new Date()},
    {numero: 8, fase: "Blizzard Wolfang", descricao: "Com um pulo duplo ou dash para cima é possível passar a fase rapidamente", dificuldade: false, data: new Date()},
  ])
  
  fase = signal<any>(null)
  fases:Fase[] =  [{ nome: "Shield Sheldon" },
  { nome: "Ground Scaravich" },
  { nome: "Commander Yammark" },
  { nome: "Infinity Mijinion" },
  { nome: "Rainy Turtloid" },
  { nome: "Metal Shark Player" },
  { nome: "Blaze Heatnix" },
  { nome: "Blizzard Wolfang" }]

  dificuldade = false
  dificuldades:Dificuldade[] = [
    {dificuldade: false}, 
    {dificuldade: true}
  ]
  
  descricao: WritableSignal<string> = signal('')
  
  //personagem: WritableSignal<string> = signal('')

  numero = computed(() => this.dicas().length)
  CriarDica (){
    this.dicas.update(dicas => [
    ...dicas,
    {
      numero: dicas.length + 1,
      fase: this.fase()?.nome ?? '',
      descricao: this.descricao(),
      dificuldade: this.dificuldade,
      data: new Date(),
    }
  ]);
  }
  
  Apagar(){
    this.dicas.set(this.dicas().slice(0, this.numero()));
  }
  
}

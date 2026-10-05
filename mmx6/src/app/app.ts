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
import { DatePipe, NgFor } from '@angular/common';


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
  imports: [RouterOutlet, FormsModule, ButtonModule, TableModule, TagModule, 
    AccordionModule, InputText, SelectModule, FormsModule, MessageModule, DatePipe],
  selector: 'app-root',
  styleUrl: './app.css',
  // templateUrl: './app.html',
  template: `
      <header class="flex justify-center gap-2 bg-[#0000ff] p-2 rounded">
        <h1 class="text-white">{{ title() }}</h1>
      </header>
    
      <main class="flex justify-between gap-4"> 
        <section class="flex flex-col gap-4">
          <p-button [disabled]="false" (onClick)="CriarNovaDica()" class="pr-6" label="Criar Nova Dica" icon="pi pi-check" iconPos="right"/> 
          <!-- @if (criar){ -->
          <!-- <input pInputText placeholder = "Fase" class="p-2" [(ngModel)] = "fase"> -->
          
          @if (mostrarFormulario() != false){
            <p>Fases</p>
            <div class="card flex justify-center">
              <p-select [options]="fases" [(ngModel)]="fase" [checkmark]="true" optionLabel="nome" [editable]="false" [showClear]="true" placeholder="Fase" class="w-full md:w-56" />
            </div>

            <p>Descrição</p>
            <input pInputText placeholder = "Descrição" class="p-1" [(ngModel)] = "descricao">
            
            <!-- <input pInputText placeholder = "Dificuldade" class="p-1" [(ngModel)] = "dificuldade"> -->
            <p>É difícil?</p>
            <div class="card flex justify-center">
              <p-select [options]="dificuldades" [(ngModel)]="dificuldade" [checkmark]="true"  [editable]="false" [showClear]="true" placeholder="Dificuldade" class="w-full md:w-56" />
            </div>
            @if (dica_atualizar() === null) {

  <p-button
    [disabled]="false"
    (onClick)="CriarDica()"
    class="pr-6"
    label="Criar Dica"
    icon="pi pi-check"
    iconPos="right"
  />

} @else {

  <p-button
    [disabled]="false"
    (onClick)="SalvarAtualizacao()"
    class="pr-6"
    label="Atualizar Dica"
    icon="pi pi-save"
    severity="warn"
  />

}
            
            <!-- <input pInputText placeholder = "Personagem" class="p-1" [(ngModel)] = "personagem"> -->
            <!-- } -->
          
          }
          
          <!-- <p-button [disabled]="false" (onClick)="Apagar()" label="Atualizar" severity="warn"/> -->
          <!-- <p-button [disabled]="false" (onClick)="Apagar()" label="Listar"  severity="info" /> -->
          <!-- <p-button [disabled]="false" (onClick)="Apagar()" label="Detalhar" severity="help" /> -->
          
        </section>
        <section>
          @if (detalhe_dica() !== null) {

  <div class="card p-4 border rounded-lg">

      <h2 class="text-xl font-bold">
        Detalhes da Dica
      </h2>

      <p>
        <strong>Número:</strong>
        {{ detalhe_dica()?.numero }}
      </p>

      <p>
        <strong>Fase:</strong>
        {{ detalhe_dica()?.fase }}
      </p>

      <p>
        <strong>Descrição:</strong>
        {{ detalhe_dica()?.descricao }}
      </p>

      <p>
        <strong>Dificuldade:</strong>

        @if (detalhe_dica()?.dificuldade === false) {
          Fácil
        } @else {
          Difícil
        }

      </p>

      <p>
        <strong>Data publicada:</strong>
        {{ detalhe_dica()?.data | date:'dd/MM/yyyy' }}
      </p>

      <p-button
        label="Fechar"
        icon="pi pi-times"
        severity="secondary"
        (onClick)="detalhe_dica.set(null)"
      />

    </div>

  }
          <p-table [value] = dicas() stripedRows="">
            <ng-template #header>
              <tr>
                <th> Nº </th>
                <th> Fase </th>
                <th> Descricao </th>
                <th> Dificuldade </th>
                <th> Data Publicada </th>
              </tr>
              <ng-template #body let-dica >
                <tr >
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
                      @if (dica.dificuldade === false){
                        <p-message severity="success">Fácil</p-message>
                      } @else{
                        <p-message severity="error">Difícil</p-message>
                      }
                    </td>
                    <td>
                        
                        <p-button [disabled]="false" (onClick)="EditarDica(dica)" label="Atualizar" severity="warn"/>
                    </td>
                    <td>
                      <p-button
                        [disabled]="false"
                        (onClick)="DetalharDica(dica)"
                        label="Detalhar"
                        severity="info"
                      />
                    </td>
                    <td>
                      <!-- <button (click)="ApagarDica(numero_apagar())">
                          Apagar
                      </button> -->
                        <p-button [disabled]="false" (onClick)="ApagarDica(dica.numero)" label="Apagar" severity="danger"/>
                    </td>
                    <td>
                        <!-- <p-button [disabled]="false" (onClick)="Apagar()" label="Detalhar" severity="help" /> -->
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

  dificuldade = signal<boolean>(false);

  dificuldades: boolean[] = [
    false,
    true
  ];
  
  descricao: WritableSignal<string> = signal('')
  
  //personagem: WritableSignal<string> = signal('')

  mostrarFormulario = signal(false);

  CriarNovaDica(){
    this.mostrarFormulario.set(!this.mostrarFormulario());
  }

  
  numero_tamanho = computed(() => this.dicas().length)
  CriarDica (){
    this.dicas.update(dicas => [
    ...dicas,
    {
      numero: dicas.length + 1,
      fase: this.fase()?.nome ?? '',
      descricao: this.descricao(),
      dificuldade: this.dificuldade(),
      data: new Date(),
    }
  ]);
  }
  
  numero_apagar = computed(() => this.numero_tamanho())
  ApagarDica(numero: number) {
  this.dicas.update(lista =>
    lista.filter(dica => dica.numero !== numero)
  );
}

  dica_atualizar = signal<Dica | null>(null);

  EditarDica(dica: Dica) {
  this.dica_atualizar.set(dica);

  this.fase.set(
    this.fases.find(f => f.nome === dica.fase) ?? null
  );

  this.descricao.set(dica.descricao);
  this.dificuldade.set(dica.dificuldade);

  this.mostrarFormulario.set(true);
}

  
  
  AtualizarDica(dicaAtualizada: Dica) {
    this.dicas.update(lista =>
      lista.map(dica =>
        dica.numero === dicaAtualizada.numero
          ? dicaAtualizada
          : dica
      )
    );
  }
  SalvarAtualizacao() {

    const dica = this.dica_atualizar();

    if (dica === null) {
      return;
    }

    const dicaAtualizada: Dica = {
      numero: dica.numero,
      fase: this.fase()?.nome ?? '',
      descricao: this.descricao(),
      dificuldade: this.dificuldade(),
      data: dica.data
    };

    this.AtualizarDica(dicaAtualizada);

    // Sai do modo de edição
    this.dica_atualizar.set(null);

    // Limpa os campos
    this.fase.set(null);
    this.descricao.set('');
    this.dificuldade.set(false);

    // Fecha o formulário
    this.mostrarFormulario.set(false);
  }

  detalhe_dica = signal<Dica | null>(null);

  DetalharDica(dica: Dica) {
    this.detalhe_dica.set(dica);
  }


}

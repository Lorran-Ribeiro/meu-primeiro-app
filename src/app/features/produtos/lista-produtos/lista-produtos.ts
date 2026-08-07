import { Component, signal, computed, effect } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
    { nome: 'Notebook', preco: 3800 },
    { nome: 'Mouse', preco: 179 },
  ]);

  totalProdutos = computed(() => this.produtos().length);

  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) => total + item.preco, 0);
  });

  exibirProduto(nome: string) {
    this.produtoSelecionado.set(nome);

    // Aqui você pode atualizar o estado, abrir modal, etc.
  }

  produtoSelecionado = signal<string | null>(null);

  adicionarProduto() {
    this.produtos.update((listaAtual) => [...listaAtual, { nome: 'Teclado', preco: 250 }]);
  }

  substituirProdutos() {
    this.produtos.set([{ nome: 'Produto novo', preco: 999 }]);
  }

  //Método constructor formata os objetos a partir desta classe.

  constructor() {
    //Effect observa alterações realizadas no signal que é o vator de produtos
    effect(() => {
      console.log('Lista de produtos alterada:', this.produtos());
    });
    //effect observa alterações realizadas do computed signal (valorTotal).
    // Estes effects geram mensagens no terminal sempre que alterações saõ realizadas.
    effect(() => {
      console.log('Valor total atualizado:', this.valorTotal());
    });

    // effect observa o title da página e altera se a condição for atendida
    effect(() => {
      if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) Minha Loja`;
      }
    });
  }
  // Ações relacionadas ao carrinho
  carrinho = signal<{ nome: string; preco: number }[]>([]);

  quantidadeCarrinho = computed(() => this.carrinho().length);

  adicionarAoCarrinho(produto: { nome: string; preco: number }) {
    this.carrinho.update((listaAtual) => [...listaAtual, produto]);
  }

  totalCarrinho = computed(() => {
    return this.carrinho().reduce((total, item) => total + item.preco, 0);
  });
}

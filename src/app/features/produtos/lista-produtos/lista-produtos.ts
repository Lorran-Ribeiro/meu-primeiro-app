import { Component, signal, computed, effect, inject } from '@angular/core';
import { Produto } from '../produto/produto';
import { ProdutosService } from '../produto/produtos.service';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal<{ nome: string; preco: number }[]>([]);
  totalProdutos = computed(() => this.produtos().length);
  private produtosService = inject(ProdutosService);

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

  //Criar Método de Requisição Dentro da Classe do Componente ListaProdutos
  constructor() {
    this.carregarProdutos();
    effect(() => {
      console.log('Lista de produtos alterada:', this.produtos());
    });

    effect(() => {
      console.log('Valor total atualizado:', this.valorTotal());
    });
    effect(() => {
      if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) Minha Loja`;
      }
    });
  }

  // FIM DO CONSTRUCTOR,

  //INICIO DO CARREGAR PRODUTOS
  carregarProdutos() {
    throw new Error('Method not implemented.');
  } // FIM DO CARREGAR PRODUTOS

  // Ações relacionadas ao carrinho
  carrinho = signal<{ nome: string; preco: number }[]>([]);

  carregando = signal(true);

  quantidadeCarrinho = computed(() => this.carrinho().length);

  adicionarAoCarrinho(produto: { nome: string; preco: number }) {
    this.carrinho.update((listaAtual) => [...listaAtual, produto]);
  }

  totalCarrinho = computed(() => {
    return this.carrinho().reduce((total, item) => total + item.preco, 0);
  });
}

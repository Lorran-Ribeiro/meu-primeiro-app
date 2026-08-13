import { Component, signal, computed, effect } from '@angular/core';
import { Produto } from '../produto/produto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal<{ nome: string; preco: number }[]>([]);
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

  constructor(private http: HttpClient) {

// carrega da API
this.carregarProdutos();

// effects continuam iguais
effect(() => {
console.log('Lista de produtos alterada:',

this.produtos());
});

effect(() => {
console.log('Valor total atualizado:',

this.valorTotal());
}); effect(() => {
if (typeof document !== 'undefined') {
document.title = `(${this.totalProdutos()}) Minha Loja`;
}
});
}
//Criar Método de Requisição Dentro da Classe do Componente ListaProdutos
carregarProdutos() {

// inicia loading
this.carregando.set(true);

this.http.get<{ title: string; price: number }[]>
('https://fakestoreapi.com/products')
.subscribe({
next: (dados) => {

// Adaptação da API para o nosso projeto
const produtosFormatados = dados.map(p => ({
nome: p.title,
preco: p.price
}));

this.produtos.set(produtosFormatados);
this.carregando.set(false); // finaliza loading
},

error: (erro) => {
console.error('Erro ao carregar produtos:', erro);
this.carregando.set(false); // evita loading infinito
}
});
}

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

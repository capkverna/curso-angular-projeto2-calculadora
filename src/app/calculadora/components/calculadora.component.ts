import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) {}

  ngOnInit(): void {
    this.limpar();
  }

  /**
   * Inicializa todos os operadores para os valores padrões.
   */
  limpar(): void {
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /**
   * Adiciona o número selecionado para o cálculo posteriormente.
   * 
   * @param numero string
   */
  adicionarNumero(numero: string): void {
    if (this.operacao === null) {
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    } else {
      this.numero2 = this.concatenarNumero(this.numero2, numero);
    }
  }

  /**
   * Retorna o valor concatenado, fazendo o tratamento do separador decimal.
   * 
   * @param numAtual Conteúdo atual do número
   * @param numConcat Texto a concatenar
   * @returns string Número concatenado
   */
  concatenarNumero(numAtual: string, numConcat: string): string {
    // caso contenha apenas '0' ou null reinicia o valor
    if (numAtual === '0' || numAtual === null) {
      numAtual = '';
    }

    // se o primeiro dígito é '.', concatena '0' antes do ponto
    if (numConcat === '.' && numAtual === '') {
      return '0.';
    }

    // caso digitado '.' e já contenha um '.', apenas retorna o conteúdo atual
    if (numConcat === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }
    
    return numAtual + numConcat;
  }

  /**
   * Executa a lógica quando um operador for selecionado.
   * Caso já possua uma operação selecionada, executa a 
   * operação anterior e define a nova operação
   * 
   * @param operacao string
   */
  definirOperacao(operacao: string): void {
    // caso não exista uma operação, apenas define a mesma
    if (this.operacao === null) {
      this.operacao = operacao;
      return;
    }

    /* caso operação definida e número 2 selecionado,
      efetua o cálculo da operação */

    if (this.numero2 !== null) {
      this.calcular();

      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }

  }

  /**
   * Efetua o cálculo de uma operação
   */
  calcular(): void {
    if (this.numero2 === null) {
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao
    )
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora.
   * @returns string Texto a ser exibido
   */
  get display(): string {
    if (this.resultado !== null) {
      return this.resultado.toString();
    }

    if (this.numero2 !== null) {
      return this.numero2;
    }

    return this.numero1;
  }

}

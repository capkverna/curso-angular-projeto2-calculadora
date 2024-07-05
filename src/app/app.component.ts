import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculadoraComponent } from './calculadora';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalculadoraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calculadora';
}

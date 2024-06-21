import { Component } from '@angular/core';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrl: './operations-list.component.css'
})
export class OperationsListComponent {
  selectedOption: string = '1';
}

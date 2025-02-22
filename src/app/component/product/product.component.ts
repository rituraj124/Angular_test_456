import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
//   imports: [MaterialModule,DataTablesModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

 

}

import { Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { MychartComponent } from './component/mychart/mychart.component';

export const routes: Routes = [{
    path:'product',component:ProductComponent
},
{
    path:'',component:MychartComponent
}];

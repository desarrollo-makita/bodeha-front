import { Routes } from '@angular/router';

import { InformesComponent } from '../../informes/informes.component';
import { UserComponent } from '../../user/user.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'informes',      component: InformesComponent },
    { path: 'user',           component: UserComponent },
    { path: 'rol-mantenedor', component: UserComponent },


   
];

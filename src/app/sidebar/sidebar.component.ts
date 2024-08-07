import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MyDataService } from 'app/services/data/my-data.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

/*export const ROUTES: RouteInfo[] = [
  { path: '/user', title: 'Usuarios',  icon:'pe-7s-user', class: '' },
  { path: '/informes', title: 'Informes',  icon: 'pe-7s-note2', class: '' },
  { path: '/rol-mantenedor', title: 'Mantenedor de Roles',  icon: 'pe-7s-config', class: '' },
  
];
*/


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private dataSharingService: MyDataService , private router: Router) { }

  ngOnInit() {
    this.dataSharingService.getArrayData().subscribe(data => {
      this.menuItems = data;
      
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const currentUrl = this.router.url;
          this.menuItems.forEach(element =>{
            if(element.Ruta === currentUrl ){
              this.dataSharingService.setStringData(element);
            }
          });
        }
      });
    });

    
    
  }

  updateCurrentMenu() {
    
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  sendData(menuItem) {
    this.dataSharingService.setStringData(menuItem);
  }
}

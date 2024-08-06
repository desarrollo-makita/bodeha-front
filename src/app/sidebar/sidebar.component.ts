import { Component, OnInit } from '@angular/core';
import { MyDataService } from 'app/services/data/my-data.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/user', title: 'Usuarios',  icon:'pe-7s-user', class: '' },
  { path: '/informes', title: 'Informes',  icon: 'pe-7s-note2', class: '' },
  { path: '/rol-mantenedor', title: 'Mantenedor de Roles',  icon: 'pe-7s-config', class: '' },
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private dataSharingService: MyDataService) { }

  ngOnInit() {
    this.dataSharingService.getArrayData().subscribe(data => {
      this.menuItems = data;
      console.log("futuroni :" , this.menuItems);
    });
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  sendData(menuItem) {
  console.log("onclick : " ,menuItem);
    this.dataSharingService.setStringData(menuItem);
  }
}

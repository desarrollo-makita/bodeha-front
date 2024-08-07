import { Component, OnInit, ElementRef } from '@angular/core';

import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { MyDataService } from 'app/services/data/my-data.service';
import { Router } from '@angular/router';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    showIcons: boolean;
    
    

    constructor(
        location: Location,  
        private element: ElementRef, 
        private myDataService: MyDataService,
        private router: Router,
        private dataSharingService : MyDataService) 
        {
        
            this.location = location;
            this.sidebarVisible = false;
            this.showIcons = true;
        }

    ngOnInit(){
      
        this.dataSharingService.getArrayData().subscribe(data => {
            this.listTitles = data;
          });
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      
        this.myDataService.getStringData().subscribe((data: any) => {
            let title = data.Nombre;
            this.showIcons = data.Nombre === "Usuarios" ? true : false;
        });
    }

    
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
         
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].Ruta === titlee){
              return this.listTitles[item].Nombre;
          }
      }
      return 'Mantenedor';
    }

    logout(): void {
        localStorage.removeItem('authToken');
    
        // Redirigir a la página de inicio de sesión
        this.router.navigate(['/login']);
    }
}

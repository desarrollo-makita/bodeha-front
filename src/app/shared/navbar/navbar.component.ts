import { Component, OnInit, ElementRef } from '@angular/core';

import { Location } from '@angular/common';
import { MyDataService } from 'app/services/data/my-data.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';

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
    menuItems : any;
    title: string;
    constructor(
        location: Location,  
        private element: ElementRef, 
        private myDataService: MyDataService,
        private router: Router,
        private dataSharingService : MyDataService,
        private authService : AuthGuard) 
        {
        
            this.location = location;
            this.sidebarVisible = false;
            this.showIcons = true;
        }

    ngOnInit(){
        
        const arregloRecuperado = sessionStorage.getItem('menu');
        this.listTitles = JSON.parse(arregloRecuperado);
      
        console.log('03- arreglo que llena los titulos : ' , this.listTitles );
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        this.title = this.getTitle();
        if(this.title === 'Informes'){
            this.router.navigate(['/informes']);
        }

        console.log("poteeeeeeeeeeeencia",this.title);
    

        this.myDataService.getStringData().subscribe((data: any) => {
            console.log('03- al hacer click gatillo el llenado de setStringData : ' , data);
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
        console.log('04 estamos en el metodo getTitle : ' , titlee );
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 1 );
         
        } 

        const isLoggedIn = sessionStorage.getItem('authToken'); 

        let tokenDecode = this.authService.decodeToken(isLoggedIn);
        console.log("tokenDecode : " , this.listTitles);
        if(tokenDecode.role === 'Consulta'){
       
            for(let e of this.listTitles) {
                if(e.Ruta === '/informes'){
                   this.title =  e.Nombre;
                  
                    return this.title;
                }
               
            }

        }
        else if(tokenDecode.role != 'Consulta'){
        
            for(var item = 0; item < this.listTitles.length; item++){
                if(this.listTitles[item].Ruta === titlee){
                    return this.listTitles[item].Nombre;
                }
            } 
        }
    }

    logout(): void {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('menu');
    
        // Redirigir a la página de inicio de sesión
        this.router.navigate(['/login']);
    }
}

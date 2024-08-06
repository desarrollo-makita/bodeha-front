import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isActive: boolean = false; // Estado inicial del switch

  constructor() { }

  ngOnInit() {
  }

  onSwitchChange() {
    console.log('Switch estado:', this.isActive);
  }

}

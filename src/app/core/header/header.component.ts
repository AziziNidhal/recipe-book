import { Component, OnInit } from '@angular/core';

import { Response } from '@angular/http';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dsService: DataStorageService,private authService:AuthService) { }

  ngOnInit() {
  }

  onSaveData(){
    this.dsService.storeRecipes().subscribe(
      (response:Response)=>{
        console.log('its okey!');
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  onFetchData(){
    this.dsService.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }

}

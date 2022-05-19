import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
 selectedItem = {
    firstLi:0
  }
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.isStateChanged.subscribe(levelvalue => {
      console.log("valueee===",levelvalue);
      this.listClick( levelvalue, 'firstLi')
    })
  }

   listClick(newValue, value) {
    console.log(newValue);
    this.selectedItem[value] = newValue;  
  }

}

import {Component} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {HttpEvent} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((response: HttpEvent<Object>): void => {
        console.log(response);
    });
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}

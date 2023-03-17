import { Component,OnInit } from '@angular/core';
import { MENU } from './../menu';
import { MenuItem } from './../menu.model';
import {AuthService} from 'src/app/services/auth.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menu: any;
  menuItems: MenuItem[] = [];
  constructor(public authService:AuthService){

  }
  isRoleMatched(roles,menu){
    console.log(roles,menu.roles)
    return roles.some(role => menu.roles.includes(role));
  }
  public loadScript(url:string) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
}
  ngOnInit(){
   
      let userRoles=  this.authService.getCurrentUserRoles()||[];
  
      this.menuItems=MENU.filter(menu=> this.isRoleMatched(userRoles,menu));
     setTimeout(() => {
     this.loadScript('assets/vendor/js/menu.js')
      
     }, 2000);
 

  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
  logout(): void {
    console.log('Logged out');
    this.authService.doLogout()
  }
}

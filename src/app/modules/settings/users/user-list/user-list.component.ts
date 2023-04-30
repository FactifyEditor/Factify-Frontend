import { Component,OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/settings/user.service';
import {SharedService} from 'src/app/services/shared/shared.service';

import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements  OnInit,AfterViewInit {
  title = 'newschecker';
  @ViewChild('confirmContentBtn') confirmContent: ElementRef;
  selectedUsers: string[] =[];
  constructor(private http:HttpClient,
    private userService:UserService,
    private sharedService:SharedService,
    private router :Router,private route :ActivatedRoute){

  }
 

dtOptions: any = {};
 
ngOnInit(){
  var that =this;
  this.dtOptions = {
    ajax: (dataTablesParameters: any, callback:any) => {
      that.userService.getAllUsers().subscribe((resp:any) => {
          callback({
            recordsTotal: resp.length,
            recordsFiltered: resp.length,
            data: resp.data            // <-- see here
          });
        });
    },
   
    columns: [
      { data: '' },
      { data: '_id' },
      { data: '_id' },
      { data: 'firstName' },
      { data: 'created' },
      { data: 'status' },
      { data: '' }
    ],
    columnDefs:[ {
      className: 'control',
      orderable: false,
      targets: 0,
      render: function (data:any, type:any, full:any, meta:any) {
        return '';
      }
    },{
      // For Checkboxes
      targets: 1,
      orderable: false,
      render: function () {
        return '<input type="checkbox" class="dt-checkboxes form-check-input">';
      },
      checkboxes: {
        selectAllRender: '<input type="checkbox" class="form-check-input">'
      },
    },
    {
      targets: 2,
      visible: false
    },
    {
      // Avatar image/badge, Name and post
      targets: 3,
      render: function (data:any, type:any, full:any, meta:any) {
        var $user_img = full['avatar'],
          $name = full['firstName'],
          $lastName = full['lastName'],
          $post = full['roles'][0]['name'];
          var assetsPath="assets/"
        if ($user_img) {
          // For Avatar image
          var $output =
            '<img src="' + assetsPath + 'img/avatars/' + $user_img + '" alt="Avatar" class="rounded-circle">';
        } else {
          // For Avatar badge
          var stateNum = Math.floor(Math.random() * 6);
          var states = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'];
          var $state = states[stateNum],
            $name = full['firstName'];
          var $initials = $name.match(/\b\w/g) || [];
          $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
          $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
        }
        // Creates full output for row
        // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar me-2">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate">' +
              $name + ' ' + $lastName +
              '</span>' +
              '<small class="emp_post text-truncate text-muted">' +
              $post +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
      }
    },
    {
      targets:4,
      render: function (data:any, type:any, full:any, meta:any) {
        return that.sharedService.getFormattedDate(new Date(full['created']));
      }
    },
    
   
    {
      // Label
      targets: 5,
      render: function (data:any, type:any, full:any, meta:any) {
        var $status_number = full['status'];
        var $status:any = {
          0: { title: 'Pending', class: 'bg-label-warning' },
          1: { title: 'Active', class: 'bg-label-primary' },
          2: { title: 'Professional', class: ' bg-label-success' },
          3: { title: 'Rejected', class: ' bg-label-danger' },
          4: { title: 'Resigned', class: ' bg-label-warning' },
          5: { title: 'Applied', class: ' bg-label-info' }
        };
        if (typeof $status[$status_number] === 'undefined') {
          return data;
        }
        return (
          '<span class="badge ' + $status[$status_number].class + '">' + $status[$status_number].title + '</span>'
        );
      }
    },
    {
      // Actions
      targets: 6,
      title: 'Actions',
      orderable: false,
      render: function (data:any, type:any, full:any, meta:any) {
        var $id = full['_id'];
        return (
          `<div class="d-inline-block">
          <a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="text-primary ti ti-dots-vertical"></i></a>
          <div class="dropdown-menu dropdown-menu-end m-0">
          <a   routerlink="/users/${$id}" ng-reflect-router-link="/users/${$id}" href="/users/${$id}"  class="dropdown-item">Details</a>
         
          <a href="javascript:;" onclick="functions.deleteEntity('${$id}')"  class="dropdown-item text-danger delete-record">Delete</a>
          </div> 
          </div>`
        );
      }
    }
    ],
  order: [[2, 'desc']],
  dom: 
    "<'row'<'col-sm-6'l><'col-sm-4'f> <'col-sm-2 text-center table_add_button 'B>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-5'i><'col-sm-7'p>>",
  // dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
  buttons: [
   
        
    {
      text: '<i class="ti ti-plus me-sm-1"></i> <span class="d-none d-sm-inline-block"></span>',
      className: 'create-new btn btn-primary btn-sm ',
      action: function ( e:any, dt:any, node:any, config:any ) {
        that.router.navigate(['users/create']);
    }
    }
  ],
  lengthMenu: [7, 10, 25, 50, 75, 100],
  
    
  };
  window.functions = window.functions || {};
  window.functions.editEntity = this.editEntity.bind(this);
  window.functions.deleteEntity = this.deleteEntity.bind(this);
  window.functions.deleteBulkEntity = this.deleteBulkEntity.bind(this);

}

ngAfterViewInit(){
}
deleteEntity(item: string) {
  console.log('Button clicked for ' + item);
  this.confirmContent.nativeElement.click();
  this.selectedUsers = [item]
}
deleteBulkEntity(){
  this.confirmContent.nativeElement.click();
}
editEntity(item) {
  console.log('Button clicked for ' + item);
}
deleteConfirm() {
  this.userService.deleteUser(this.selectedUsers[0]).subscribe(res => {
    // reload page 
    console.log(res);
    // this.toastService.show('Selected Items Deleted', { classname: 'bg-success text-dark', delay: 10000 });
    // this.router.navigate(['/feed/draft']);
    window.location.reload();
  })
}
}

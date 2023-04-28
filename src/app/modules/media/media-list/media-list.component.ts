
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MediaService } from 'src/app/services/media.service';
declare global {
  interface Window { functions: any }
}
@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit, AfterViewInit {
  title = 'newschecker';
  @ViewChild('bulkAction') myDiv: ElementRef;
  @ViewChild('confirmContentBtn') confirmContent: ElementRef;
  private baseURL = environment.BASE_URL;

  constructor(private http: HttpClient,
    private router: Router,
    private mediaSerice: MediaService,
    private route: ActivatedRoute) {

  }



  dtOptions: any = {};
  selectedMedia = []
  ngOnInit() {
    var that = this;
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback: any) => {
        that.http
          .get<any>(
            `${this.baseURL}/media`
          ).subscribe((resp: any) => {
            callback({
              recordsTotal: resp.data.length,
              recordsFiltered: resp.data.length,
              data: resp.data            // <-- see here
            });
          });
      },
      // dom: 'Bfrtip',

      columns: [
        { data: '' },
        { data: '_id' },
        { data: '_id' },
        { data: 'created' },
        { data: '' },
        { data: 'language' },
        { data: 'created' },
        { data: 'creator' },
        { data: '' }
      ],
      columnDefs: [{
        className: 'control',
        orderable: false,
        targets: 0,
        render: function (data: any, type: any, full: any, meta: any) {
          return '';
        }
      }, {
        // For Checkboxes
        targets: 1,
        orderable: false,
        render: function (data: any, type: any, full: any, meta: any) {
          return '<input type="checkbox" type="checkbox" data-id=' + full.id + '   class="dt-checkboxes  tblChk form-check-input">';
        },
        checkboxes: {
          selectAllRender: '<input type="checkbox" class="form-check-input tblChkAll">'
        },
      },
      {
        targets: 2,
        visible: false
      },
      {
        targets: 3,
        render: function (data: any, type: any, full: any, meta: any) {
          const date = new Date(full['created']);
          return date.toLocaleDateString('en-US');
        },

      },
      {
        target: 4,
        render: function (data: any, type: any, full: any, meta: any) {
          return full['metaData']['claim']['frameText'];
        },
      },
      {

        targets: 5,
        render: function (data: any, type: any, full: any, meta: any) {
          return full['language']['language'];
        },

      },
      {

        targets: 6,
        render: function (data: any, type: any, full: any, meta: any) {
          const date = new Date(full['created']);
          return date.toLocaleDateString('en-US');
        },
      },
      {
        // Avatar image/badge, Name and post
        targets: 7,
        render: function (data: any, type: any, full: any, meta: any) {
          var $user_img = full['avatar'],


            $post = full['post'];
          var $name = "ravi";//= full['creator']['firstName'] +' ' +full['creator']['lastName'];
          var assetsPath = "assets/"
          if ($user_img) {
            // For Avatar image
            var $output =
              '<img src="' + assetsPath + 'img/avatars/' + $user_img + '" alt="Avatar" class="rounded-circle">';
          } else {
            // For Avatar badge
            var stateNum = Math.floor(Math.random() * 6);
            var states = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'];
            var $state = states[stateNum];
            var $name = "ravi"; //= full['creator']['firstName'] + ' ' + full['creator']['lastName'];
            var $initials: any = $name.match(/\b\w/g) || [];
            $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
            $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
          }
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
            $name +
            '</span>' +
            '</div>' +
            '</div>';
          return $row_output;
        }
      },
      {
        // Actions
        targets: -1,
        title: 'Actions',
        orderable: false,
        render: function (data: any, type: any, full: any, meta: any) {
          var $id = full['_id'];
          return (
            `<div class="d-inline-block">
          <a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="text-primary ti ti-dots-vertical"></i></a>
          <div class="dropdown-menu dropdown-menu-end m-0">
                  <a   routerlink="/feed/${$id}/detail" ng-reflect-router-link="/feed/${$id}/detail" href="/feed/${$id}/detail"  class="dropdown-item">Details</a>
          <a href="javascript:;" onclick="functions.editEntity('${$id}')"  href="javascript:;" class="dropdown-item">Archive</a>
          <div class="dropdown-divider"></div>
          <a href="javascript:;" onclick="functions.deleteEntity('${$id}')" class="dropdown-item text-danger delete-record">Delete</a>
          </div> 
          </div>`
          );
        }
      }
      ],
      order: [[2, 'desc']],
      dom:
        "<'row'<'test.col-sm-6'><'filter.col-sm-4'f><'col-sm-2 text-center table_add_button 'B>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-3'l><'col-sm-3 mt-10 'i><'col-sm-6'p>>",
      // dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      buttons: [
        {
          text: ' Add <span class="d-none d-sm-inline-block"></span>',
          className: 'create-new btn btn-primary btn-sm ',
          action: function (e: any, dt: any, node: any, config: any) {
            that.router.navigate(['feed/create']);
          }
        },


      ],
      lengthMenu: [7, 10, 25, 50, 75, 100],
    }
   // $('div.toolbar').html('<b>Custom tool bar! Text/images etc.</b>');
   window.functions = window.functions || {};
   window.functions.editEntity = this.editEntity.bind(this);
   window.functions.deleteEntity = this.deleteEntity.bind(this);
 }
 deleteEntity(item: string) {
   console.log('Button clicked for ' + item);
   this.confirmContent.nativeElement.click();
   this.selectedMedia=[item]
 }
 editEntity(item) {
   console.log('Button clicked for ' + item);
 }


  ngAfterViewInit() {
    // show alert if checkbox is unchecked


    var that: any = this;
    $('.dt-scrollableTable').on('change', '.tblChk', function () {


      if ($('.tblChk:checked').length == $('.tblChk').length) {

      } else {

        var d1: any = document.getElementById('est');
        var d2: any = document.getElementById('bulk_action');
        if (d2 == null && $('.tblChk:checked').length > 1)
          d1.insertAdjacentHTML('beforeend', `
      <div ID="bulk_action" class="dropdown" style="margin-top:17px">
  <button class="btn btn-secondary create-new btn-primary btn-sm  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
Bulk Action
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">Delete</a></li>
    <li><a class="dropdown-item" href="#">Publish</a></li>
  </ul>
</div>
    `);
        if ($('.tblChk:checked').length < 2) {
          // remove d2 button from ui
          d2.remove();
        }
      }
    })
  }
  ngOnDestroy() {
    window.functions = null;
  }
  deleteConfirm() {
    this.mediaSerice.deleteMedia(this.selectedMedia).subscribe(res => {
      // reload page 
      this.router.navigate(['/feed']);
    })
  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {LanguageService} from 'src/app/services/settings/language.service'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-languages-list',
  templateUrl: './languages-list.component.html',
  styleUrls: ['./languages-list.component.css'],
})
export class LanguagesListComponent implements OnInit, AfterViewInit {
  title = 'newschecker';
  private baseURL = environment.BASE_URL;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private languageService:LanguageService
  ) {}

  dtOptions: any = {};

  ngOnInit() {
    var that = this;
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback: any) => {
        that.http
          .get<any>(`${this.baseURL}/language`)
          .subscribe((resp: any) => {
            callback({
              recordsTotal: resp.data.length,
              recordsFiltered:resp.data.length,
              data: resp.data, // <-- see here
            });
          });
      },
      // dom: 'Bfrtip',

      columns: [
        { data: '' },
        { data: 'language' },
        { data: 'value' },
        { data: '' },
      ],
      columnDefs: [
        {
          className: 'control',
          orderable: false,
          targets: 0,
          render: function (data: any, type: any, full: any, meta: any) {
            return '';
          },
        },

        {
          // Actions
           // <a href="javascript:;" class="dropdown-item">Archive</a>
          // <div class="dropdown-divider"></div>
          // <a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data: any, type: any, full: any, meta: any) {
            var $id = full['_id'];
            return `<div class="d-inline-block">
          <a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="text-primary ti ti-dots-vertical"></i></a>
          <div class="dropdown-menu dropdown-menu-end m-0">
          <a   routerlink="/languages/${$id}" ng-reflect-router-link="/languages/${$id}" href="/languages/${$id}"  class="dropdown-item">Details</a>
         
          </div> 
          </div>`;
          },
        },
      ],
      order: [[2, 'desc']],
      dom:
        "<'row'<'col-sm-6'l><'col-sm-4'f> <'col-sm-2 text-center table_add_button 'B>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      // dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      buttons: [
        {
          text: 'Add <span class="d-none d-sm-inline-block"></span>',
          className: 'create-new btn btn-primary btn-sm ',
          action: function (e: any, dt: any, node: any, config: any) {
            that.router.navigate(['languages/create']);

            // that.router.navigate(['create'], { relativeTo: that.route });
          },
        },
      ],
      lengthMenu: [7, 10, 25, 50, 75, 100],
    };
  }

  ngAfterViewInit() {}
}

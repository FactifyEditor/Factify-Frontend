
import { Component,OnInit,AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit,AfterViewInit {
  title = 'newschecker';
  private baseURL = environment.BASE_URL;
  constructor(private http:HttpClient,private router :Router,private route:ActivatedRoute){

  }



dtOptions: any = {};
 
ngOnInit(){
  var that =this;
  this.dtOptions = {
    ajax: (dataTablesParameters: any, callback:any) => {
      that.http
        .get<any>(
          `${this.baseURL}/ratings`
        ).subscribe((resp:any) => {
          callback({
            recordsTotal: resp.data.length,
            recordsFiltered: resp.data.length,
            data: resp.data             // <-- see here
          });
        });
    },
    // dom: 'Bfrtip',
    columns: [
      { data: '' },
      { data: '_id' },
      { data: '_id' },
      { data: 'rating' },
      { data: 'description' },
      { data: 'languages' },
      { data: 'image' },
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
    },
    {
      targets: 1,
      visible: false
    },
    {
      target:2,
      visible: false
    },
    {
      targets:5,  
      render:function(data:any, type:any, full:any, meta:any){
        let languages= `${full.languages.filter((language)=>language.isEnabled).map(function (e) {
          return e.language;
        }).join(', ')}`;
        console.log(languages)
        return (
          '<span >' + languages + '</span>'
        );
      }
     },
   {
    targets:6,
    render:function(data:any, type:any, full:any, meta:any){
      return `<div class="form-check custom-option custom-option-image custom-option-image-radio">
      <label class="form-check-label custom-option-content" for="customRadioImg2">
        <span class="custom-option-body">
          <img src="${full['image']}" height="200" alt="radioImg" style="
          max-height: 100px;
          max-width: 120px;
      ">
        </span>
      </label>
      <input name="customRadioImage" class="form-check-input" type="radio" value="customRadioImg2" id="customRadioImg2">
    </div>`
    }
   },
    {
      // Label
      targets: 7,
      render: function (data:any, type:any, full:any, meta:any) {
        var $status_number:any =parseInt(full['status']);
        var $status:any = {
          2: { title: 'Current', class: 'bg-label-primary' },
          1: { title: 'Enabled', class: ' bg-label-success' },
          3: { title: 'Rejected', class: ' bg-label-danger' },
          4: { title: 'Resigned', class: ' bg-label-warning' },
          0: { title: 'Enabled', class: ' bg-label-info' }
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
      // <a href="javascript:;" class="dropdown-item">Archive</a>
      // <div class="dropdown-divider"></div>
      // <a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>
      targets: -1,
      title: 'Actions',
      orderable: false,
      render: function (data:any, type:any, full:any, meta:any) {
        var $id = full['_id'];
        return (
          `<div class="d-inline-block">
          <a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="text-primary ti ti-dots-vertical"></i></a>
          <div class="dropdown-menu dropdown-menu-end m-0">
          <a href="/ratings/${$id}"    class="dropdown-item">Details</a>

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
      text: 'Add <span class="d-none d-sm-inline-block"></span>',
      className: 'create-new btn btn-primary btn-sm ',
      action: function ( e:any, dt:any, node:any, config:any ) {
        that.router.navigate(['ratings/create']);

    }
    }
  ],
  lengthMenu: [7, 10, 25, 50, 75, 100],
  };


}

ngAfterViewInit(){
}
}

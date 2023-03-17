import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService) {
  }

  public showSuccess(message:string): void {
    this.toastrService.success(message, 'Success!');
  }

  public showInfo(message:string): void {
    this.toastrService.info(message, 'Info!');
  }

  public showWarning(message:string): void {
    this.toastrService.warning(message, 'Warning!');
  }

  public showError(message:string): void {
    this.toastrService.error(message, 'Error!');
  }
}
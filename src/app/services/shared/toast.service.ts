import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: any[] = [];

	show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    console.log(textOrTpl)
		this.toasts.push({ textOrTpl, ...options });
	}

	remove(toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}

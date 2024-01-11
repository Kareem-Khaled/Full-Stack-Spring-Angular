import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImageError]',
  standalone: true
})
export class ImageErrorDirective {

  private DEFAULT_IMAGE_URL = '/assets/images/default2.png';

  constructor(private img: ElementRef) {}

  @HostListener('error') onError() {
    this.img.nativeElement.src = this.DEFAULT_IMAGE_URL;
  }
  
}

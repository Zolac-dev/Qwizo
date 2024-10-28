import { Directive, ElementRef, Input } from '@angular/core';
import tippy, { Props } from 'tippy.js';

@Directive({
  selector: '[tippy]',
  standalone: true
})
export class TippyDirective {

  @Input('tippyOptions') public tippyOptions ?: Partial<Props>;

  constructor(private el: ElementRef) {
    this.el = el;
  }

  public ngOnInit() {
    tippy(this.el.nativeElement, this.tippyOptions);
  }

}

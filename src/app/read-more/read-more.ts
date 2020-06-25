import { Component, ViewEncapsulation, Input, AfterViewInit, ElementRef } from "@angular/core";


@Component({
  selector: "read-more",
  template: `
        <div [class.collapsed]="isCollapsed" [ngClass]="{'isCollapsed': !isCollapsed}" class="pull-left pt-2 readMore">
            <ng-content></ng-content>
        </div>
        <div class='cb'></div>
    `,
  styleUrls: ["./read-more.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ReadMoreComponent implements AfterViewInit {
  @Input() dataLength: boolean;
  public isCollapsed: boolean = true;
  public isCollapsable: boolean = false;
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit() {

  }
}
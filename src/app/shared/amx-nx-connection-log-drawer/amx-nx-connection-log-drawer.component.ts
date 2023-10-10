import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, SimpleChanges, TemplateRef } from '@angular/core';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { EventBusService } from 'src/app/services/event-bus.service';
import { LogService } from 'src/app/services/log.service';
import { LogMessageService } from 'src/app/utils/log-message.service';


@Component({
  selector: 'amx-nx-connection-log-drawer',
  templateUrl: './amx-nx-connection-log-drawer.component.html',
  styleUrls: ['./amx-nx-connection-log-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AmxNxConnectionLogDrawerComponent {
  closeResult: string = "";
  messages: any[] = [];
  @Input() show = false;
  @Input() name: any;


  constructor(public activeOffcanvas: NgbActiveOffcanvas, private cdr: ChangeDetectorRef, private eventBusService: EventBusService, private logService: LogService) {
  }

  clearLog(): void {
    this.messages = [];
    this.cdr.detectChanges();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
// import { SimplemdeOptions } from 'ngx-simplemde';
import { EventBusService } from '../services/event-bus.service';
import { Subscription } from 'rxjs';
import { AmxNxHcontrolService } from '../services/amx-nx-hcontrol.service';

@Component({
  selector: 'amx-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnDestroy {

  editorValue: string = 'Click Button to Fetch the file'
  editoConfig: any = {
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true,
    }

  }
  private channelEventSubscription: Subscription = new Subscription;

  constructor(public amxControlService: AmxNxHcontrolService, private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
    this.bindEvent();
  }

  bindEvent() {
    this.channelEventSubscription = this.eventBusService.on('hcontrol.file').subscribe((data) => {
      if (data.length) {
        this.editorValue = data;
      }
    })
  }

  onChangeEditorValue(value: any) {
    this.editorValue = value;
  }

  getFile() {
    this.amxControlService.getFile('/config');
  }

  ngOnDestroy(): void {
    if (this.channelEventSubscription) {
      this.channelEventSubscription.unsubscribe();
      this.eventBusService.remove("hcontrol.file")
    }
  }
}

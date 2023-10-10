import { Component } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { AmxNxConnectionLogDrawerComponent } from './shared/amx-nx-connection-log-drawer/amx-nx-connection-log-drawer.component';
import { AmxNxHcontrolService } from './services/amx-nx-hcontrol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventBusService } from './services/event-bus.service';

@Component({
  selector: 'amx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'amx-sdk-angular';
  preLoading: boolean = true;

  constructor(public amxControlService: AmxNxHcontrolService, private router: Router,
    private activatedRoute: ActivatedRoute, private eventBusService: EventBusService,
    private offcanvasService: NgbOffcanvas, config: NgbOffcanvasConfig) {
    config.position = 'end';
  }

  open() {
    this.offcanvasService.open(AmxNxConnectionLogDrawerComponent);
  }
  ngOnInit(): void {
    this.amxControlService.getExternalCredentials('../assets/configuration/controller.json', true);

    this.eventBusService.on('page.event').subscribe((data) => {
      if (typeof data === 'string') {
        const page = data.toLowerCase();
        console.log('Got Page Event, Switching Page to:', page);
        this.router.navigate([`/${page}`]);
      }
    });
    setTimeout(() => {
      this.preLoading = false
    }, 1000);

  }
}

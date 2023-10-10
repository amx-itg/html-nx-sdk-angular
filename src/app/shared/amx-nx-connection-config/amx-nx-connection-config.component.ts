import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AmxNxHcontrolService } from 'src/app/services/amx-nx-hcontrol.service';
import { EventBusService } from 'src/app/services/event-bus.service';

@Component({
  selector: 'amx-nx-connection-config',
  templateUrl: './amx-nx-connection-config.component.html',
  styleUrls: ['./amx-nx-connection-config.component.scss']
})
export class AmxNxConnectionConfigComponent implements OnInit, OnDestroy {
  connection: any = {
    url: '',
    key: '',
    username: '',
    password: '',
  }

  connectionStatusClass = 'bg-danger';

  private hconnectEventSubscription: Subscription = new Subscription;

  constructor(private http: HttpClient, private amxNxHcontrolService: AmxNxHcontrolService, private eventBusService: EventBusService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getConfiguration('../../../assets/configuration/controller.json');
    this.bindEvent();
  }

  bindEvent(): void {
    this.hconnectEventSubscription = this.eventBusService.on('hcontrol.connection').subscribe((data: any) => {
      if (data.type === 'connection') {
        switch (data.message) {
          case 'connected': {
            this.connectionStatusClass = "bg-success";
            break;
          }
          case 'disconnected': {
            this.connectionStatusClass = "bg-danger";
            break;
          }
          case 'error': {
            this.connectionStatusClass = "bg-warning";
            break;
          }
        }
        this.cdr.detectChanges();
      }
    })
  }

  async getConfiguration(url: string) {
    try {
      const response = await this.http.get(url).toPromise();
      this.connection = response;
    } catch (err) {
      console.error("Error, Configuration File doesn't exist");
    }
  }

  handleChange(value: any, key: any) {
    this.connection = { ...this.connect, [key]: value };
  }

  connect() {
    this.amxNxHcontrolService.setExternal(this.connection.url, this.connection.key, this.connection.username, this.connection.password);
    this.amxNxHcontrolService.init();
  }

  disconnect() {
    this.amxNxHcontrolService.close();
  }

  ngOnDestroy(): void {
    if (this.hconnectEventSubscription) {
      this.hconnectEventSubscription.unsubscribe();
      this.eventBusService.remove("hcontrol.connection")
    }
  }
}

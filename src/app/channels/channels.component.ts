import { Component } from '@angular/core';
import { EventBusService } from '../services/event-bus.service';

@Component({
  selector: 'amx-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {

  btnConfig = {
    port: 2,
    channel: 501,
    text: 'Button',
    style: "btn-secondary"
  }

  btnGridConfig = {
    port: 2,
    gridSize: 4,
    gridMarginX: 1,
    gridMarginY: 1,
    justify: 'center',
    btns: [
      { channel: 502, text: 'Button', style: 'btn-primary' },
      { channel: 503, text: 'Button', style: 'btn-secondary' },
      { channel: 504, text: 'Button', style: 'btn-info' },
      { channel: 505, text: 'Button', style: 'btn-warning' },
      { channel: 506, text: 'Button', style: 'btn-danger' },
      { channel: 507, text: 'Button', style: 'btn-dark' },
      { channel: 508, text: 'Button', style: 'btn-light' },
      { channel: 509, text: 'Button', style: 'btn-link' },
      { channel: 510, text: 'Button', style: 'btn-outline-primary' },
      {
        channel: 511,
        text: 'Button',
        style: 'btn-outline-secondary rounded-pill',
      },
      { channel: 512, text: 'Button' },
      { channel: 513, text: 'Button' },
    ],
  };

  btnGroupConfig = {
    port: 2,
    btns: [
      { channel: 514, text: 'One', icon: 'bi bi-airplane' },
      { channel: 515, text: 'Two', icon: 'bi bi-android2' },
      {
        channel: 516,
        text: 'Three',
        icon: 'bi-chat-right-dots-fill',
      },
      { channel: 517, text: 'Four', icon: 'bi bi-alarm' },
    ],
  }

  cbConfig = {
    port: 2,
    channel: 518,
    labelVisible: true,
    text: 'This is a Checkbox',
    switch: false,
    inline: true,
  }

  cbGroupConfig = {
    port: 2,
    switch: true,
    labelVisible: true,
    inline: false,
    checkboxes: [
      { channel: 519, text: 'ONE' },
      { channel: 520, text: 'TWO' },
      { channel: 521, text: 'THREE' },
    ],
  }

  radioGroupConfig = {
    port: 2,
    labelVisible: true,
    inline: true,
    list: [
      { channel: 522, text: 'RADIO ONE' },
      { channel: 523, text: 'RADIO TWO' },
    ],
  }

  testingButtons = [
    {
      port: 12,
      direction: 'btn-group',
      btns: [
        { channel: 100, text: 'Show' },
        { channel: 101, text: 'Hide' },
      ],
    },
    {
      port: 12,
      direction: 'btn-group',
      btns: [
        { channel: 104, text: 'ON' },
        { channel: 105, text: 'OFF' },
      ],
    },
    {
      port: 12,
      direction: 'btn-group',
      btns: [{ channel: 106, text: 'Set Text' }],
    },
    {
      port: 12,
      direction: 'btn-group',
      btns: [
        { channel: 102, text: 'Enable' },
        { channel: 103, text: 'Disable' },
      ],
    },
  ];

}

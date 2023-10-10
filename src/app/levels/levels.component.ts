import { Component } from '@angular/core';

@Component({
  selector: 'amx-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent {

  SINGLE_SLIDER = {
    port: 3,
    level: 10,
    type: 'single',
    skin: 'flat',
    color: 'bg-secondary',
    min: 0,
    max: 255,
    from: 100,
    step: 1,
    grid: false,
    prefix: '',
    postfix: '',
    hide_min_max: true,
    hide_from_to: true,
    prettify: true,
    seperator: ',',
    onchange: true,
    onfinish: false,
  };

  DOUBLE_SLIDER = {
    port: 3,
    level_1: 11,
    level_2: 12,
    min: 0,
    max: 255,
    from: 100,
    type: 'double',
    grid: true,
    prefix: '',
    postfix: '',
    step: 1,
    prettify: true,
    seperator: ',',
    onchange: false,
    onfinish: true,
  };
  
  METER = {
    port: 3,
    level: 10,
    setValue: 100,
    style: "bg-info"
  }
}

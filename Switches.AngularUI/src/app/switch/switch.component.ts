import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SwitchService } from '../services/switch.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Output() greenUpdated = new EventEmitter();

  switches: boolean[];
  backgroundColor = 'rgb(133, 159, 171)';
  greenValue = 0;

  constructor(private switchService: SwitchService) { }

  ngOnInit(): void {
    this.switchService.getSwitches()
      .subscribe((res: boolean[]) => {
        this.getSwitchesCallback(res);
      });

  }
  onChange(e, i): void {
    this.switches[i] = e.checked;
    this.switches = [...this.switches];
    this.switchService.postSwitches(this.switches)
      .subscribe(
        (postRes: boolean) => {
          if (postRes) {
            this.switchService.getSwitches()
              .subscribe((res: boolean[]) => {
                this.getSwitchesCallback(res);
              });
          }
        });
  }

  getSwitchesCallback(array: boolean[]) {
    this.switches = array;
    this.greenValue = this.getGreenValue(array);
    this.backgroundColor = `rgb(${this.greenValue},${this.greenValue},${this.greenValue})`;
    this.greenUpdated.emit(this.greenValue);
  }

  getGreenValue(array: boolean[]) {
    let maxBinaryStr = '';
    let binaryStr = '';
    array.forEach(s => {
      maxBinaryStr += '1';
      binaryStr += s ? '1' : '0';
    });
    const ratio = parseInt(binaryStr, 2) / parseInt(maxBinaryStr, 2);
    return (255 * ratio);
  }


  identify(index, item) {
    return index;
  }
}

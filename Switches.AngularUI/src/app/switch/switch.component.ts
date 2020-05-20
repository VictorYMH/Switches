import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SwitchService } from '../services/switch.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Output() backgroundUpdated = new EventEmitter();

  switches: boolean[];
  backgroundColor = 'rgb(0,0,255)';

  constructor(private switchService: SwitchService) { }

  ngOnInit(): void {
    this.switchService.getSwitches()
      .subscribe((res: boolean[]) => {
        this.switches = res;
        this.backgroundUpdated.emit(this.backgroundColor);
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
                this.switches = res;
                const green = (255 / this.switches.length) * this.switches.filter(s => s).length;
                console.log(green);
                this.backgroundColor = `rgb(0,${green},255)`;
                this.backgroundUpdated.emit(this.backgroundColor);
              });
          }
        });
  }




  identify(index, item) {
    return index;
  }
}

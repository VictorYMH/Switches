import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Switches';
  backgroundColor = 'rgb(0,0,255)';
  fontColor = 'rgb(255,0,0)';

  handleGreenUpdated(greenValue) {
    this.backgroundColor = `rgb(0,${greenValue},255)`;
    this.fontColor = `rgb(255,${greenValue},0)`;
  }
}

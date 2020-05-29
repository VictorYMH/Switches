import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Switches';
  backgroundColor = 'rgb(133, 159, 171)';
  fontColor = 'rgb(142, 0, 48)';

  handleGreenUpdated(greenValue) {
    this.backgroundColor = `rgb(${greenValue},${greenValue},${greenValue})`;
  }
}

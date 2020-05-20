import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Switches';
  backgroundColor = 'rgb(0,0,255)';

  handleBackgroundUpdated(backgroundColor) {
    this.backgroundColor = backgroundColor;
  }
}

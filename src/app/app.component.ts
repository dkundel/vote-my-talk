import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import EmojiRating from 'emoji-rating';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public currentValue = 0;
  public submitted = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.submitted = Boolean(localStorage.getItem('voted')) || false;
  }

  changeRating(ratingEl: EmojiRating) {
    this.currentValue = ratingEl.value;
    console.log(this.currentValue);
    this.cdr.detectChanges();
  }

  async submitRating() {
    const url =
      'https://cors-anywhere.herokuapp.com/https://dramatic-sidewalk-3548.twil.io/vote-talk';
    const event = 'ndcoslo-webcomponents';
    const vote = this.currentValue;
    // if (this.submitted) {
    //   return;
    // }

    try {
      const resp = await this.http.post(url, { vote, event }).toPromise();
      console.log(resp);
      this.submitted = true;
      localStorage.setItem('voted', 'true');
    } catch (err) {
      console.error(err);
    }
  }
}

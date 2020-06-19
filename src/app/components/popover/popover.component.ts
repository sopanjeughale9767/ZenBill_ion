import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  number: any;

  constructor(
    public router: Router,
    public popoverController: PopoverController
  ) { }

  ngOnInit() { }

  temp1() {
    this.number = 1;
    localStorage.setItem('number',this.number)
    this.router.navigateByUrl('/template1');
    this.DismissClick();
  }

  temp2() {
    this.number = 2;
    localStorage.setItem('number',this.number)
    this.router.navigateByUrl('/template2');
    this.DismissClick();

  }

  temp3() {
    this.number = 3;
    localStorage.setItem('number',this.number)
    this.router.navigateByUrl('/template3');
    this.DismissClick();

  }

  temp4() {
    this.number = 4;
    localStorage.setItem('number',this.number)
    this.router.navigateByUrl('/home');
    this.DismissClick();

  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }
}

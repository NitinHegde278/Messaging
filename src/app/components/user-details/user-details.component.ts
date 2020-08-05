import { UserDetailsService } from './user-details.service';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Output() userStat: EventEmitter<boolean> = new EventEmitter();
  userDetails: boolean = true;
  orgName: string;
  email:string;
  name:string;
  phone:string;
  role:string;
  smsCredits:string;
  constructor(@Inject(UserDetailsService) private userService: UserDetailsService) { }

  ngOnInit(): void {
    this.orgName = localStorage.getItem('orgName');
    this.email = localStorage.getItem('user');
    this.phone = localStorage.getItem('phone');
    this.name = localStorage.getItem('name');
    this.role = localStorage.getItem('role');

    this.userService.messageCredits().subscribe(response => {
      this.smsCredits = response;
    });
  }

  detailsClose(){
    this.userDetails = !this.userDetails;
    this.userStat.emit(this.userDetails);
    this.userDetails = !this.userDetails;
  }
}

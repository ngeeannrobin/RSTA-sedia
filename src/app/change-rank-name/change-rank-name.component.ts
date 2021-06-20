import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'change-rank-name',
  templateUrl: './change-rank-name.component.html',
  styleUrls: ['./change-rank-name.component.css']
})
export class ChangeRankNameComponent implements OnInit {
  @Output() open: EventEmitter<boolean> = new EventEmitter();

  constructor(private auth: AuthService, private prof: ProfileService) { }
  @Input() showCancel:boolean;
  @Input() data:any;
  ranks = [
    "REC","PTE","PFC","LCP","CPL","CFC",
    "3SG","2SG","1SG","SSG","MSG", 
    // "3WO","2WO","1WO","MWO","SWO","CWO",
    "2LT","LTA","CPT"
  ]
  selectedRank: string;
  name: string;

  ngOnInit(): void {
    this.selectedRank = this.data.rank;
    this.name = this.data.name;
  }

  cancel(){
    this.open.emit(false);
  }

  confirm(){
    if (this.selectedRank==undefined || this.name==undefined) {return;}
    this.prof.UpdateProfile(this.auth.uid,this.selectedRank,this.name).then(_=>{
      this.data.rank = this.selectedRank;
      this.data.name = this.name.toUpperCase();
      this.cancel();
    })
  }

}

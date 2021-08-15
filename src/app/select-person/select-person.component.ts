import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'select-person',
  templateUrl: './select-person.component.html',
  styleUrls: ['./select-person.component.css']
})
export class SelectPersonComponent implements OnInit {

  constructor(private admin: AdminService) { }
  nom: any;
  nomKey: string[];
  displayKey: string[];
  search: string = "";

  @Input() catFilter: string[];
  @Output() select: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.catFilter){
      this.nom = this.admin.GetFilteredNom(this.catFilter);
    } else {
      this.nom = this.admin.GetNom();
    }
    
    this.nomKey = Object.keys(this.nom);
    this.InputChange("");

    // Freeze background scrolling
    document.body.style.top = `-${window.scrollY}px`
    document.body.style.position = 'fixed';

    document.getElementById('searchbar').focus();

  }

  Close() {
    // Unfreeze background scrolling
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    this.cancel.emit();
  }

  Select(key:string) {
    this.Close();
    this.select.emit(key);
  }

  InputChange(search:string){
    search = search.toUpperCase();
    this.displayKey = [];
    this.nomKey.forEach(key=>{
      if (this.nom[key].includes(search)){
        this.displayKey.push(key);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decode',
  templateUrl: './decode.component.html',
  styleUrls: ['./decode.component.css']
})
export class DecodeComponent implements OnInit {

  constructor() { }
  
  text: string = "";
  code: string = "";

  ngOnInit(): void {
  }


  Decode() {
    let codeArray: string[][] = this.code.split('|').map(x=>x.split('>'));
    
    codeArray.forEach(code=>{
      this.text = this.text.split(`>CAT_${code[0]}`).join(code[1]);
    })
  }

  Copy() {
    navigator.clipboard.writeText(this.text).then(_=>{
      alert("Text copied.");
    });
  }

}

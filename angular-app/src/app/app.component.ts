import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Terminal } from "xterm";
import { WebLinksAddon } from 'xterm-addon-web-links';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public term: any = Terminal;
  // container: any = HTMLElement;
  @ViewChild('myTerminal') terminalDiv: ElementRef = this.elRef;

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    // this.term = new Terminal();
    // this.container = document.getElementById('terminal');
    // this.term.open(this.container);
    // this.term.writeln('Welcome to xterm.js');

    this.term = new Terminal();
    this.term.open(this.terminalDiv.nativeElement);
    this.term.writeln('Welcome to xterm.js');
    this.term.loadAddon(new WebLinksAddon());
  }
}

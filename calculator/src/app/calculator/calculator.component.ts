import { Component, OnInit } from '@angular/core';

export interface Button {
  id: string;
  classList: string;
  action?: string;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  buttons: Button[] = [
    { id: 'CE', action: 'CE', classList: 'calculate__btn' },
    { id: 'C', action: 'C', classList: 'calculate__btn' },
    { id: 'Del', action: 'DEL', classList: 'calculate__btn' },
    { id: '÷', action: '/', classList: 'calculate__btn calculate__btn--big' },
    { id: '7', classList: 'calculate__btn calculate__btn--white calculate__btn--bolder' },
    { id: '8', classList: 'calculate__btn calculate__btn--white calculate__btn--bolder' },
    { id: '9', classList: 'calculate__btn calculate__btn--white calculate__btn--bolder' },
    { id: '×', action: '*', classList: 'calculate__btn calculate__btn--big' },
    { id: '4', classList: 'calculate__btn calculate__btn--white calculate__btn--bolder' },
    { id: '5', classList: 'calculate__btn calculate__btn--white calculate__btn--bolder' },
    { id: '6', classList: 'calculate__btn calculate__btn--white calculate__btn--bolder' },
    { id: '-', action: '-', classList: 'calculate__btn calculate__btn--big' },
    { id: '1', classList: 'calculate__btn calculate__btn--white calculate__btn--bolder' },
    { id: '2', classList: 'calculate__btn calculate__btn--white calculate__btn--bolder' },
    { id: '3', classList: 'calculate__btn calculate__btn--white calculate__btn--bolder' },
    { id: '+', action: '+', classList: 'calculate__btn calculate__btn--big' },
    { id: '+/-', action: '+-', classList: 'calculate__btn calculate__btn--white calculate__btn--big' },
    { id: '0', classList: 'calculate__btn calculate__btn--white calculate__btn--bolder' },
    { id: '.', classList: 'calculate__btn calculate__btn--white calculate__btn--big' },
    { id: '=', action: '=', classList: 'calculate__btn calculate__btn--green calculate__btn--big' },
  ]

  first: string = "0";
  second: string = "0";
  result: string = "";
  operand: string = "";
  display: string = "0";
  screenShow: boolean = false;
  oneClick: boolean = false;
  twoClick: boolean = false;
  plusMinus: boolean = false;
  comma: boolean = false;
  delArrayNumb: string[] = [];

  constructor() {

  }

  ngOnInit(): void {
  }

  onClick(event: Button) {

    if (event.action === undefined && this.display === this.result && this.operand === "") {
      this.clean();
    }
    switch (event.id) {
      case ".":
        if (this.comma === false) {
          this.comma = true;
        }
        break;
      case "Del":
        if (this.first != "0" && this.oneClick === false && this.display != this.result) {
          this.comma = false;
          this.buttons[18].action = undefined;
          this.delArrayNumb = this.first.split("");
          this.delArrayNumb.pop();
          if (this.delArrayNumb.length === 0) {
            this.delArrayNumb = ["0"];
          }
          this.first = this.delArrayNumb.join('');
          this.display = this.first;
        } else if (this.second != "0" && this.twoClick === true) {
          this.comma = false;
          this.buttons[18].action = undefined;
          this.delArrayNumb = this.second.split("");
          this.delArrayNumb.pop();
          if (this.delArrayNumb.length === 0) {
            this.delArrayNumb = ["0"];
          }
          this.second = this.delArrayNumb.join('');
          this.display = this.second;
        } else if (this.display === this.result && this.second === "0") {
          this.comma = false;
          this.buttons[18].action = undefined;
          this.delArrayNumb = this.result.split("");
          this.delArrayNumb.pop();
          if (this.delArrayNumb.length === 0) {
            this.delArrayNumb = ["0"];
          }
          this.result = this.delArrayNumb.join('');
          this.display = this.result;
        }
        break;

      default:
        break;
    }

    if (this.oneClick === false) {
      if (this.first === "0" && !event.action) {
        if (this.comma === true) {
          this.buttons[18].action = ".";
          this.first = 0 + event.id;
        } else {
          this.first = event.id;
        }
        let b = "-";
        if (this.plusMinus === true) {
          this.display = `${b + this.first}`;
        } else {
          this.display = this.first;
        }
      } else if (!event.action) {
        if (this.comma === true) {
          this.buttons[18].action = ".";
        }
        this.first = this.first + event.id;
        let b = "-";
        if (this.plusMinus === true) {
          this.display = `${b + this.first}`;
        } else {
          this.display = this.first;
        }
      }
    }



    if (this.twoClick === true) {
      if (this.second === "0" && !event.action) {
        if (this.comma === true) {
          this.buttons[18].action = ".";
          this.second = 0 + event.id;
        } else {
          this.second = event.id;
        }
        this.display = this.second;
      } else if (!event.action) {
        if (this.comma === true) {
          this.buttons[18].action = ".";
        }
        this.second = this.second + event.id;
        this.display = this.second;
      }
    }

    switch (event.id) {
      case "C":
        this.clean();
        break;
      case "CE":
        this.clean();
        break;
      case "÷":
        this.operand = "/";
        this.changeElem();
        break;
      case "×":
        this.operand = "*";
        this.changeElem();
        break;
      case "-":
        this.operand = "-";
        this.changeElem();
        break;
      case "+":
        this.operand = "+";
        this.changeElem();
        break;
      case "+/-":
        if (this.first > "0") {
          if (this.plusMinus === false) {
            this.plusMinus = true;
            let b = "-";
            this.display = `${b + this.first}`;
          } else {
            this.plusMinus = false;
            this.display = this.first;
          }
        }
        break;
      case "=":
        let numberFirst = Number(this.first);
        let numberSecond = Number(this.second);
        let numberResult = Number(this.result);
        this.comma = false;
        this.buttons[18].action = undefined;
        if (this.plusMinus === true) {
          numberFirst = numberFirst * -1;
        }
        if (this.operand === "/") {
          if (this.display = this.result) {
            this.result = `${numberResult / numberSecond}`;
            this.resetOne();
          } else {
            this.result = `${numberFirst / numberSecond}`;
            this.resetTwo();
          }
        } else if (this.operand === "*") {
          if (this.display = this.result) {
            this.result = `${numberResult * numberSecond}`;
            this.resetOne();
          } else {
            this.result = `${numberFirst * numberSecond}`;
            this.resetTwo();
          }
        } else if (this.operand === "-") {
          if (this.display = this.result) {
            this.result = `${numberResult - numberSecond}`;
            this.resetOne();
          } else {
            this.result = `${numberFirst - numberSecond}`;
            this.resetTwo();
          }
        } else if (this.operand === "+") {
          if (this.display = this.result) {
            this.result = `${numberResult + numberSecond}`;
            this.resetOne();
          } else {
            this.result = `${numberFirst + numberSecond}`;
            this.resetTwo();
          }
        }
        break;

      default:
        break;
    }
  }
  clean() {
    this.twoClick = false;
    this.oneClick = false;
    this.operand = "";
    this.result = "";
    this.second = "0";
    this.first = "0";
    this.display = "0";
    this.plusMinus = false;
    this.comma = false;
    this.buttons[18].action = undefined;
  }
  changeElem() {
    this.twoClick = true;
    this.oneClick = true;
    this.comma = false;
    this.buttons[18].action = undefined;
  }
  resetOne() {
    this.display = this.result;
    this.second = "0";
    this.operand = "";
  }
  resetTwo() {
    this.display = this.result;
    this.first = "0";
    this.second = "0";
    this.operand = "";
  }
  close() {

  }
}



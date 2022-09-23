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
    { id: ',', action: ',', classList: 'calculate__btn calculate__btn--white calculate__btn--big' },
    { id: '=', action: '=', classList: 'calculate__btn calculate__btn--green calculate__btn--big' },
  ]

  first: string = "";
  second: string = "";
  result: string = "";
  operand: string = "";
  display: string = "0";
  screenShow: boolean = false;
  oneClick: boolean = false;
  twoClick: boolean = false;
  plusMinus: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
  }

  onClick(event: Button) {

    if (event.action === undefined && this.display == this.result && this.operand === "") {
      this.clean();
    }

    if (this.oneClick === false) {
      if (this.first === "0" && !event.action) {
        this.first = event.id;
        let b = "-";
        if (this.plusMinus === true) {
          this.display = `${b + this.first}`;
        } else {
          this.display = this.first;
        }
      } else if (!event.action) {
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
        this.second = event.id;
        let numberSecond = Number(this.second);
        this.display = this.second;
      } else if (!event.action) {
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
        this.twoClick = true;
        this.oneClick = true;
        this.operand = "/";
        break;
      case "×":
        this.twoClick = true;
        this.oneClick = true;
        this.operand = "*";
        break;
      case "-":
        this.twoClick = true;
        this.oneClick = true;
        this.operand = "-";
        break;
      case "+":
        this.twoClick = true;
        this.oneClick = true;
        this.operand = "+";
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
        if (this.plusMinus === true) {
          numberFirst = numberFirst * -1;
        }
        if (this.operand === "/") {
          if (this.display = this.result) {
            this.result = `${numberResult / numberSecond}`;
            this.display = this.result;
            this.second = "0";
            this.operand = "";
          } else {
            this.result = `${numberFirst / numberSecond}`;
            this.display = this.result;
            this.first = "0";
            this.second = "0";
            this.operand = "";
          }
        } else if (this.operand === "*") {
          if (this.display = this.result) {
            this.result = `${numberResult * numberSecond}`;
            this.display = this.result;
            this.second = "0";
            this.operand = "";
          } else {
            this.result = `${numberFirst * numberSecond}`;
            this.display = this.result;
            this.first = "0";
            this.second = "0";
            this.operand = "";
          }
        } else if (this.operand === "-") {
          if (this.display = this.result) {
            this.result = `${numberResult - numberSecond}`;
            this.display = this.result;
            this.second = "0";
            this.operand = "";
          } else {
            this.result = `${numberFirst - numberSecond}`;
            this.display = this.result;
            this.first = "0";
            this.second = "0";
            this.operand = "";
          }
        } else if (this.operand === "+") {
          if (this.display = this.result) {
            this.result = `${numberResult + numberSecond}`;
            this.display = this.result;
            this.second = "0";
            this.operand = "";
          } else {
            this.result = `${numberFirst + numberSecond}`;
            this.display = this.result;
            this.first = "0";
            this.second = "0";
            this.operand = "";
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
  }
  close() {

  }
}



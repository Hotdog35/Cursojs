class Calculator {

    constructor() {
        this.locale = "pt-BR";
        this._operation = [0];
        this._lasposition = [];
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.iniButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000)

    }

    clearAll() {
        this._operation = [0];
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();

        if (this.operatorIsEmpty()) {
            this._operation.push(0);
        }
        this.setLastNumberToDisplay();
    }

    setError() {
        this.displayCalc = 'ERROR';
    }
    get lastOperator() {
        return this._operation[this._operation.length - 1];
    }
    set lastOperator(value) {
        this._operation[this._operation.length - 1] = value;
    }
    isOperator(value) {
        return ['+', '-', '*', '/', '%'].indexOf(value) > -1;
    }

    operatorIsEmpty() {

        return this._operation.length == 0;

    }

    pushOperator(value) {


        if (this._operation.length == 3) {

            this.calc(value);

        } else {

            this._operation.push(value);
        }

    }

    getResult(sit){
        if(sit==null){
            console.log('primeira vez');
            return  eval(this._operation.join(''));
        }else if(sit == 1){
            return eval(this.lastOperator.toString() + this._lasposition.join(''));
        }else{
            return eval(this._operation.join('') + this.displayCalc);
        }
       
    }

    calc(value) {



        
        if (value == '%') {
            let newValue = this.getResult();
            newValue /= 100;
            this.clearAll();
            this._operation = [newValue];

        } else if (value == '=') {
            let newValue;

            if (this._operation.length == 1) {

                console.log('entrei lenght 1');
                newValue = this.getResult(1);;

            } else if (this._operation.length == 2) {
                console.log('entrei lenght 2');
                newValue = this.getResult(2)
                this._lasposition[0] = this._operation.pop();
                this._lasposition[1] = this._operation.pop();
                
            } else {
                newValue = this.getResult();
                this._lasposition[1] = this._operation.pop();
                this._lasposition[0] = this._operation.pop();
            }
            this.clearAll();
            this._operation = [newValue];
        } else {
            let newValue = this.getResult();
            this.clearAll();
            this._operation = [newValue, value];
        }

        this.setLastNumberToDisplay();
    }



    setLastNumberToDisplay() {

        let lastNumber;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }


        this.displayCalc = lastNumber;
    }


    addOperator(operator) {



        if (isNaN(this.lastOperator)) {
            //string ou vazio
            if (this.isOperator(operator)) {
                //valor atual é operação
                this.lastOperator = operator;
            } else if (isNaN(operator)) {
                //outra coisa
                console.log('sou outra coisa');
            } else {
                //primeira vez que está passando
                this._operation.push(operator);
                this.setLastNumberToDisplay();
            }
        } else if (isNaN(operator)) {

            this.pushOperator(operator);

        } else {
            //numero
            let newvalue = this.lastOperator + "" + operator;
            this.lastOperator = parseInt(newvalue);
            this.setLastNumberToDisplay();
        }

    }

    execBtn(button) {

        switch (button) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperator('+');
                break;
            case 'subtracao':
                this.addOperator('-');
                break;
            case 'divisao':
                this.addOperator('/');
                break;
            case 'multiplicacao':
                this.addOperator('*');
                break;
            case 'porcento':
                this.addOperator('%');
                break;
            case 'igual':
                this.calc('=');
                break;
            case 'ponto':
                this.addOperator('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperator(parseInt(button));
                break;
            default:
                this.setError();
                break;
        }
    }

    iniButtonsEvents() {
        let butons = document.querySelectorAll('#buttons > g, #parts > g');

        butons.forEach((element, index) => {
            /* tratando de um botão de cada vez*/
            this.addEventListenerAll(element, 'click',/*funcção*/fn => {
                let textButtons = element.className.baseVal.replace('btn-', '');
                this.execBtn(textButtons);
            });

            this.addEventListenerAll(element, "mouseover mouseup mousedown", fn => {

                element.style.cursor = "pointer";
            });
        });


    }

    addEventListenerAll(element, event, fn) {

        event.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this.locale, {
            day: "2-digit",
            month: "long",
            year: "2-digit"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }
}
import React from "react";
import CalculatorPanel from "./CalculatorPanel";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            numbers: ["", ""],
            number_index: 0,
            operation: "",
        };
    }

    operationHandler(operation) {
        if (this.state.number_index === 1) {
            this.equalHandler();
            return;
        }

        if ((operation === "-" || operation === "+") &&
            this.state.numbers[this.state.number_index] === "") {
            this.numberHandler(operation);
            return;
        }

        this.setOperation(operation);
    }

    setOperation(operation) {
        this.setState({
            operation: operation,
        });
        this.nextNumber();
    }

    nextNumber() {
        const new_index = (this.state.number_index === 0 ? 1 : 0);
        this.setState({
            result: this.state.numbers[new_index],
            number_index: new_index,
        })
    }

    numberHandler(number) {
        const newNumber = this.state.numbers[this.state.number_index] + number;
        this.updateNumber(newNumber);
    }

    updateNumber(new_number) {
        var new_numbers = this.state.numbers;
        new_numbers[this.state.number_index] = new_number;
        this.setState({
                result: new_numbers[this.state.number_index],
                numbers: new_numbers,
            }
        );
    }

    dotHandler() {
        const newNumber = this.state.numbers[this.state.number_index] + ".";
        if (isNaN(newNumber)) {
            return;
        }
        this.updateNumber(newNumber);
    }

    clearHandler() {
        this.setState({
            result: "",
            numbers: ["", ""],
            number_index: 0,
            operation: "",
        })
    }

    equalHandler() {
        if(this.state.numbers[0] === "" || this.state.numbers[1] === "") {
            return;
        }

        this.props.calculatorApi.calculate(this.state.numbers[0], this.state.numbers[1], this.state.operation,
            (result) => {
            this.setResult(result);
        });
    }

    setResult(result) {
        const new_numbers = [result, ""];
        const new_number_index = 0;
        this.setState({
            result: new_numbers,
            numbers: new_numbers,
            number_index: new_number_index,
            operation: "",
        })
    }

    render() {
        return (
            <div className={"calculator-grid-container"}>
                <CalculatorPanel
                    result={this.state.result}
                    numberClicked={this.numberHandler.bind(this)}
                    operationClicked={this.operationHandler.bind(this)}
                    dotClicked={this.dotHandler.bind(this)}
                    clearClicked={this.clearHandler.bind(this)}
                    equalClicked={this.equalHandler.bind(this)}
                />
            </div>
        );
    }
}

export default Calculator;

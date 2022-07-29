import React from "react";

function CalculatorDisplay(props) {
    return (
        <input  className={"calculator-display"}
            value={props.text}
            readOnly={true}/>
    );
}

export default CalculatorDisplay;

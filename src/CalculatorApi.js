class CalculatorApi {
    constructor(service_address) {
        this.service_address = service_address;
    }

    makeURL(number1, number2, operation) {
        var str_operation = "";

        if (operation === "+") {
            str_operation = "add";
        }
        if (operation === "-") {
            str_operation = "sub";
        }
        if (operation === "*") {
            str_operation = "mul";
        }
        if (operation === "/") {
            str_operation = "div";
        }

        const resource = str_operation + "/" + number1 + "/" + number2;
        return new URL(resource, this.service_address);
    }

    calculate(number1, number2, operation, handler) {
        fetch(this.makeURL(number1, number2, operation))
            .then(res => res.json())
            .then((response) => {
                    handler(response["result"]);
                },
                (err) => {
                    handler(err);
                    console.log(err);
                });
    }
}

export default CalculatorApi;

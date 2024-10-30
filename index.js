function load() {
    var btns = document.querySelectorAll("#calculator span");
    var operators = ["+", "-", "x", "÷", "√", "x²", "%", "M+", "M-"];
    var inputScreen = document.querySelector("#screen");
    var memory = 0;
    var decimalAdded = false;
    var input;

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var btnValue = this.innerHTML;
            input = inputScreen.innerHTML;

            switch (btnValue) {
                case "C":
                    inputScreen.innerHTML = "";
                    decimalAdded = false;
                    break;
                case "=":
                    var lastChar = input[input.length - 1];
                    input = input.replace(/x/g, "*").replace(/÷/g, "/");

                    if (operators.indexOf(lastChar) > -1 || lastChar === ".") {
                        input = input.replace(/.$/, "");
                    }

                    if (input) {
                        try {
                            inputScreen.innerHTML = eval(input);
                        } catch (e) {
                            inputScreen.innerHTML = "Error";
                        }
                    }
                    decimalAdded = false;
                    break;
                case ".":
                    if (!decimalAdded) {
                        inputScreen.innerHTML += btnValue;
                        decimalAdded = true;
                    }
                    break;
                case "√":
                    inputScreen.innerHTML = Math.sqrt(eval(input));
                    break;
                case "x²":
                    inputScreen.innerHTML = Math.pow(eval(input), 2);
                    break;
                case "%":
                    inputScreen.innerHTML = eval(input) / 100;
                    break;
                case "M+":
                    memory += eval(input);
                    inputScreen.innerHTML = memory;
                    break;
                case "M-":
                    memory -= eval(input);
                    inputScreen.innerHTML = memory;
                    break;
                default:
                    if (operators.indexOf(btnValue) > -1) {
                        var lastChar = input[input.length - 1];
                        if (input != "" && operators.indexOf(lastChar) === -1) {
                            inputScreen.innerHTML += btnValue;
                        } else if (input === "" && btnValue === "-") {
                            inputScreen.innerHTML += btnValue;
                        }
                        if (operators.indexOf(lastChar) > -1 && input.length > 1) {
                            inputScreen.innerHTML = input.replace(/.$/, btnValue);
                        }
                        decimalAdded = false;
                    } else {
                        inputScreen.innerHTML += btnValue;
                    }
                    decimalAdded = false;
                    break;
            }
        });
    }
}

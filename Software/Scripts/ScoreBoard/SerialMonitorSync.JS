window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    var data = event.data;
    if(typeof data === "object" && data.functionName) {
        var functionName = data.functionName;
        var parameters = data.parameters || [];
        switch (functionName){
            case "syncStartTime":
                startStopwatch(parameters[0]);
                break;
            case "stopStopWatch":
                stopStopwatch(parameters[0]);
                break;
        }
        console.log(functionName);
        console.log(parameters);
    }
}
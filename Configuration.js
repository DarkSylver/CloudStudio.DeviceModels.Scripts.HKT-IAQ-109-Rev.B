function getConfiguration(config) {
    // This function allows you to indicate general configuration values
    // for all devices of this model.

    // Depending on the meaning of the "device address" in this device, 
    // you may want to change the label that is used to refer to the 
    // address in the user interface.
    // For instance, if the address of the device is actually a MAC 
    // address, you may want to use the code below.

    config.addressLabel = { en: "DevEUI", es: "DevEUI" };
}

function getEndpoints(deviceAddress, endpoints) {
    endpoints.addEndpoint("1", "Temperature", endpointType.temperatureSensor);
    endpoints.addEndpoint("2", "Humidity", endpointType.humiditySensor);
    endpoints.addEndpoint("3", "TVOC", endpointType.iasSensor);
    endpoints.addEndpoint("4", "CO2", endpointType.ppmConcentrationSensor, ppmConcentrationSensorSubType.carbonDioxide);
    var pm2 = endpoints.addEndpoint("5", "PM2.5", endpointType.genericSensor);
    pm2.variableTypeId = 1294;
    var pm10 = endpoints.addEndpoint("6", "PM10", endpointType.genericSensor);
    pm10.variableTypeId = 1294;
    endpoints.addEndpoint("7", "HCHO", endpointType.ppmConcentrationSensor);
    endpoints.addEndpoint("8", "O3", endpointType.iasSensor, iasEndpointSubType.gasSensor);
    var pressure = endpoints.addEndpoint("9", "Atmospheric pressure", endpointType.genericSensor);
    pressure.variableTypeId = 1295;
    endpoints.addEndpoint("10", "Light intensity level", endpointType.iasSensor);
    
}

function validateDeviceAddress(address, result) {
    // This function allows you to validate the address of a device, when
    // the user is creating it. If your device has special validation rules
    // for the address, you can check them here, and return an error message
    // in case the address format is incorrect.

    // In the code below, a validation is made to ensure that the address 
    // is exactly 10 characters long.

    // if (address.length != 10) {
    //   result.ok = false;
    //   result.errorMessage = {
    //     en: "The address must be 10 characters long", 
    //     es: "La dirección debe tener exactamente 10 caracteres"
    //   };
    // }
}

function updateDeviceUIRules(device, rules) {
    // This function allows you to specify UI rules at the device level.
    // For instance, you can make it possible to enable or disable adding
    // endpoints manually to the device after it was created.

    // In the code below, adding endpoints manually is disabled in the
    // user interface. This means that the device will be limited to the 
    // endpoints defined by function getEndpoints() above.

    // rules.canCreateEndpoints = false;
}


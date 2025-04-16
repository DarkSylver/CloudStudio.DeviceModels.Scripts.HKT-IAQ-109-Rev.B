/*
Test: 68 6B 74 00 01 1D 00
68 6B 74 00 03 03 64
68:6B:74:00:01:09:00:62:8E
*/

function parseUplink(device, payload) {

    var payloadb = payload.asBytes();
    var decoded = Decoder(payloadb, payload.port)
    env.log(decoded);

    // Store Temperature
    if (decoded.temperature != null) {
        var sensor1 = device.endpoints.byAddress("1");

        if (sensor1 != null)
            sensor1.updateTemperatureSensorStatus(decoded.temperature);
    };

    // Store Humidity
    if (decoded.humidity != null) {
        var sensor2 = device.endpoints.byAddress("2");

        if (sensor2 != null)
            sensor2.updateHumiditySensorStatus(decoded.humidity);
    };


    // Store TVOC
    if (decoded.tvoc != null) {
        var sensor3 = device.endpoints.byAddress("3");

        if (sensor3 != null)
            sensor3.updateIASSensorStatus(decoded.tvoc);
    };


    // Store CO2
    if (decoded.co2 != null) {
        var sensor4 = device.endpoints.byAddress("4");

        if (sensor4 != null)
            sensor4.updatePpmConcentrationSensorStatus(decoded.co2);
    };


    // Store PM2.5
    if (decoded.pm2_5 != null) {
        var sensor5 = device.endpoints.byAddress("5");

        if (sensor5 != null)
            sensor5.updateGenericSensorStatus(decoded.pm2_5);
    };


    // Store PM10
    if (decoded.pm10 != null) {
        var sensor6 = device.endpoints.byAddress("6");

        if (sensor6 != null)
            sensor6.updateGenericSensorStatus(decoded.pm10);
    };

    // Store HCHO
    if (decoded.hcho != null) {
        var sensor7 = device.endpoints.byAddress("7");

        if (sensor7 != null)
            sensor7.updatePpmConcentrationSensorStatus(decoded.hcho);
    };

    // Store O3
    if (decoded.o3_level != null) {
        var sensor8 = device.endpoints.byAddress("8");

        if (sensor8 != null)
            sensor8.updateIASSensorStatus(decoded.o3_level);
    };


    // Store Atmospheric pressure
    if (decoded.pressure != null) {
        var sensor9 = device.endpoints.byAddress("9");

        if (sensor9 != null)
            sensor9.updateGenericSensorStatus(decoded.pressure);
    };

    // Store Light intensity level
    if (decoded.light_level != null) {
        var sensor10 = device.endpoints.byAddress("10");

        if (sensor10 != null)
            sensor10.updateIASSensorStatus(decoded.light_level);
    };

    // Store Battery
    if (decoded.battery != null) {
        device.updateDeviceBattery({ percentage : decoded.battery });
    };


}

function buildDownlink(device, endpoint, command, payload) {
    // This function allows you to convert a command from the platform 
    // into a payload to be sent to the device.
    // Learn more at https://wiki.cloud.studio/page/200

    // The parameters in this function are:
    // - device: object representing the device to which the command will
    //   be sent. 
    // - endpoint: endpoint object representing the endpoint to which the 
    //   command will be sent. May be null if the command is to be sent to 
    //   the device, and not to an individual endpoint within the device.
    // - command: object containing the command that needs to be sent. More
    //   information at https://wiki.cloud.studio/page/1195.

    // This example is written assuming a device that contains a single endpoint, 
    // of type appliance, that can be turned on, off, and toggled. 
    // It is assumed that a single byte must be sent in the payload, 
    // which indicates the type of operation.

    /*
         payload.port = 25; 	 	 // This device receives commands on LoRaWAN port 25 
         payload.buildResult = downlinkBuildResult.ok; 
    
         switch (command.type) { 
               case commandType.onOff: 
                       switch (command.onOff.type) { 
                               case onOffCommandType.turnOn: 
                                       payload.setAsBytes([30]); 	 	 // Command ID 30 is "turn on" 
                                       break; 
                               case onOffCommandType.turnOff: 
                                       payload.setAsBytes([31]); 	 	 // Command ID 31 is "turn off" 
                                       break; 
                               case onOffCommandType.toggle: 
                                       payload.setAsBytes([32]); 	 	 // Command ID 32 is "toggle" 
                                       break; 
                               default: 
                                       payload.buildResult = downlinkBuildResult.unsupported; 
                                       break; 
                       } 
                       break; 
               default: 
                       payload.buildResult = downlinkBuildResult.unsupported; 
                       break; 
         }
    */

}
function easy_decode(bytes) {
    var decoded = {};

    if (checkReportSync(bytes) == false)
        return;

    var temp;
    var dataLen = bytes.length - 5;
    var i = 5;
    while (dataLen--) {
        var type = bytes[i];
        i++;
        switch (type) {
            case 0x01:  //software_ver and hardware_ver
                decoded.hard_ver = bytes[i];
                decoded.soft_ver = bytes[i + 1];
                dataLen -= 2;
                i += 2;
                break;
            case 0x02:  //ID
                decoded.id = hexToString(bytes.slice(i, i + 6));
                dataLen -= 6;
                i += 6;
                break;
            case 0x03:// BATTERY
                decoded.battery = bytes[i];
                dataLen -= 1;
                i += 1;
                break;
            case 0x09:// TEMPERATURE
                temp = byteToInt32(bytes.slice(i, i + 3));
                if (temp > 0x7FFFFFFF)
                    temp = -(temp & 0x7FFFFFFF);
                // ℃
                decoded.temperature = byteToInt32(bytes.slice(i, i + 3)) / 1000;

                // ℉
                // decoded.temperature = byteToInt16(bytes.slice(i, i + 3)) / 1000 * 1.8 + 32;

                dataLen -= 3;
                i += 3;
                break;
            case 0x0A:// HUMIDITY
                decoded.humidity = byteToInt32(bytes.slice(i, i + 3)) / 1000;
                dataLen -= 3;
                i += 3;
                break;
            case 0x19:// PRESSURE
                decoded.pressure = byteToUint16(bytes.slice(i, i + 2));
                dataLen -= 2;
                i += 2;
                break;
            case 0x1A:// PIR
                decoded.pir = bytes[i];
                dataLen -= 1;
                i += 1;
                break;
            case 0x1B:// LIGHT
                decoded.light_level = bytes[i];
                dataLen -= 1;
                i += 1;
                break;
            case 0x1C:// PM2.5
                decoded.pm2_5 = byteToUint16(bytes.slice(i, i + 2));
                dataLen -= 2;
                i += 2;
                break;
            case 0x1D:// PM10
                decoded.pm10 = byteToUint16(bytes.slice(i, i + 2));
                dataLen -= 2;
                i += 2;
                break;
            case 0x1E:// HCHO
                decoded.hcho = byteToUint16(bytes.slice(i, i + 2)) / 1000;
                dataLen -= 2;
                i += 2;
                break;
            case 0x1F:// O3
                decoded.o3_level = bytes[i];
                dataLen -= 1;
                i += 1;
                break;
            case 0x20:// CO2
                decoded.co2 = byteToUint16(bytes.slice(i, i + 2))
                dataLen -= 2;
                i += 2;
                break;
            case 0x21:// TVOC
                decoded.tvoc = bytes[i];
                dataLen -= 1;
                i += 1;
                break;
            case 0x29:// LED mode
                decoded.led_display = bytes[i];
                dataLen -= 1;
                i += 1;
                break;
            case 0x2A:// BEEP mode
                decoded.beep = bytes[i];
                dataLen -= 1;
                i += 1;
                break;
            case 0x2B:// temp unit
                decoded.temperature_unit = bytes[i];
                if (decoded.temperature_unit) {
                    decoded.temperature = byteToInt32(bytes.slice(i, i + 3)) / 1000; // ℃
                }
                else {
                    decoded.temperature = byteToInt16(bytes.slice(i, i + 3)) / 1000 * 1.8 + 32; // ℉
                }
                dataLen -= 1;
                i += 1;
                break;
            case 0x2C:// display mode
                decoded.temperature_unit = bytes[i];
                dataLen -= 1;
                i += 1;
                break;
            case 0x2D:// display overturn
                decoded.display_overturn = bytes[i];
                dataLen -= 1;
                i += 1;
                break;
            case 0x81:// power way
                decoded.pwr_way = bytes[i];
                dataLen -= 1;
                i += 1;
                break;
            case 0x86:// sync interval
                decoded.sync_interval = readUInt16LE(bytes.slice(6, 8));
                dataLen -= 2;
                i += 2;
                break;
        }
    }
    return decoded;
}


function byteToUint16(bytes) {
    var value = bytes[0] * 0xFF + bytes[1];
    return value;
}

function byteToInt16(bytes) {
    var value = bytes[0] * 0xFF + bytes[1];
    return value > 0x7fff ? value - 0x10000 : value;
}

function byteToInt32(bytes) {
    var value = bytes[0] * 0xFF * 0xFF + bytes[1] * 0xFF + bytes[2];
    return value > 0x7fffff ? value - 0x1000000 : value;
}

function hexToString(bytes) {
    var value = "";
    var arr = bytes.toString(16).split(",");
    for (var i = 0; i < arr.length; i++) {
        value += parseInt(arr[i]).toString(16);
    }
    return value;
}

function checkReportSync(bytes) {
    if (bytes[0] == 0x68 && bytes[1] == 0x6B && bytes[2] == 0x74) {
        return true;
    }
    return false;
}


function Decoder(bytes, port) {
    return easy_decode(bytes);
}
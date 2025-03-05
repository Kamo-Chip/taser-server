const express = require("express");
const { SerialPort } = require("serialport");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());

app.use(cors());

// Specify the port connected to the Arduino
const port = new SerialPort({ path: "/dev/tty.usbmodem1101", baudRate: 9600 });

// Endpoint to turn the LED on
app.post("/led/on", async (req, res) => {
    port.write("1", (err) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error turning on LED", error: err.message });
      }
      res.send({ message: "LED turned on" });
    });
});

// Endpoint to turn the LED on
app.post("/led/off", async (req, res) => {
    port.write("0", (err) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error turning off LED", error: err.message });
      }
      res.send({ message: "LED turned off" });
    });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

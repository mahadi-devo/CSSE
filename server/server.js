require("dotenv").config({ path: './config/.env'});
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error");

// Routes
const account = require('./routes/account.route');
const ticket = require('./routes/ticket.route');
const journey = require('./routes/journey.route');
const passenger = require('./routes/passenger.route');
const auth = require("./routes/auth.route");

const app = express();

// Body Parser
app.use(express.json({ limit: "50mb" }));

// CORS
app.use(cors());

// Mount routes
app.use('/api/v1/account', account);
app.use('/api/v1/ticket', ticket);
app.use('/api/v1/journey', journey);
app.use('/api/v1/passenger', passenger);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

// Static Files
app.use(express.static("public"));

// morgan http
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : "";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  // process.exit(1);
});

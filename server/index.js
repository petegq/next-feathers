const winston = require("winston");
const app = require("./app");
const port = app.get("port");
const nextApp = require("./nextApp").nextApp;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

nextApp.prepare().then(() => {
  const server = app.listen(port);

  process.on("unhandledRejection", (reason, p) =>
    logger.error("Unhandled Rejection at: Promise ", p, reason)
  );

  server.on("listening", () => {
    const host = app.get("host");
    logger.info(`Feathers application started on http://${host}:${port}`);
  });
});

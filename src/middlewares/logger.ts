import morgan from "morgan";
import fs from "fs";
import moment from "moment-timezone";

morgan.token("date", (req, res, tz) => {
  return moment()
    .tz(tz as string)
    .format("YYYY-MM-DD HH:mm:ss");
});
morgan.format(
  "myformat",
  '[:date[Europe/Helsinki]] ":method :url" :status :res[content-length] - :response-time ms'
);
const loggerHandler = morgan("myformat", {
  stream: fs.createWriteStream("./access.log", { flags: "a" }),
});

export default loggerHandler;
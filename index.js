// ~ environnement
import "dotenv/config";

// ~ import modules
import express from "express";
const app = express();
import { router } from "./app/router/index.js";
import helmet from "helmet";
import session from "express-session";
import { _404 } from "./app/controllers/errorController.js";

app.use(helmet());

app.use((req, res, next) => {

   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
   // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
   next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));

app.use(
   session({
      saveUninitialized: true,
      resave: true,
      secret: process.env.SECRET_SESSION,
   }),
);

app.use(router);

//middleware error
app.use(_404);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
   console.log(`Server listening to http://localhost:${PORT}`);
});

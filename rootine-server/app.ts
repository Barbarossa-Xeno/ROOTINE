import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import session from "express-session";

// ルーターのインポート
import indexRouter from "./routes/index";
import logInRouter from "./routes/login";
import homeRouter from "./routes/home";

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッションの設定
app.use(session({
  secret: "ROOTINESESSION",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

// セッションに保持するデータをモジュールに追加
declare module "express-session" {
  interface SessionData {
      isLoggedIn: boolean;
      userId: string;
  }
}

//ルーターの設定
app.use('/index', indexRouter);
app.use("/login", logInRouter);
app.use("/", homeRouter)
// public フォルダを公開
// app.use("/public", express.static("public"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((
  err: { status: number, message: string },
  req: express.Request, res: express.Response,
  next: express.NextFunction
): any => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const data_source_1 = require("./data-source");
const categories_1 = __importDefault(require("./routes/categories"));
const users_1 = __importDefault(require("./routes/users"));
const upload_1 = __importDefault(require("./routes/upload"));
const posts_1 = __importDefault(require("./routes/posts"));
const books_1 = __importDefault(require("./routes/books"));
const authentications_1 = __importDefault(require("./routes/authentications"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
data_source_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Data source was initialized');
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.use(express_1.default.static(path_1.default.resolve('./public')));
    // use cors
    app.use((0, cors_1.default)({ origin: '*' }));
    const allowedOrigins = ['https://ht-admin-two.vercel.app', 'http://example2.com']; // Thay thế bằng các domain mà bạn muốn cho phép
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: true,
    }));
    // app.use(express.json());
    // app.use(express.urlencoded());
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use('/categories', categories_1.default);
    app.use('/auth', authentications_1.default);
    app.use('/uploads', upload_1.default);
    app.use('/users', users_1.default);
    app.use('/posts', posts_1.default);
    app.use('/books', books_1.default);
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        res.status(404).send('Not found');
        // next(createError(404));
    });
    // error handler
    app.use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}));
// export function initSocketIO(httpServer: http.Server) {
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"]
//     }
//   });
//   io.on('connection', (socket: Socket) => {
//     console.log('A user connected');
//     socket.on('message', (message) => {
//       console.log('Received message:', message);
//       io.emit('message', message);
//     });
//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });
//   return io;
// }
exports.default = app;

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const allowedOrigins = [process.env.ORIGIN_1];

const app = express();

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "32kb" })); // For JSON format
app.use(express.text({ type: "text/*", limit: "32kb" })); // For plain text format
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//print function to ensure every step is executed
app.use((req, res, next) => {
  console.log("--------------------------------");
  console.log(`Received:`, req.method);
  console.log(`at:`, req.url);
  console.log(`with body:`, req.body);
  next();
});

// routers
// import vendorRouter from "./routes/vendor.routes.js";
// import productRouter from "./routes/product.routes.js";
// import orderRouter from "./routes/order.routes.js";
// import userRouter from "./routes/user.routes.js";
// import adminRouter from "./routes/admin.routes.js";
// import categoryRouter from "./routes/category-and-subcategory.routes.js";

// //vendor routes
// app.use("/api/v1/vendor", vendorRouter);

// //product routes
// app.use("/api/v1/products", productRouter);

// //orders routes
// app.use("/api/v1/orders", orderRouter);

// //user routes
// app.use("/api/v1/users", userRouter);

// //admin routes
// app.use("/api/v1/admins", adminRouter);

// //category and subcategory routes
// app.use("/api/v1/categories", categoryRouter);

export { app };

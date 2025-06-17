import express from "express"; // ✅ Import Express instead of using mongoose
import authUser from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router(); // ✅ Create router using express
cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
     
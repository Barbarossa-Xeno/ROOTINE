import mongoose from "mongoose";
import { account } from "./mongoose/schema";

export const setting = {
    db: {
        url: "mongodb://localhost:27017/ROOTINE",
        models: {
            Account: mongoose.model("account", account),
        }
    }
};
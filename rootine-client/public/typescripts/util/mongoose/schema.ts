import { Schema } from "mongoose";
import * as doc from "./IDocuments"

/**
 * アカウント情報のスキーマ
 */
export const account = new Schema<doc.IAccountDocument>();
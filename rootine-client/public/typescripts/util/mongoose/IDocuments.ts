import { Document } from "mongoose"

/** アカウント情報のドキュメント */
export interface IAccountDocument extends Document {
    /** ユーザーID */
    userId: string,
    /** パスワード */
    password: string
}
import { UserDetail } from "./interface"

declare global {
    namespace Express {
        export interface Request {
            user: UserDetail
        }
    }
}
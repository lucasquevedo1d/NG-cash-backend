import { v4 } from "uuid";

export class IdGenerator{
    generator():string {
        return v4()
    }
    
}
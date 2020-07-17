import { expressEventEmitter, customExpressEvents } from ".";
import { User } from "../models/User";
import { userTopic } from "../messaging";

expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User) => {
    //pubsub
    // make event listener async (sync by default)
    setImmediate(async ()=>{
        try {
            let res = await userTopic.publishJSON(newUser)  
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    })
})

expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User) => {
    //send email
})
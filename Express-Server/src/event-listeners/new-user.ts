import { expressEventEmitter, customExpressEvents } from ".";
import { User } from "../models/User";
import { userTopic } from "../messaging";

expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User) => {
    setImmediate(async ()=>{
        try {
            let res = await userTopic.publishJSON(newUser)
            console.log(res);
            console.log(`pub sub new user ${newUser.email}`);
            
        } catch (error) {
            console.log(error);
        }
    })
})

// expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User) => {
//     //send email
// })
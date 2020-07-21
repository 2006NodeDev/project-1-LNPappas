import { PubSub } from '@google-cloud/pubsub'
// $ npm install @google-cloud/pubsub
const pubSubClient = new PubSub({
    // projectId: "unique-perigee-279818",
    // keyFilename: "C:/Users/wooho/OneDrive/Documents/Revature/example-project1_service_account_key/unique-perigee-279818-52ded1e9a8b4.json"
})
  
export const userTopic = pubSubClient.topic('projects/unique-perigee-279818/topics/project1')

import { PubSub } from '@google-cloud/pubsub'
// $ npm install @google-cloud/pubsub
const pubSubClient = new PubSub({
    projectId: "unique-perigee-279818",
    keyFilename: "key.json"
})
  
export const userTopic = pubSubClient.topic('projects/unique-perigee-279818/topics/project1')
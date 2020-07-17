import { PubSub } from '@google-cloud/pubsub'
// $ npm install @google-cloud/pubsub
const pubSubClient = new PubSub()
  
export const userTopic = pubSubClient.topic('projects/unique-perigee-279818/topics/project1')

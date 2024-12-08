import UserModel from "../database/models/users";
import { UserRepository } from "../database/repository/userRepository";

const amqp = require('amqplib');

async function consumeUserData() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'user_data_queue';
        const errorQueue = 'error_report_queue'; 
        const userRepository = new UserRepository(UserModel);

        await channel.assertQueue(queue, { durable: true });
        await channel.assertQueue(errorQueue, { durable: true }); 
        console.log('Waiting for messages in', queue);

        channel.consume(queue, async (msg: any) => {
            if (msg !== null) {
                const user = JSON.parse(msg.content.toString());
                console.log('Message received:', user);

                try {
                    const saveUser = await userRepository.save(user);

                    if (saveUser) {
                        console.log('User saved successfully:', saveUser);
                    } else {
                        console.log('Error in saving user');
                        throw new Error('Error saving user');
                    }

                    channel.ack(msg);
                } catch (error: any) {
                    console.error('Error saving user:', error.message);

                    // Send error report to auth service
                    const errorMessage = {
                        error: error.message,
                        user: user,
                        timestamp: new Date().toISOString(),
                    };

                    channel.sendToQueue(errorQueue, Buffer.from(JSON.stringify(errorMessage)), { persistent: true });
                    console.log('Error reported to auth service:', errorMessage);

                    channel.ack(msg);
                }
            }
        });
    } catch (error) {
        console.error('Error in consuming message:', error);
    }
}

export { consumeUserData };

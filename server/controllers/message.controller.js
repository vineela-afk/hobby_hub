import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Find the conversation
        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });
        console.log(newMessage)

       

        // Add the message ID to the conversation's messages array
        if(newMessage){
            conversation.messages.push(newMessage._id);
            console.log(conversation.messages[0])
        }
       //
       await Promise.all([conversation.save(),newMessage.save()]);

        // Respond with the new message
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessage =async(req,res)=>{
    try{
        const{id:userToChatId}= req.params;
        const senderId =req.user._id;
        const conservation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}

        }).populate('messages')
        //it returns us array of objects of messgaes not just id of messages
        if(!conservation) res.statts(200).json([])
        const messages=conservation.messages
        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
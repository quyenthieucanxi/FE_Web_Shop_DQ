

interface Chat {
    id: string;
    messages: string;
    isSenderRead: boolean;
    isReceiverRead: boolean;
    receiver: User;
    sender: User;
    createdTime: string;
}
interface GroupChatByTime {
    time: string;
    messages: Array<Chat | object>
}
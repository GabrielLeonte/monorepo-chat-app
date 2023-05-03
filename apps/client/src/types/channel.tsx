export type MessageObject = {};

export type GetChannelData = {
  channelName: string | null;
  messageSent5Min: number | null;
  messageSentTotal: number | null;
  messages: Array<MessageObject>;
  users: Array<any>;
};

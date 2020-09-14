import type { AwaitMessagesOptions, Client } from "../Client.ts";
import type { channel, Snowflake } from "../discord.ts";
import { User } from "./User.ts";
import { Message, SendMessageOptions } from "./Message.ts";
import { SnowflakeBase } from "./Base.ts";

export class DMChannel<T extends channel.DMChannel = channel.DMChannel>
  extends SnowflakeBase<T> {
  type = "dm";
  lastMessageId: Snowflake | null;
  recipient: User;
  lastPinTimestamp?: number;
  messages = new Map<Snowflake, Message>();

  constructor(client: Client, data: T) {
    super(client, data);

    this.lastMessageId = data.last_message_id;
    this.recipient = new User(client, data.recipients[0]);
    this.lastPinTimestamp = data.last_pin_timestamp
      ? Date.parse(data.last_pin_timestamp)
      : undefined;
  }

  async startTyping() {
    await this.client.rest.triggerTypingIndicator(this.id);
  }

  async sendMessage(data: SendMessageOptions) {
    return this.client.sendMessage(this.id, data);
  }

  async getPins() {
    const messages = await this.client.rest.getPinnedMessages(this.id);
    return messages.map((message) => new Message(this.client, message));
  }

  async delete() {
    const channel = await this.client.rest.deleteChannel(
      this.id,
    ) as channel.DMChannel;
    return new DMChannel(this.client, channel);
  }

  async awaitMessages(
    filter: (message: Message) => boolean,
    options: AwaitMessagesOptions,
  ): Promise<Message[]> {
    return this.client.awaitMessages(this.id, filter, options);
  }
}
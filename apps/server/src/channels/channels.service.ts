import * as BPromise from 'bluebird';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Channels } from './entities/channels.entity';

import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channels)
    private readonly channelsRepository: Repository<Channels>,
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService
  ) {}

  public async getUserChannels(userId: number): Promise<Array<Channels>> {
    return this.channelsRepository.find({
      relations: { users: true },
      select: { id: true, name: true, users: {} },
      where: [
        { isGlobal: true },
        {
          users: { id: userId },
        },
      ],
      order: { isGlobal: 'desc' },
    });
  }

  public async getChannelUsers(channelId: number, isGlobal: boolean) {
    if (isGlobal) {
      return this.usersService.findAll({ username: true });
    }

    const channelData = await this.channelsRepository.find({
      select: { users: { username: true } },
      where: { id: channelId },
      relations: { users: true },
    });

    return channelData[0].users;
  }

  public async getChannelData(channelId: number): Promise<any> {
    const channel = await this.channelsRepository.findOne({
      select: {
        name: true,
        isGlobal: true,
      },
      where: { id: channelId },
    });

    if (!channel) throw new Error("This channel doesn't exist");

    const { name, isGlobal } = channel;

    const [users, messages, { messageSent5Min, messageSentTotal }] = await BPromise.all([
      this.getChannelUsers(channelId, isGlobal),
      this.messagesService.getLast10Messages(channelId),
      this.messagesService.getChannelStatistics(channelId),
    ]);

    return {
      name,
      messageSent5Min,
      messageSentTotal,
      messages,
      users,
    };
  }

  public createGlobalChannel(name: string): Promise<Channels> {
    const channel = this.channelsRepository.create({
      name,
      isGlobal: true,
    });

    return this.channelsRepository.save(channel);
  }
}

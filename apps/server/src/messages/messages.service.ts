import * as BPromise from 'bluebird';
import * as dayjs from 'dayjs';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Messages } from './entities/messages.entity';
import { InjectRepository } from '@nestjs/typeorm';

type Create = {
  channelId: number;
  userId: number;
  content: string;
};

type GetChannelStatistics = {
  messageSentTotal: number;
  messageSent5Min: number;
};

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>
  ) {}

  public create({ channelId, userId, content }: Create): Promise<Messages> {
    return this.messagesRepository.save(
      this.messagesRepository.create({
        channelId,
        userId,
        content,
      })
    );
  }

  public async getLast10Messages(channelId: number): Promise<Array<Messages>> {
    const messages = await this.messagesRepository.find({
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          username: true,
        },
      },
      relations: { user: true },
      where: { channelId },
      order: { createdAt: 'DESC' },
      take: 10,
    });

    return messages.sort((messageOne, messageTwo) => {
      return new Date(messageOne.createdAt).getTime() - new Date(messageTwo.createdAt).getTime();
    });
  }

  public async getChannelStatistics(channelId: number): Promise<GetChannelStatistics> {
    const createdAt = MoreThanOrEqual(dayjs().subtract(5, 'minute').toISOString());

    const [messageSentTotal, messageSent5Min] = await BPromise.all([
      this.messagesRepository.count({ where: { channelId } }),
      this.messagesRepository.count({ where: { channelId, createdAt } }),
    ]);

    return {
      messageSentTotal,
      messageSent5Min,
    };
  }
}

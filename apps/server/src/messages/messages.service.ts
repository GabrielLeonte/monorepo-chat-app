import * as BPromise from 'bluebird';
import * as dayjs from 'dayjs';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Messages } from './entities/messages.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  public getLast10Messages(channelId: number): Promise<Array<Messages>> {
    return this.messagesRepository.find({
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
      where: { channelId },
      order: { createdAt: 'DESC' },
    });
  }

  public async getChannelStatistics(channelId: number): Promise<GetChannelStatistics> {
    const createdAt = MoreThanOrEqual(dayjs().subtract(5, 'minute').toISOString());

    const [messageSentTotal, messageSent5Min] = await BPromise.all([
      this.messagesRepository.count({ where: { channelId } }),
      this.messagesRepository.count({ where: { createdAt } }),
    ]);

    return {
      messageSentTotal,
      messageSent5Min,
    };
  }
}

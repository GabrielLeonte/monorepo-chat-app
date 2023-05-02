import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Channels } from './entities/channels.entity';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channels)
    private readonly channelsRepository: Repository<Channels>
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

  public createGlobalChannel(name: string): Promise<Channels> {
    const channel = this.channelsRepository.create({
      name,
      isGlobal: true,
    });

    return this.channelsRepository.save(channel);
  }
}

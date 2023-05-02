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

  public createGlobalChannel(name: string): Promise<Channels> {
    const channel = this.channelsRepository.create({
      name,
      isGlobal: true,
    });

    return this.channelsRepository.save(channel);
  }
}

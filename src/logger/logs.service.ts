import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Log from '../models/log.entity';

 
@Injectable()
export default class LogsService {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>
  ) {}
 
  async createLog(log) {
    const newLog = await this.logsRepository.create(log);
    await this.logsRepository.save(newLog, {
      data: {
        isCreatingLogs: true
      }
    });
    return newLog;
  }
}
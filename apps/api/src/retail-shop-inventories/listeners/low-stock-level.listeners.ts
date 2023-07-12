import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LowStockLevelEvent } from '../events/low-stock-level.event';

@Injectable()
export class LowLevelStockListener {
  @OnEvent('low-stock-level')
  handleLowLevelStockEvent(event: LowStockLevelEvent) {
    console.log('Low level stock event received');

    console.log(event);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class SocketClientService {
  private clients: Map<number, Socket>;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.clients = new Map();
  }

  async auth(client: Socket) {
    try {
      const token = client.handshake.headers?.authorization?.split(' ') || [];

      if (token[0]?.toLocaleLowerCase() !== 'bearer') {
        throw new Error('Bearer token malformed');
      }
      if (!token[1]) {
        throw new Error('Authorization token missing');
      }

      const payload = await this.jwtService.verifyAsync<any>(token[1], {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });
      client.session = payload;
    } catch (error) {
      client.emit('auth/error', {
        message: error.message || 'Something went wrong',
      });
      return false;
    }
    return true;
  }

  addClient(id: number, client: Socket) {
    this.clients.set(id, client);
  }

  getClient(id: number) {
    return this.clients.get(id);
  }

  removeClient(id: number) {
    return this.clients.delete(id);
  }
}

import { Body, OnModuleInit, UsePipes, ValidationPipe } from '@nestjs/common';
import { CollectionService } from './collection.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  createCollectionDto,
  updateCollectionDto,
} from './collection.dto/collection.dto';

@WebSocketGateway({ namespace: 'collection' })
export class CollectionController implements OnModuleInit {
  constructor(private readonly collectionService: CollectionService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      //console.log(socket.id);
      //console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: createCollectionDto) {
    // this.server.emit('onMessage', {
    //   msg: 'New Message',
    //   content: body,
    // });
  }

  @SubscribeMessage('createCollection')
  @UsePipes(new ValidationPipe())
  async createCollection(@Body() body: createCollectionDto) {
    const response = await this.collectionService.createCollection(body);
    console.log(response, 'response');
    if (!response) {
      console.log('errr');
    } else {
      this.server.emit('onMessage', {
        msg: 'New Message',
        content: response,
      });
    }
  }

  @SubscribeMessage('updateCollection')
  @UsePipes(new ValidationPipe())
  async updateCollection(@Body() body: updateCollectionDto) {
    const response = await this.collectionService.updateCollection(body);
    console.log(response);
    return !response
      ? false
      : this.server.emit('onMessage', {
          msg: 'New Message',
          content: response,
        });
  }

  @SubscribeMessage('deleteCollection')
  async deleteCollection(@Body() body: any) {
    const response = await this.collectionService.deleteCollection(body);

    return !response
      ? false
      : this.server.emit('onMessage', {
          msg: ' collection deleted',
          content: response,
        });
  }
}

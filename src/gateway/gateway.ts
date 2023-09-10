import { Body, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway(80,{ namespace: 'events' })
@WebSocketGateway({ namespace: 'collections' })
export class MyGateway implements OnModuleInit {
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }

  @SubscribeMessage('createCollection')
  createCollection(@Body() body: any) {
    console.log('createCollection', body);

    //create to database collection and the response is true
    //await create collection in database
    const isCreated = '';

    if (!isCreated) {
      console.log('created');
      return true;
    } else {
      console.log('false');

      return false;
    }
  }

  @SubscribeMessage('createDiv')
  async handleCreateDiv(client: Socket, newDiv: any) {
    try {
      // const createdDiv = await Div.create(newDiv);
      // this.server.emit('divCreated', createdDiv); // Emit the created div to all clients
    } catch (error) {
      console.error('Error creating div:', error.message);
    }
  }
}

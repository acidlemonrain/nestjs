import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private logger = new Logger('ChatGateway');

	afterInit() {
		this.logger.log('initialization!');
	}

	@WebSocketServer() server;
	users: number = 0;
	online = [];
	async handleConnection(client) {
		this.users++;

		console.log('someon in charoom', client.id);
		return this.users;
	}
	//离线处理
	async handleDisconnect(client) {
		// A client has disconnected
		this.users--;
		console.log('someon out charroom', this.users);

		this.server.emit('users', this.users);

		//清除相关在线数据
		this.online = this.online.filter((ele) => {
			return ele != client.user.userid;
		});
		this.server.emit('init', this.online);

		console.log(this.online);
	}
	//聊天功能
	@SubscribeMessage('chat')
	async onChat(client, message) {
		console.log(client.user);
		console.log(message);
		this.server.to(message.chatWith).emit('chat', message);
		return 1;
	}

	//在线验证
	@SubscribeMessage('auth')
	async auth(client, message) {
		client.user = message;
		this.online.push(message.userid);
		client.join(message.userid);

		//如果通过
		//客户端初始数据
		//好友在线数据
		if (1) {
			this.server.emit('init', this.online);
		}
		console.log(this.online);
	}
}

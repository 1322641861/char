<template>
	<view class="teams">
		<view class="status-bar"><!-- 这里是状态栏 --></view>
		<view class="top-nav">
			<nav-bar>
				<scroll-view class="teams-list" scroll-x="true" show-scrollbar="false">
					<view class="team-img" v-for="(item, i) in usersList" :key="item.id">
						<view class="img" @click="openRoom(item)" :style="{backgroundImage: `url(${item.img})`}">
							<view class="point" v-show="item.tip"></view>
						</view>
					</view>
				</scroll-view>
			</nav-bar>
		</view>
		<chat-content :msgList="msgList" :bottomMargins="enterHeight"></chat-content>
		<input-msg v-show="!isOpenRoom" @sendMsg="sendMsg($event)" :img="img" :userName="userName" @putEnterHeight="putEnterHeight($event)"></input-msg>
		<private-room :isOpenRoom="isOpenRoom" @putIsOpenRoom="putIsOpenRoom($event)" :ownInfo="ownInfo" :userInfo="userInfo"
		 @getPutPriSendMsg="getPutPriSendMsg($event)" :privateList="privateMsgList" :privateObj="privateMsgObj"></private-room>
	<!-- 	<custom-popup :isOpenRoom="isOpenRoom" @putIsOpenRoom="putIsOpenRoom($event)" height="-85vh">
			<private-room :userInfo="userInfo"></private-room>
		</custom-popup> -->
	</view>
</template>

<script>
	import navBar from "@/components/nav.vue";
	import utils from "@/utils/utils.js";
	import privateRoom from "@/components/private-room.vue";
	import inputMsg from "@/components/input-msg.vue";
	import chatContent from "@/components/chat-content.vue";
	import customPopup from "@/components/custom-popup/custom-popup.vue"

	export default {
		data() {
			return {
				userName: '',
				img: '',
				member: 0, // 当前在线成员
				msgModel: '',
				msgList: [],
				isOpenRoom: false,
				usersList: [], // 进入群聊的用户列表,
				userInfo: {}, // 私聊用户信息
				ownInfo: {}, // 个人信息
				enterHeight: '85rpx',
				privateMsgList: [], /// 私聊内容
				privateMsgObj: {}, /// 私聊内容合集
			}
		},
		onLoad(query) {
			this.userName = query.name;
			this.img = query.img;
			this.ownInfo = {
				userName: this.userName,
				img: this.img
			}
			this.join();
			this.getMsg();
			this.leave();
			this.getPutPriMsg();
		},
		onBackPress() {},
		onHide() {},
		destroyed() {
			// this.socket.close();
			// this.socket.off('getMsg')
			// this.socket.removeAllListeners()
		},
		components: {
			navBar,
			privateRoom,
			inputMsg,
			chatContent,
			customPopup,
		},
		methods: {
			sendMsg(msg) {
				let msgCopy = utils.deepCopy(msg);
				this.msgList.push(msg);
				this.socket.emit('message', Object.assign(msgCopy, {
					id: 2
				}))
			},
			getMsg() {
				this.socket.on('getMsg', data => {
					this.msgList.push(data);
				})
			},
			join() {
				this.socket.emit('info', {
					name: this.userName,
					img: this.img
				})
				/// uid: 用户唯一id
				this.socket.on('getInfo', (data) => {
					if (!this.ownInfo.uid) {
						Object.assign(this.ownInfo, {uid: data.id});
					}
					this.msgList.push({
						joinMsg: `用户 ${data.name} 进入群聊`,
						id: 3
					});
					this.member = data.member;
				})
				this.socket.on('getUsersList', data => {
					this.usersList = data.filter(x => x.id !== this.ownInfo.uid);
				})
			},
			leave() {
				this.socket.on('leaveRoom', (name, member, usersList) => {
					this.msgList.push({
						joinMsg: `用户 ${name} 退出群聊`,
						id: 3
					});
					this.usersList = usersList;
					this.member = member;
				})
			},
			putEnterHeight(value) {
				this.enterHeight = value;
			},
			
			/****** 开启私人聊天 *******/
			openRoom(item) {
				this.userInfo = item;
				this.initPriMsg(this.userInfo.id);
				this.privateMsgList = this.privateMsgObj[this.userInfo.id];
				this.isOpenRoom = !this.isOpenRoom;
				this.changeUsersTip(this.userInfo.id, false);
			},
			initPriMsg(id) {
				if (!this.privateMsgObj.hasOwnProperty(id)) {
					this.privateMsgObj[id] = [];
				}
			},
			putIsOpenRoom(value) {
				this.isOpenRoom = value;
				this.privateMsgList = [];
			},
			changeUsersTip(id, newMsg = true) {
				this.usersList.map(x => {
					if (x.id === id) {
						x.tip = newMsg;
					}
				})
			},
			getPutPriMsg() {
				this.socket.on('getPrivateMsg', data => {
					this.initPriMsg(data.uid);
					this.privateMsgObj[data.uid].push(data);
					if (!this.isOpenRoom || data.uid !== this.userInfo.id) this.changeUsersTip(data.uid);
				})
			},
			getPutPriSendMsg(value) {
				let msgCopy = utils.deepCopy(value);
				this.privateMsgObj[this.userInfo.id].push(value);
				if (!this.usersList.some(x => x.id === this.userInfo.id)) {
					this.privateMsgObj[this.userInfo.id].push({
						joinMsg: `用户 ${this.userInfo.name} 已下线`,
						id: 3
					});
				} else {
					this.socket.emit('priMessage', Object.assign(msgCopy, {
						id: 2,
						uid: this.ownInfo.uid,
						oid: this.userInfo.id
					}))
				}
			},
			/****** 开启私人聊天 *******/
		}
	}
</script>

<style lang="scss">
	@import "@/uni.scss";
	.status-bar {
        height: var(--status-bar-height);
        width: 100%;
    }
	.teams {
		height: 100vh;
		position: relative;

		.top-nav {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 2;
		}
		
		.teams-list {
			white-space: nowrap;
			width: 100%;
			height: 80rpx;
			.team-img {
				width: 80rpx;
				height: 80rpx;
				display: inline-block;
			}
			.img {
				width: 60rpx;
				height: 60rpx;
				background: #eee 80% center/cover;
				border-radius: 50%;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				.point {
					position: absolute;
					width: 14rpx;
					height: 14rpx;
					border-radius: 50%;
					background-color: #fa3c3c;
					bottom: -5rpx;
					left: 6rpx;
				}
			}
		}

		.bottom-h {
			height: 90rpx;
		}
	}
</style>

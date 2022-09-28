<template>
	<view class="room">
		<uni-popup ref="popup" type="bottom" @maskClick="maskClick()">
			<view class="wrap">
				<view class="top-title">{{userInfo.name}}</view>
				<chat-content ref="privateRoom" :msgList="privateList" topMargins="0rpx" :useScrollBody="false" :height="`calc(${chatRoomHeight} - 80rpx)`"></chat-content>
				<input-msg v-show="userInfo" @sendMsg="sendMsg($event)" :img="ownInfo.img" :userName="ownInfo.userName"></input-msg>
			</view>
		</uni-popup>
		<!-- 自定义下拉框 -->
		<!-- <custom-popup :isOpenRoom="isOpenRoom" @putIsOpenRoom="putIsOpenRoom($event)" :height="'-' + chatRoomHeight">
			<view class="wrap">
				<view class="top-title">{{userInfo.name}}</view>
				<chat-content ref="privateRoom" :msgList="privateList" topMargins="0rpx" :useScrollBody="false" :height="`calc(${chatRoomHeight} - 80rpx)`"></chat-content>
				<input-msg v-show="userInfo" @sendMsg="sendMsg($event)" :img="userInfo.img" :userName="userInfo.name"></input-msg>
			</view>
		</custom-popup> -->
	</view>
</template>

<script>
	import inputMsg from "@/components/input-msg.vue";
	import chatContent from "@/components/chat-content.vue";
	import customPopup from "@/components/custom-popup/custom-popup.vue";
	import utils from "@/utils/utils.js";
	import uniPopup from "@/components/uni-popup/components/uni-popup/uni-popup.vue"
	
	export default {
		name:"private-room",
		props: {
			isOpenRoom:  {
				default: false,
			},
			userInfo: {
				type: Object,
				required: true
			},
			ownInfo: {
				type: Object,
				required: true
			},
			privateList: {
				type: Array
			}
		},
		components: {
			inputMsg,
			chatContent,
			customPopup,
			uniPopup,
		},
		data() {
			return {
				chatRoomHeight: '85vh',
			};
		},
		watch: {
			isOpenRoom: {
				// 数据发生变化就会调用这个函数  
				handler(newVal, oldVal) {
					if (newVal) {
						this.$refs.popup.open();
					}
				},
			}
		},
		methods: {
			maskClick() {
				this.$emit('putIsOpenRoom', false);
			},
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
				this.mescroll.optUp.use = false;
			},
			sendMsg(value) {
				this.$emit('getPutPriSendMsg', value);
			},
			putIsOpenRoom(value) {
				this.$emit('putIsOpenRoom', value)
			},
		}
	}
</script>

<style lang="scss">
	.wrap {
		height: 85vh;
		.top-title {
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 35rpx 35rpx 0 0;
			overflow: hidden;
			background-color: $uni-text-color-inverse;
			border-bottom: 2rpx solid $uni-border-color;
		}
		
		.msg-content {
			// height: calc(100vh - 85px);
			background-color: $uni-text-color-inverse;
			.join-text {
				font-size: 12rpx;
				text-align: center;
		
				.join-msg {
					display: inline-block;
					margin: 16rpx auto;
					background-color: $uni-bg-color-grey;
					padding: 3rpx 12rpx;
					border-radius: 5rpx;
					color: $uni-text-color-small;
					font-size: 22rpx;
				}
			}
		
			.mine {
				display: flex;
				padding: 12rpx 12rpx 12rpx;
		
				.mine-img {
					width: 60rpx;
					height: 60rpx;
					background: #eee 80% center/cover;
					border-radius: 50%;
					margin-right: 12rpx;
				}
			}
		
			.other {
				flex-flow: row-reverse;
		
				.other-img {
					margin-right: 0;
					margin-left: 12rpx;
				}
			}
		}
	}
</style>
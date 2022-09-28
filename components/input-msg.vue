<template>
	<view class="enter-content">
		<!-- <input class="team-input" @input="inputName()" v-model="msgModel" /> -->
		<textarea class="team-input" @blur="blurFn" @input="inputName()" v-model="msgModel" auto-height />
		<image src="/static/tool/send.png" mode="" @click="sendMsg()"></image>
	</view>
</template>

<script>
	import utils from "@/utils/utils.js";
	
	export default {
		name:"input-msg",
		props: {
			img: {
				required: true,
				type: String
			},
			userName: {
				required: true,
				type: String
			},
		},
		data() {
			return {
				msgModel: '',
				msgList: [],
				enterHeight: '', // 输入框高度
			};
		},
		methods: {
			sendMsg() {
				if (!this.msgModel) return;
				let msg = {
					name: this.userName,
					id: 1, // 1我 2其他人 3加入/退出群聊
					time: new Date(),
					img: this.img,
					msg: this.msgModel
				};
				this.$emit('sendMsg', msg);
				this.msgModel = '';
			},
			getEnterHeight() {
				this.getEnterHeight()
			},
			inputName: utils.debounce(function() {
				this.getEnterHeight()
			}),
			getEnterHeight() {
				let wrap = uni.createSelectorQuery().select(".enter-content");
				wrap.boundingClientRect((res) => {
					this.enterHeight = res.height * 2 + 'rpx';
					this.$emit('putEnterHeight', this.enterHeight);
				}).exec()
				wrap = null;
			},
			blurFn(e) {
				this.getEnterHeight();
			},
		}
	}
</script>

<style lang="scss">
	.enter-content {
		position: fixed;
		width: 100%;
		bottom: 0;
		padding: 16rpx 12rpx;
		display: flex;
		justify-content: space-between;
		background-color: $uni-bg-color-grey;
		align-items: center;
		box-sizing: border-box;
		z-index: 10;

		.team-input {
			background-color: $uni-text-color-inverse;
			margin-right: 12rpx;
			height: 70rpx;
			padding: 0 8rpx;
			border-radius: 8rpx;
			flex: 1;
			padding: 8rpx 4rpx;
		}

		image {
			width: 50rpx;
			height: 50rpx;
			padding: 0 5rpx;
		}
	}
</style>
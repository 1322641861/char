<template>
	<view class="triangle">
		<view class="left mine-bg tri-view" v-if="triType == 'left'">{{content}}</view>
		<view class="right other-bg tri-view" v-else-if="triType == 'right'">{{content}}</view>
	</view>
</template>

<script>
	export default {
		name:"triangle",
		props: {
			triType: {
				type: String,
				default: 'left' // left right
			},
			content: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import "@/uni.scss";
	.triangle {
		position: relative;
		.tri-view {
			border-radius: 10rpx;
			padding: 16rpx;
			display: inline-block;
			font-size: 28rpx;
			line-height: 40rpx;
			word-break: break-word;
		}
		.left {
			margin-left: 4rpx;
			&::before {
				content: '';
				width: 0;
				height: 0;
				position: absolute;
				left: -17rpx;
				top: 50%;
				transform: translateY(-50%);
				border: 11rpx solid transparent;
				border-right-color: $uni-bg-color-chat-mine;
			}
		}
		.right {
			margin-right: 4rpx;
			text-align: left;
			&::after {
				content: '';
				width: 0;
				height: 0;
				position: absolute;
				right: -17rpx;
				top: 50%;
				transform: translateY(-50%);
				border: 11rpx solid transparent;
				border-left-color: $uni-bg-color-chat-other;
			}
		}
	}
	.mine-bg {
		background: $uni-bg-color-chat-mine;
	}
	.other-bg {
		background: $uni-bg-color-chat-other;
	}
</style>
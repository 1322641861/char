<template>
	<view class="nav">
		<view class="left-back" @click="goBack()">
			<image src="/static/tool/back.png" mode=""></image>
		</view>
		<view class="title" v-if="!title">
			<slot></slot>
		</view>
		<view class="title" v-else>{{title}}</view>
		<view class="right-back" v-show="title"></view>
	</view>
</template>

<script>
	export default {
		name:"navBar",
		props: ["title"],
		data() {
			return {
				
			};
		},
		methods: {
			goBack: function() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	@import "@/uni.scss";
	.nav {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: $uni-bg-color-grey;
		.left-back {
			width: 100rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 25rpx;
				height: 50%;
				padding-right: 8rpx;
			}
		}
		.title {
			flex: 1;
			overflow: hidden;
		}
		.right-back {
			width: 100rpx;
		}
	}
</style>
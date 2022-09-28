<template>
	<view>
		<mescroll-body :topbar='true' v-if="useScrollBody" :top="topMargins" :bottom="bottomMargins" class="msg-content" @init="mescrollInit" @down="downCallback" isBounce="true">
			<!-- <view :style="{'height': topMargins}"></view> -->
			<view class="wrap" v-show="msgList.length" v-for="(item,i) in msgList" :key="'item' + i">
				<view class="join-text" v-if="item && item.id === 3">
					<view class="join-msg">{{item.joinMsg}}</view>
				</view>
				<view class="mine" v-else-if="item && item.id === 1">
					<view class="mine-img" :style="{'background-image': `url(${item.img})`}"></view>
					<view class="content content-mine">
						<view class="name name-mine">我</view>
						<triangle-component :content="item.msg"></triangle-component>
						<view class="date">{{getDate(item.time)}}</view>
					</view>
				</view>
				<view class="mine other" v-else-if="item && item.id === 2">
					<view class="mine-img other-img" :style="{'background-image': `url(${item.img})`}"></view>
					<view class="content">
						<view class="name">{{item.name}}</view>
						<triangle-component :content="item.msg" triType="right"></triangle-component>
						<view class="date">{{getDate(item.time)}}</view>
					</view>
				</view>
			</view>
			<!-- <view class="bottom-h-1" :style="{'height': bottomMargins}"></view> -->
		</mescroll-body>
		<mescroll-uni class="msg-content custom-scroll" v-else :fixed="false" :style="{'height': height}" @init="mescrollInit" @down="downCallback" isBounce="true">
			<view :style="{'height': topMargins}"></view>
			<view class="wrap" v-show="msgList.length" v-for="(item,i) in msgList" :key="'item' + i">
				<view class="join-text" v-if="item && item.id === 3">
					<view class="join-msg">{{item.joinMsg}}</view>
				</view>
				<view class="mine" v-else-if="item && item.id === 1">
					<view class="mine-img" :style="{'background-image': `url(${item.img})`}"></view>
					<view class="content content-mine">
						<view class="name name-mine">我</view>
						<triangle-component :content="item.msg"></triangle-component>
						<view class="date">{{getDate(item.time)}}</view>
					</view>
				</view>
				<view class="mine other" v-else-if="item && item.id === 2">
					<view class="mine-img other-img" :style="{'background-image': `url(${item.img})`}"></view>
					<view class="content">
						<view class="name">{{item.name}}</view>
						<triangle-component :content="item.msg" triType="right"></triangle-component>
						<view class="date">{{getDate(item.time)}}</view>
					</view>
				</view>
			</view>
			<view class="bottom-h-1" :style="{'height': bottomMargins}"></view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import utils from "@/utils/utils.js";
	import triangleComponent from "@/components/triangle.vue";
	
	export default {
		name: "chat-content",
		props: {
			msgList: {
				// default: []
				type: Array,
			},
			topMargins: {
				default: '80rpx'
			},
			bottomMargins: {
				default: '85rpx'
			},
			useScrollBody: {
				default: true
			},
			height: {
				default: '80rpx'
			},
		},
		mixins: [MescrollMixin], // 使用mixin
		watch: {
			msgList: {
				handler(newVal, oldVal) {
					this.gotoPosition();
				},
				// 立即处理 进入页面就触发
				immediate: true
			}
		},
		components: {
			triangleComponent
		},
		data() {
			return {
				
			};
		},
		methods: {
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
				this.mescroll.optUp.use = false;
			},
			/*下拉刷新的回调, 重置列表为第一页 (此处可删,mixins已默认)
			downCallback(){
				this.mescroll.resetUpScroll();
			},
			*/
			getDate(date) {
				return utils.timeDetia(date);
			},
			/// 页面滚动
			gotoPosition() {
				// const wrap3 = uni.createSelectorQuery().select(".bottom-h-1");
				// wrap3.boundingClientRect((res) => {
				// 	console.log(res);
				// 	uni.pageScrollTo({
				// 		duration: 0,
				// 		// scrollTop: res.top,
				// 		scrollTop: 399
				// 	})
				// }).exec()
				// this.mescroll.scrollTo('.bottom-h-1', 50)
				setTimeout(() => {
					this.mescroll && this.mescroll.scrollTo(99999, 0)
				}, 0)
			},
		}
	}
</script>

<style lang="scss">
	.custom-scroll {
		overflow-y: auto;
	}
	.msg-content {
		background-color: $uni-text-color-inverse;
		.join-text {
			font-size: 27rpx;
			text-align: center;

			.join-msg {
				display: inline-block;
				margin: 16rpx auto;
				background-color: $uni-bg-color-grey;
				padding: 3rpx 12rpx;
				border-radius: 5rpx;
				color: $uni-text-color-small;
				font-size: 27rpx;
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

	.triangle-left {}

	.content {
		text-align: right;
		flex: 1;

		.name,
		.date {
			font-size: 24rpx;
			color: $uni-text-color-grey;
		}
	}

	.content-mine {
		text-align: left;
		flex: 1;
	}

	.bottom-h {
		height: 90rpx;
	}
</style>

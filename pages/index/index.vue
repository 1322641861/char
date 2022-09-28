<template>
	<view class="content">
		<view class="title">欢迎来到chat聊天室</view>
		<view class="avatar" @click="openSelectImg()">
			<!-- <image class="avatar-img" src="../../static/1.jpg" mode=""></image> -->
			<view v-show="avatarImgList.length" class="avatar-img" :style="{'background-image': `url(${avatarImgList[avatarIndex]})`}"></view>
			<image class="right-more" src="/static/tool/more.png"></image>
		</view>
		<view class="name">
			<input class="uni-input" @input="inputName()" v-model="nameModel" placeholder="请输入用户名" />
		</view>
		<view class="name-tip" v-show="nameTip">注: {{nameTip}}</view>
		<view class="join">
			<view class="join-text" @click="joinToTeams()">join</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="select">
				<view class="top-nav">选择头像</view>
				<view class="select-content">
					<view class="avatar-item" @tap="selectImg(i)" :class="{'avatar-selected': i==avatarIndex}" v-for="(item, i) in avatarImgList" :key="'item' + i">
						<view class="img" :style="{backgroundImage: `url(${item})`}"></view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				nameModel: '',
				avatarImgList: [],
				avatarIndex: 0,
				nameTip: '',
			}
		},
		components: {
			uniPopup
		},
		onLoad() {
			this.avatarImgList = new Array(11).fill(0).map((x, y) => {return x = `/static/${y + 1}.jpg`});
		},
		methods: {
			joinToTeams: function() {
				if (!this.nameModel) {
					this.nameTip = '用户名不能为空'
					return;
				}
				uni.navigateTo({
					url: `../teams/teams?name=${this.nameModel}&img=${this.avatarImgList[this.avatarIndex]}`
				})
			},
			openSelectImg() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open();
			},
			selectImg(index) {
				this.avatarIndex = index;
				this.$refs.popup.close();
			},
			inputName() {
				this.nameTip = !this.nameModel ? '用户名不能为空' : '';
			}
		}
	}
</script>

<style lang="scss">
	@import "@/uni.scss";

	.content {
		position: relative;
		height: 100vh;

		.title {
			padding-top: 20%;
			text-align: center;
			color: $uni-theme-color;
			font-weight: bold;
			font-size: 34rpx;
		}
		.avatar {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 40rpx;
		}

		.avatar-img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			background: #eee 80% center/cover;
			// margin-right: 8rpx;
		}

		.right-more {
			width: 54rpx;
			height: 50rpx;
		}
		
		.name {
			margin: 100rpx 20rpx 0;
			border: 1rpx solid #eee;
			border-radius: 40rpx;
			.uni-input {
				height: 80rpx;
				line-height: 80rpx;
				padding: 0 10rpx;
				text-align: center;
			}
		}

		.join {
			position: absolute;
			width: 100%;
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
			color: $uni-text-color-inverse;
			bottom: 80rpx;
			.join-text {
				margin: 0 20rpx;
				background-color: $uni-theme-color;
				border-radius: 40rpx;
			}
		}
		.name-tip {
			color: $uni-color-error;
			font-size: 24rpx;
			padding-left: 22rpx;
			padding-top: 12rpx;
		}
		
		.select {
			.top-nav {
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 30rpx 30rpx 0 0;
				overflow: hidden;
				background-color: $uni-text-color-inverse;
			}
			.select-content {
				background-color: $uni-text-color-inverse;
				display: flex;
				white-space: normal;
				flex-wrap: wrap;
				padding: 0 12rpx 30rpx;
			}
			.avatar-item {
				width: calc((100vw - 24rpx)/4);
				height: calc((100vw - 24rpx)/4);
				border: 1rpx solid $uni-text-color-inverse;
				border-radius: 8rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				.img {
					width: 80%;
					height: 80%;
					text-align: center;
					background: #eee 80% center/cover;
					border-radius: 50%;
				}
			}
			.avatar-selected {
				border: 2rpx solid $uni-theme-color;
			}
		}
	}
</style>

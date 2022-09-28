<template>
	<view class="popup" v-if="isOpenRoom">
		<view class="mask" :class="{'mask-show': showAnimate}" @click="close()"></view>
		<view class="wrap" :style="{'transform': showAnimate ? `translateY(${height})` : 'translateY(0)'}">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"custom-popup",
		props: {
			height: {
				default: '-60vh',
			},
			isOpenRoom: {
				default: false
			}
		},
		watch: {
			isOpenRoom: {
				handler(p, n) {
					setTimeout(() => {
						this.showAnimate = p;
					})
				}
			}
		},
		data() {
			return {
				showAnimate: false,
			};
		},
		methods: {
			close() {
				this.showAnimate = false;
				setTimeout(() => {
					this.$emit('putIsOpenRoom', false);
				}, 400)
			}
		},
	}
</script>

<style lang="scss">
	@import "@/uni.scss";
	
	.popup {
		position: fixed;
		height: 100vh;
		width: 100vw;
		top: 0;
		z-index: 9;
		overflow: hidden;
		
		.mask {
			height: 100vh;
			opacity: 0;
			background-color: $uni-bg-color-mask;
			transition: .3s;
		}
		.mask-show {
			opacity: 1;
		}
		
		.wrap {
			position: absolute;
			// height: 100vh;
			// background-color: #fff;
			// top: 100vh;
			left: 0;
			right: 0;
			transition: .3s;
		}
		
		.wrap-show {
			transform: translateY(-60vh);
		}
	}
</style>
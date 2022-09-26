<template>
	<div>
		<section>
			<div class="bgPluse">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</section>
		<h1 class="title">
			诗词知识图谱可视化平台
		</h1>
		<div >
			<!-- <el-button type="primary" :loading="false" class='btnstyle'>加载中</el-button> -->
			<!-- <el-button round class='btnstyle'>圆角按钮</el-button> -->
			<el-button class='btnstyle' 		    
					   round
					   @click="LoginHome"
			>
				开始探索
			</el-button>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			loading:"false"
		}
	},
	methods:{
		LoginHome:function(){
			
			this.$router.push('./primary1')
		
		}
	},
}

</script>


<style scoped>
	body{
		margin: 0;
		padding: 0;
	}
	
	section{
		position: absolute;
		width:100%;
		height: 100%;
		
		overflow: hidden;
		animation: bgColor 20s linear infinite;
	}
	.bgPluse{
		width:100%;
		height:100%;
	}
	.bgPluse span{
		position: absolute;
		width: 80px;
		height: 80px;
		background: #fff;
		
	}
	.bgPluse span:nth-child(3n+1){
		background: transparent;
		border: 5px solid #fff;
	}
	.bgPluse span:nth-child(1){
		top: 50%;
		left: 20%;
		animation: animate 10s linear infinite;
	}
	.bgPluse span:nth-child(2){
		top: 80%;
		left: 40%;
		animation: animate 12s linear infinite;
	}
	.bgPluse span:nth-child(3){
		top: 10%;
		left: 65%;
		animation: animate 15s linear infinite;
	}
	.bgPluse span:nth-child(4){
		top: 50%;
		left: 70%;
		animation: animate 6s linear infinite;
	}
	.bgPluse span:nth-child(5){
		top: 10%;
		left: 30%;
		animation: animate 9s linear infinite;
	}
	.bgPluse span:nth-child(6){
		top: 90%;
		left: 95%;
		animation: animate 8s linear infinite;
	}
	.bgPluse span:nth-child(7){
		top: 80%;
		left: 5%;
		animation: animate 5s linear infinite;
	}
	.bgPluse span:nth-child(8){
		top: 35%;
		left: 50%;
		animation: animate 14s linear infinite;
	}
	.bgPluse span:nth-child(9){
		top: 5%;
		left: 5%;
		animation: animate 11s linear infinite;
	}
	.bgPluse span:nth-child(10){
		top: 25%;
		left: 90%;
		animation: animate 10s linear infinite;
	}
	@keyframes animate{
		0%
		{
			transform: scale(0) translateY(0) rotate(0deg);
			opacity: 1;
		}
		100%
		{
			transform: scale(1) translateY(-100px) rotate(360deg);
			opacity: 0;
		}
	}
	@keyframes bgColor{
		
		0%
		{
			background: #f4b8ac;
		}
		25%
		{
			background: #03A9F4;
		}
		50%
		{
			background: #9C28B0;
		}
		75%
		{
			background: #00dd0a;
		}
		100%
		{
			background: #f4b8ac;
		}
		
	}
	.btnstyle{
		position: absolute;
		top:60%;
		left: 48%;
		font-size: 20px;
		
		
	}
	.title{
		position: absolute;
		top:30%;
		left: 23%;
		font-size: 80px;
		font-family: "Helvetica Neue";
		
	}
</style>

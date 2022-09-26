<template>
	<div class="homepage">
		<el-container>
		  <el-header>
			<h2 class="homepagetitle">基于知识图谱的诗词可视化</h2>
			<el-menu
			  :default-active="this.$route.path" router
			  class="el-menu-demo mymenu"
			  mode="horizontal">
				<el-submenu index="/primary1">
					<template slot="title">课内阅读</template>
					<el-menu-item index="/primary1">小学</el-menu-item>
					<el-menu-item index="/junior1">初中</el-menu-item>
					<el-menu-item index="/high1">高中</el-menu-item>
				</el-submenu>
			    <el-submenu index="/chunjie">
					<template slot="title">课外阅读</template>
					<el-menu-item index="/chunjie">节日</el-menu-item>
					<el-menu-item index="/chuntian">季节</el-menu-item>
					<el-menu-item index="/changjiang">景物</el-menu-item>
					<el-menu-item index="/aiguo">情感</el-menu-item>
					<el-menu-item index="/haofang">风格</el-menu-item>
					<el-menu-item index="/laoshi">人物</el-menu-item>
					<el-menu-item index="/zhanzheng">其他</el-menu-item>
				</el-submenu>
				<el-menu-item index="/gaokao">高考必背</el-menu-item>
				<el-menu-item index="/tang">诗人信息</el-menu-item>
				<el-submenu index="/tangmap">
					<template slot="title">籍贯地图</template>
					<el-menu-item index="/tangmap">唐代</el-menu-item>
					<el-menu-item index="/songmap">宋代</el-menu-item>
				</el-submenu>
				<el-menu-item index="/shoucang">诗词收藏</el-menu-item>
				<el-menu-item index="/" @click='toLogin'>回到首页</el-menu-item>
			</el-menu>
		  </el-header>
		  <el-main>
			  <router-view></router-view>
		  </el-main>
		</el-container>
	</div>
</template>

<script>
export default{
	data(){
		return {
			
		}
	},
	
	methods:{
		
		handleSelect:function(){
			this.$router.push()
		},
		toLogin:function(){
			
		}
	}
}
</script>

<style scoped>
	.homepagetitle{
		position: absolute;
		margin-top:0;
		
		font-family:'LiDeBiao-Xing3275ed1d6ca23328';
	}
	/* .homepage{
		position: relative;
		width: 100%;
		height: 100%;
	} */
	.el-header {
	    background-color: #ffffff;
	    color: #333;
	    text-align: center;
	    line-height: 50px;
	  }
	 body > .el-container {
	    margin-bottom:auto;
	  }
	  .el-container:nth-child(5) .el-aside,
	  .el-container:nth-child(6) .el-aside {
	    line-height: 260px;
	  }
	  
	  .el-container:nth-child(7) .el-aside {
	    line-height: 320px;
	  }
	  .el-main {
	      background-color: #E9EEF3;
	      color: #333;
	      text-align: center;
	      /* line-height: 160px; */
	    }
		.mymenu{
			margin:0px auto;
			margin-right: 0; 
			/* padding-left: 40%; */
			width:50rem ;
			
		}
</style>

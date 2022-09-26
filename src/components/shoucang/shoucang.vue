<template>
	<div>
		<section class="mainbox">
			<div class="column">
				<div class="ciyun">
					<div class="chart">
						<h2>动态词云图</h2>
						<div id="wrap">
						            <a href="#/primary1" class="tag">李白</a>
						            <a href="#/primary1" class="tag">唐代</a>
						            <a href="#/primary1" class="tag">静夜思</a>
						            <a href="#/primary1" class="tag">赠汪伦</a>
						            <a href="#/primary1" class="tag">白居易</a>
						            <a href="#/primary1" class="tag">宋代</a>
						            <a href="#/primary1" class="tag">春晓</a>
						            <a href="#/primary1" class="tag">孟浩然</a>
						            <a href="#/primary1" class="tag">杨万里</a>
						            <a href="#/primary1" class="tag">小池</a>
						            <a href="#/primary1" class="tag">悯农二首·其二</a>
						            <a href="#/primary1" class="tag">古朗月行（节选）</a>
						            <a href="#/primary1" class="tag">骆宾王</a>
						</div>
					</div>
				</div>
				
				<div class="pie">
					
					<div id="piechart" class="piechart"></div>
				</div>
			</div>
			
			<div class="column">
				<div class="btnlist">
					<div id="leibie">
					</div>
					<div id="search">
					<input type="text" placeholder="请输入您要搜索的内容...">
					
					</div>
				</div>
				<svg id="graph"> </svg>
				<div id="mode">
					<span class="active" style="border-top-right-radius:0;border-bottom-right-radius:0;">节点</span>
					<span style="border-top-left-radius:0;border-bottom-left-radius:0;position:relative;left:-5px;">文字</span>
					<span style="border-top-left-radius:0;border-bottom-left-radius:0;position:relative;left:-10px;">全选</span>
				</div>
				
				<div id="zoombtn">
					<el-button class="zoomBtn" id="zoom_in" type="primary" icon="el-icon-plus" circle></el-button>
					<el-button class="zoomBtn" id="zoom_out" type="primary" icon="el-icon-minus" circle></el-button>
					<!-- <button class="zoomBtn" id="zoom_in">+</button>
					<button class="zoomBtn" id="zoom_out">-</button> -->
				</div>
			</div>
			<div class="column" id="tip">
				<div>
				<div>
					<img src="" alt="" class="myimg"/>
				</div>
				<div id="info1">
					<h4></h4>
				</div>
				</div>
			</div>
		</section>
		
	</div>
</template>

<script>
// import "./js.js";
import echarts from 'echarts';
import d3 from 'd3';
import $ from 'jquery';

export default{
	
	methods:{
		initciyun(){
			const  _baseAngle = Math.PI /  300,
			        R = 100;
			let speed = 0.05,
			    angleX = speed * _baseAngle,
			    angleY = -speed * _baseAngle,
			    _focalLength = R * 1.5;
			
			function Initialization(options) {
			    this.options = options;
			    this.container = options.container;
			    this.dataArr = options.data;
			    this.init();
			}
			
			Initialization.prototype.init = function() {
			    let len = this.dataArr.length;
			    let newTags = [];
			
			    for(let i = 0; i < len; i++) {
			        var angleA =  Math.acos((2*(i+1) - 1)/len - 1);
			        var angleB = angleA * Math.sqrt(len * Math.PI);
			        var z = R * Math.cos(angleA);
			        var y = R * Math.sin(angleA) * Math.sin(angleB);
			        var x = R * Math.sin(angleA) * Math.cos(angleB);
			        var color = '#' + Math.floor(Math.random()* 0xffffff).toString(16);
			        this.dataArr[i].style.color = color;
			        var newtag = new Tag(this.dataArr[i], x, y, z, this.options);
			        newtag.move();
			        newTags.push(newtag);
			        this.animate();
			    }
			    this.newTags = newTags;
			}
			
			
			Initialization.prototype.rotateX =  function() {
			     let cos = Math.cos(angleX),
			        sin = Math.sin(angleX);
			    this.newTags.forEach((tag) => {
			        let y = tag.y * cos - tag.z * sin,
			            z = tag.z*cos + tag.y * sin;
			        tag.y = y;
			        tag.z = z;
			    });
			
			}
			
			Initialization.prototype.rotateY = function() {
			    let cos = Math.cos(angleY),
			        sin = Math.sin(angleY);
			    this.newTags.forEach((tag) => {
			        let x = tag.x * cos - tag.z * sin,
			            z = tag.z*cos + tag.x * sin;
			        tag.x = x;
			        tag.z = z;
			    });
			}
			Initialization.prototype.animate = function() {
			    var that = this;
			    setInterval(function() {
			        that.rotateX();
			        that.rotateY();
			        that.newTags.forEach((tag)=> {
			            tag.move();
			
			        })
			    }, 20);
			
			
			}
			function Tag(data, x, y, z, options) {
			    this.options = options;
			    this.dataArr = options.data;
			    this.data = data;
			    this.x = x;
			    this.y = y;
			    this.z = z;
			}
			Tag.prototype.move = function() {
			    var len = this.dataArr.length;
			    var scale = _focalLength /(_focalLength  - this.z);
			    var alpha = (this.z +  R)/(2 * R);
			    // console.log(this.x);
			    this.data.style.left =  this.x + 'px';
			    this.data.style.top =  this.y + 'px';
			    this.data.style.fontSize = 10 * scale + 'px';
			    this.data.style.opacity = alpha + 0.5;
			}
			$(document).ready(function(){
				setTimeout(function(){
					let tags = document.getElementsByTagName('a');
					let wrap = document.getElementById('wrap');
					
					let options = {
					    data: tags,
					    container: wrap
					}
					let tagCloud = new Initialization(options);
					document.addEventListener('mousemove', function(e) {
					
					     angleY = 2 * (e.clientX/ document.body.getBoundingClientRect().width- 0.5) * speed  * _baseAngle;
					     angleX = 2 * (e.clientY/ document.body.getBoundingClientRect().height - 0.5) * speed  * _baseAngle;
					
					
					})
				},0);
			}),
			window.onload = function() {
			   
			}
			},
		
		formatTooltip(val){
			this.directionvalue=(this.value/50);
			console.log(this.directionvalue);
		},
		
		initGraph(){
					
		},
		
		initPie(){
			var echarts = require('echarts');
			var mychart = echarts.init(document.getElementById('piechart'));
			mychart.setOption({
				title: {
				        text: '各朝代诗词数量统计',
				        subtext: '',
				        left: 'center'
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b} : {c} ({d}%)'
				    },
				    legend: {
				        top: 'bottom'
				    },
				    series: [
				        {
				            name: '诗词数量',
				            type: 'pie',
				            radius: ["10%", "70%"],
				            center: ['50%', '50%'],
				            roseType: 'area',
				            itemStyle: {
				                borderRadius: 8
				            },
							label:{
								fontsize:5
							},
							labelLine:{
								length:2,
								length2:5
							},
				            data: [
				                {value: 10, name: '唐代'},
				                {value: 3, name: '宋代'},
				                
				                {value: 1, name: '明代'},
				                
				            ]
				        }
				    ]
			})
		},
		
		
	},

	mounted() {
		this.initciyun();
		this.initGraph();
		this.initPie();
		
	}
}
</script>

<style scoped>
#tip {
			display: none;
			width: 350px;
			height: 580px;
			position: absolute;
			top: 155px;
			right: 0px;
			background:#f0f2f5;
			border-radius:1.25rem;
			margin-right:13px;
			float:right;
			
		}



.chart{
	border-radius: 1.25rem;
	background-color:#FFFFFF ;
	height: 330px ;
	/* position:relative;
	width:200px; 
	height:200px; 
	top:50%;
	left:50%; */
}
#wrap {
                position: relative;
                left: 150px;
                top:  90px;
				/* overflow: auto; */
                /*text-align: center;*/
 }
#wrap .tag {
                display: block;
                position:absolute;
				overflow: hidden;
                /*width: 50px;*/
                height: 50px;
                line-height: 50px;
                font-size: 10px;
                text-decoration: none;
				
                /*left: 10px;*/
                /* margin: 10px; */
            }
	
#zoombtn{
	float: right;
	width: 12.5rem;
}	

.mainbox{
	display: flex;
	/* width: 100%; */
	height:100%;
	/* min-width: 64rem;
	max-width: 120rem; */
	margin:0 auto;
	background-color:  #e9eef3;
}
.column{
	height: 44.0625rem;
	flex:2;
	/* background-color: #0000FF; */
}
.column:nth-child(2){
	flex:7;
	border-radius: 1.25rem;
	margin-left: 0.3125rem;
	margin-right: 0.3125rem;
	background-color: #ffffff;
}
.ciyun{
	height: 18.75rem;
	padding:0 10px 40px;
	background-color:  #e9eef3;
	margin-bottom: 15px;
}

.pie{
	height: 19.375rem;
	padding:0 10px 40px;
	/* background-color: #00DD0A; */
	
}
.piechart{
	width: 20.75rem;
	height: 350px;
	border-radius: 1.25rem;
	background-color: #FFFFFF;
}
h2{
	height: 2.5rem;
	line-height: 2.5rem;
	text-align: center;
	margin-top: 0;
	color: #333333;
	font-size: 20px;
	font-weight: 400;
}

.btnlist{
	position: relative;
	height: 100px;
}
.btn{
	position: absolute;
	top:1.625rem;
}
.btn:first-child{
	left:0.625rem;
}
.btn:nth-child(2){
	left:5.5rem;
}
.btn:nth-child(3){
	left: 10.5rem;
}
.btn:nth-child(4){
	left: 15.5rem;
}
.btn:nth-child(5){
	left: 20.5rem;
}
.btn:nth-child(6){
	left: 25.5rem;
}
svg{
	height: 550px;
	width: 100%;
	background-color: #ffffff;
}

#info1{
	border-radius: 1.25rem;
	margin: 1.25rem auto 0;
	height: 16.75rem;
	width: 20.75rem;
	background-color: #FFFFFF;
	overflow: auto;

}
#info1 p{
	height: 1.375rem;
	line-height:1rem;
	font-family: "Hiragino Sans GB";
	overflow: auto;
}
h4{
	font-family: "Hiragino Sans GB";
}
	
img{
	height: 16.75rem;
	width: 18.75rem;
	border-radius:1.25rem;
}
#mode span {	
				border-radius: 0.5rem;
				float: left;
				
				margin-top:0.1875rem;
				/* display: inline-block; */
				border: 1px solid #fff;
				color: #fff;
				padding: 6px 6px;
				background-color:#5eadff;
				font-size: 14px;
				transition: color, background-color .3s;
				-o-transition: color, background-color .3s;
				-ms-transition: color, background-color .3s;
				-moz-transition: color, background-color .3s;
				-webkit-transition: color, background-color .3s;
		}

#mode span.active, #mode span:hover {
				background-color: #5470c6;
				color: #333;
				border-radius: 0.5rem;
				cursor: pointer;
		}

input{
    width: 250px;
	border-radius: 42px;
	/* border: 2px solid ##f0f2f5; */
	background: #FFFFff;
	height: 42px;
	padding-left: 13px;
	outline:none;
	font-family: "Hiragino Sans GB";
	margin-bottom: 0.625rem;
}
/*ciyun style*/
#searchimg{
	/* position: absolute; 
	top:12.4%;
	right: 1.9%; */
	position: absolute;
	width: 2.8125rem;
	height: 2.8125rem;
	/* float: right; */
	border-radius: 50%;
	/* padding-top: 30px; */
	/* padding:20px; */
}
#leibie{
	flex:7;
}
#search{
	flex:2;
	float: right;
	margin-left:500px;
	margin-top: 17px; 
	position: relative;
	/* margin-top: 20px; */
	/* padding:0px; */
	
}
</style>

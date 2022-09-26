<template>
	<div>
		<section class="mainbox">
			<div class="column">
				<div class="ciyun">
					<div class="chart">
						<h2>动态词云图</h2>
						<div id="wrap">
						            <a href="#/primary1" class="tag">楚宫</a>
						            <a href="#/primary1" class="tag">李商隐</a>
						            <a href="#/primary1" class="tag">别房太尉墓</a>
						            <a href="#/primary1" class="tag">霜叶飞·重九</a>
						            <a href="#/primary1" class="tag">书琵琶背</a>
						            <a href="#/primary1" class="tag">思旧赋</a>
						            <a href="#/primary1" class="tag">悼室人</a>
						            <a href="#/primary1" class="tag">九歌·国殇</a>
						            <a href="#/primary1" class="tag">祭十二郎文</a>
						            <a href="#/primary1" class="tag">韩愈</a>
						            <a href="#/primary1" class="tag">悼室人</a>
						            <a href="#/primary1" class="tag">绿衣</a>
						            <a href="#/primary1" class="tag">屈原</a>
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
						<el-button class="btn" round type="mini" @click="toaiguo">爱国</el-button>
						<el-button class="btn" round type="mini" @click="toaiqing">爱情</el-button>
						<el-button class="btn" round type="mini" @click="todaowang">悼亡</el-button>
						<el-button class="btn" round type="mini" @click="tolibie">离别</el-button>
						<el-button class="btn" round type="mini" @click="tolizhi">励志</el-button>
						<el-button class="btn" round type="mini" @click="tosinian">思念</el-button>
						<el-button class="btn" round type="mini" @click="tosixiang">思乡</el-button>
						<el-button class="btn" round type="mini" @click="tosongbie">送别</el-button>
						<el-button class="btn" round type="mini" @click="toyouguoyoumin">忧国忧民</el-button>
						<el-button class="btn" round type="mini" @click="toyouqing">友情</el-button>					</div>
					<div id="search">
					<input type="text" placeholder="请输入您要搜索的内容...">
					<!-- <img id="searchimg" src="../../../../static/img/搜索框.jpeg" /> -->
					</div>
				</div>
				<svg id="graph"> </svg>
				<div id="mode">
					<span class="active" style="border-top-right-radius:0;border-bottom-right-radius:0;">节点</span>
					<span style="border-top-left-radius:0;border-bottom-left-radius:0;position:relative;left:-5px;">文字</span>
					<span style="border-top-left-radius:0;border-bottom-left-radius:0;position:relative;left:-10px;">全选</span>
				</div>
				<h2 style="display: inline-block;">悼亡</h2>
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



		toaiguo:function(){
			this.$router.push('./aiguo')
		},
		toaiqing:function(){
			this.$router.push('./aiqing')
		},
		todaowang:function(){
			this.$router.push('./daowang')
		},
		tolibie:function(){
			this.$router.push('./libie')
		},
		tolizhi:function(){
			this.$router.push('./lizhi')
		},
		tosinian:function(){
			this.$router.push('./sinian')
		},
		tosixiang:function(){
			this.$router.push('./sixiang')
		},
		tosongbie:function(){
			this.$router.push('./songbie')
		},
		toyouguoyoumin:function(){
			this.$router.push('./youguoyoumin')
		},
		toyouqing:function(){
			this.$router.push('./youqing')
		},
		initGraph(){
					var shuju;
					var lastFocusNode;
					var zoom = d3.behavior.zoom().scaleExtent([0.25, 2]).on("zoom", zoomed);
			        //缩放callback

			        function zoomed() {
			        //svg下的g标签移动大小
			        svg.selectAll("g").attr("transform",
								"translate(" + zoom.translate() + ")" +
								"scale(" + zoom.scale() + ")"
									);}

					function interpolateZoom (translate, scale) {
					    var self = this;
					    return d3.transition().duration(350).tween("zoom", function () {
					        var iTranslate = d3.interpolate(zoom.translate(), translate),
					            iScale = d3.interpolate(zoom.scale(), scale);
					        return function (t) {
					            zoom
					                .scale(iScale(t))
					                .translate(iTranslate(t));
					            zoomed();
					        };
					    });
					}

					function zoomClick() {
					    var clicked = d3.event.target,
					        direction = 1,
					        factor = 0.2,
					        target_zoom = 1,
					        center = [width / 2, height / 2],
					        extent = zoom.scaleExtent(),
					        translate = zoom.translate(),
					        translate0 = [],
					        l = [],
					        view = {x: translate[0], y: translate[1], k: zoom.scale()};

					    d3.event.preventDefault();
					    direction = (this.id === 'zoom_in') ? 2 : -2;

						target_zoom = zoom.scale() * (1 + factor * direction);

					    if (target_zoom < extent[0] || target_zoom > extent[1]) { return false; }

					    translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
					    view.k = target_zoom;
					    l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];

					    view.x += center[0] - l[0];
					    view.y += center[1] - l[1];

					    interpolateZoom([view.x, view.y], view.k);
					}
					d3.selectAll('.zoomBtn').on('click',zoomClick);

					let width = 800;
					let height = 550;

					let svg = d3.select('#graph').call(zoom);


					d3.json("static/json/kewai/qinggan/悼亡.json",function(error,data){
						shuju=data
						console.log(data)
						init(data)
						$('#mode span').click(function(event) {
						 //span都设置为不激活状态
							 $('#mode span').removeClass('active');
							 //点击的span被激活
							 $(this).addClass('active');
							 //text隐藏 nodes显示
							 if ($(this).text() == '节点') {
									 $('.TEXT text').hide();
									 $('.CIRCLE circle').show();
									 //$('.g-pattern pattern image').show();
							 } else {
									if($(this).text() == '文字'){
									 $('.TEXT text').show();
									 $('.CIRCLE circle').hide();
									 //$('.nodes imge').show();
									 }
									 else{
										 $('.TEXT text').show();
										$('.CIRCLE circle').show();
									 }
							 }
						});


					})
					function init(data){

						var force = d3.layout.force()
							.nodes(data.nodes) //设定节点数组
							.links(data.edges) //设定关系数组
							.size([width,height]) //设定作用域的范围
							.linkDistance(150) //设定关系连线的长度
							.charge(-700) //节点间的相互作用力
							.on("tick", tick)
							.start(); //开始引力作用

							svg.selectAll("g").call(drag());
					function drag() {//拖拽函数
						return force.drag()
			            .on("dragstart", function (d) {
			                d3.event.sourceEvent.stopPropagation(); //取消默认事件
			                //d.fixed = true;    //拖拽开始后设定被拖拽对象为固定

			            });
			        //.on("drag", dragmove);
					}

						//	定义一个颜色生成器，由d3提供
							let color = d3.scale.category20(); //20表示可以生成20种不同的颜色

					//添加箭头
					var marker =
					        //添加一个marker标签来绘制箭头
					        svg.append("marker")
					            .attr("id", "resolved")//箭头id，用于其他标记进行引用时的url
					            .attr("markerUnits", "userSpaceOnUse")//定义标记的坐标系统，userSpaceOnUse表示按照引用的元件来决定，strokeWidth按照用户单位决定
					            .attr("viewBox", "0 -5 10 10")//坐标系的区域
					            .attr("refX", 40)//箭头坐标
					            .attr("refY", 0)
					            .attr("markerWidth", 12)//标识的大小
					            .attr("markerHeight", 12)
					            .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
					            .attr("stroke-width", 3)//箭头宽度
					            .append("path")
					            .attr("d", "M0,-5L10,0L0,5")
					            .attr('fill', '#ccc');//箭头颜色


						//	下边开始绘制
							//	绘制节点间的关系连线
								let linksLine = svg.append('g').attr("class","LINE").selectAll('line')
								.data(data.edges)
								.enter()
								.append('line')
								.attr('from',function(d){
									if(d.source.dynasty)return d.source.dynasty;
									return d.source.name;
								})
								.attr('to',function(d){
									if(d.target.dynasty)return d.target.dynasty;
									return d.target.name;
								})
								.style('stroke','#ccc')
								.style('stroke-width',2)
								.attr(
								'id',function(d,i){return 'edgepath' + i;}
								).attr('class','edgepath').attr("marker-end", "url(#resolved)");;

								/* var edges_text = svg.append("g").selectAll(".edgelabel")
								.data(data.edges)
								.enter()
								.append("text")//添加text标签
								.attr({
									'class': 'edgelabel',//定义该text标签class为edgelabel
									'id': function (d, i) { return 'edgepath' + i; },
									'dx': 60,//在连线上的坐标
									'dy': 0
								});

								edges_text.append('textPath')
								.attr('xlink:href', function (d, i) { return '#edgepath' + i })
								.style("pointer-events", "none")
								.text(function (d) { return d.relation; });*/


						//	绘制节点
							let nodesCic = svg.append('g').attr("class","CIRCLE").selectAll('circle')
							.data(data.nodes)
							.enter()
							.append('circle')
							.attr('name',function(d){
								if(!d.name)return d.dynasty;
								return d.name;
							})
							.style('stroke', function (node) {
							//config:边框色
							return "#666666";
							})
							.style("stroke-width","1")
							.attr('r',function(d){
								if(!d.name){
									return 40;
								}
								else{
									return 25;
								}
							})
							.style('fill',function(d,i){
								return color(i); //根据自身的索引号，自动随机获取一种背景颜色
							}).on("mouseover",function(node){
			    				})
							.on("click",function(node){
								var name=node.name;
								if(!name)name=node.dynasty;
								d3.select('#img1').attr("src","data/2.jpg");
								$('#info1 h4').css('color','#555').text(name);
								$('#info1 p').remove();
								for(let item of data.nodes){
									if(item.name == name||(item.dynasty == name&&!item.name)){
										if(!item.prop&&!item.name)
										{


											$('#info1').append('<p><span><b>' + '类型:' + '</b></span>' + '朝代' + '</p>');
										}
										else {
											if(!item.prop)$('#info1').append('<p><span><b>' + '类型:' + '</b></span>' + '诗人</p>' +'<p><span>朝代:</span>'+ item.dynasty +'</p>');
											else $('#info1').append('<p><span><b>' + '类型:' + '</b></span>' + '诗集' + '</p>');
										}
										for(var key in item.prop)
										//显示值及其字段名字

										{	var mytitle=key;
											if(key=="content"){
												mytitle="内容"
											}
											else{
												mytitle="译文"
											}
											$('#info1').append('<p><span><b>' + mytitle + ':</b></span>' + item.prop[key] + '</p>');
										}
									}
								}
							//显示随机图片
							if(node.prop){
							var num=Math.floor(Math.random()*22);
							$('.myimg').attr('src','../../../../static/img/'+num+'.jpg');
							}
							if(!node.name){
								var num=Math.floor(Math.random()*22);
								$('.myimg').attr('src','../../../../static/img/'+num+'.jpg');
							}
							if(node.name&&!node.prop){
								$('.myimg').attr('src','../../../../static/诗人图片/'+node.name+'.jpg');
								var imgobj=new Image();
								imgobj.onload=function(){

								}
								imgobj.src='../../../../static/诗人图片/'+node.name+'.jpg'
								if(imgobj.fileSize>0||(imgobj.width>0&&imgobj.height>0)){
								}
								imgobj.onerror=function(){
									var num=Math.floor(Math.random()*22);
									$('.myimg').attr('src','../../../../static/img/'+num+'.jpg');
								}
							}
							$('#tip').show(1000);
							 //单击时让连接线加粗
							//再次点击还原
							var name=node.name
							if(!name){
								name=node.dynasty
								linksLine.style("stroke-width", function (line) {
								//当与连接点连接时变粗
									if (line.source.dynasty == name&&(!line.source.name)){
										if (line.focus && node.focus){
											line.focus = false;
											return 1;
										}else{
											line.focus = true;
											return 2.5;
										}
									}
									else{
										return 1;
									}
								});
								linksLine.style("stroke", function (line) {
								//当与连接点连接时变粗
									if (line.source.dynasty == name || line.target.dynasty == name) {
										if (line.click && node.click){
											line.click = false;
											return '#666666';
										}else{
											line.click= true;
											return '#666666';
										}
									}else{
										return '#666666';
									}
								
								});
							}
							else {
								linksLine.style("stroke-width", function (line) {
									if ((line.source.name == name || line.target.name == name) ) {
										if (line.focus && node.focus){
											line.focus = false;
											return 1;
										}else{
											line.focus = true;
											return 2.5;
										}
									}
									else{
										return 1;
									}
								
							});
							linksLine.style("stroke", function (line) {
							//当与连接点连接时变粗
								if (line.source.name == name || line.target.name == name){
									if (line.click && node.click){
										line.click = false;
										return '#666666';
									}else{
										line.click= true;
										return '#666666';
									}
								}else{
									return '#666666';
								}
							
							 });
							}
							nodesCic.style('stroke-width', 1);//所有的圆圈边框
							//焦点取反
							node.click = !node.click
							node.focus = !node.focus
							//判断是不是点击的同一个node
							if (lastFocusNode != node && lastFocusNode != null){
								lastFocusNode.click = false
							} 
							//进行判断
							if (node.focus) {
								//被选中的圆圈边框
								d3.select(this).style('stroke-width', 2.5);
								d3.select(this).style('stroke', '#666666');
							}else{
								// $('#tip').fadeOut();
								$('#tip').hide(1000);
								d3.select(this).style('stroke-width', 1);
								d3.select(this).style('stroke', '#666666');
							}
							
							lastFocusNode = node;
							})
							.call(drag()); //调用drag函数，是的节点可以拖动

						//	给节点添加名称
							let nodesTitle = svg.append('g').attr("class","TEXT").selectAll('text')
							.data(data.nodes)
							.enter()
							.append('text')
							.attr('name',function(d){
								if(!d.name)return d.dynasty;
								return d.name;
							})
							.style('fill','#000')
							.attr("text-anchor", "middle") //是的文字居中显示在节点上
							// .attr('dx',20) //自定义文字的x坐标
							// .attr('dy',5) //自定义文字的y坐标
							.text(function(d){
								if(!d.name)return d.dynasty;
								return d.name;
							})
							.call(drag()); //调用drag函数，是的节点可以拖动;

							force.on('tick',tick);
							function tick(){
								//	更新连线的坐标
								linksLine.attr('x1',function(d){return d.source.x;})
								.attr('y1',function(d){return d.source.y;})
								.attr('x2',function(d){return d.target.x;})
								.attr('y2',function(d){return d.target.y;});

							//	更新节点坐标
								nodesCic.attr('cx',function(d){return d.x;})
								.attr('cy',function(d){return d.y});

							//	更新文字坐标
								nodesTitle.attr('x',function(d){return d.x})
								.attr('y',function(d){return d.y + 5});

							}

						}
					var i=1
					$('.column input').keyup(function(event){

							//alert()
							if (event.keyCode == 13){
								$('#graph').empty()
								var source
								var target
								var link
								let nodes =[]
								let links = []
								if ($(this).val() == ''){
									d3.json("static/json/kewai/qinggan/悼亡.json",function(error,data){
										console.log(data)
										init(data)
									})
								}
								else{
										var DATA={'nodes':[],'edges':[]}
										//alert('the another one')
										var name = $(this).val();
										for(let item of shuju.nodes){
											var specimen=item.name
											if(!specimen){specimen=item.dynasty}

											/*if(i==2&&specimen.indexOf(name)>=0){alert(specimen)}*/
											if(specimen.indexOf(name)>=0||name.indexOf(specimen)>=0){
												nodes.push(item)
												for(let iten of shuju.edges){


													var spec=iten.source.name
													if(!spec){
														spec=iten.source.dynasty
													}

													var spec1=iten.target.name
													if(!spec1){
														spec1=iten.target.dynasty
													}
													/*if(i==2){
														alert(iten.source)
														alert(spec1)
													}*/
													if(spec==specimen||spec1==specimen){
															/*if(i==2){
																alert(1)
															}*/
															if(nodes.indexOf(iten.source)==-1){
																nodes.push(iten.source)
															}
															if(nodes.indexOf(iten.target)==-1){
																nodes.push(iten.target)
															}

													}
												}
											}
										}
										//tmp=[]
										/*for(var item of nodes)tmp.push(item)
										for(let item of tmp){


										}*/
										//alert(nodes)
										for(let item of shuju.edges){
											source=item.source
											target=item.target
											if(nodes.indexOf(source)!=-1&&nodes.indexOf(target)!=-1){
												links.push(item)
											}
										}
										svg.empty()
										DATA.nodes=nodes
										DATA.edges=links
										init(DATA)
										i=i+1
								}
							}
						});
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
				                {value:16 , name: '清代'},
                        {value: 5, name: '先秦'},

                        {value: 22, name: '宋代'},
                        {value:3 , name: '魏晋'},
                        {value:3, name: '近现代'},

                        {value:1, name: '元代'},
                        {value:2, name: '两汉'},

                        {value:1, name: '南北朝'},



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
.btn:nth-child(7){
	left: 30.5rem;
}
.btn:nth-child(8){
	left: 35.5rem;
}
.btn:nth-child(9){
	left: 40.5rem;
}
.btn:nth-child(10){
	left: 47.5rem;
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

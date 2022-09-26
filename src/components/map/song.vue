<template>
	<div>
		<section class="mainbox">
			<div class="column">
				<!-- <div class="btnlist">
					<div id="leibie">
					<el-button class="btn" round type="mini" @click="toxianqin">先秦</el-button>
					<el-button class="btn" round type="mini" @click="tolianghan">两汉</el-button>
					<el-button class="btn" round type="mini" @click="toweijin">魏晋</el-button>
					<el-button class="btn" round type="mini" @click="tosuichao">隋朝</el-button>
					<el-button class="btn" round type="mini" @click="totangchao">唐朝</el-button>
					<el-button class="btn" round type="mini" @click="towudai">五代</el-button>
					<el-button class="btn" round type="mini" @click="tosongchao">宋朝</el-button>
					<el-button class="btn" round type="mini" @click="tojinchao">金朝</el-button>
					<el-button class="btn" round type="mini" @click="toyuanchao">元朝</el-button>
					<el-button class="btn" round type="mini" @click="tomingchao">明朝</el-button>
					<el-button class="btn" round type="mini" @click="toqingchao">清朝</el-button>
          <el-button class="btn" round type="mini" @click="tonanbeichao">南北朝</el-button>
					</div>
				</div> -->
				<!-- <div class='box' id="graph">
        <div id="mapchart" class="mapchart"></div>
        </div> -->
        <div class="box mapchart" id='mapchart'>

        </div>

			</div>

		</section>

	</div>
</template>

<script>

import * as echarts from 'echarts';
require('echarts/extension/bmap/bmap.js')

import d3 from 'd3';
import $ from 'jquery';

export default{

	methods:{
		tojinchao:function(){
			this.$router.push('./jinchao')
		},
		tolianghan:function(){
			this.$router.push('./lianghan')
		},
		tomingchao:function(){
			this.$router.push('./mingdai')
		},
		tonanbeichao:function(){
			this.$router.push('./nanbeichao')
		},
		toqingchao:function(){
			this.$router.push('./qing')
		},
		tosongchao:function(){
			this.$router.push('./song')
		},
		tosuichao:function(){
			this.$router.push('./sui')
		},
		totangchao:function(){
			this.$router.push('./tang')
		},
		toweijin:function(){
			this.$router.push('./weijin')
		},
		towudai:function(){
			this.$router.push('./wudai')
		},
		toxianqin:function(){
			this.$router.push('./xianqin')
		},
		toyuanchao:function(){
			this.$router.push('./yuan')
		},
	  initMap(){
          var echarts = require('echarts');
          var chartDom = document.getElementById('mapchart');
          var myChart = echarts.init(chartDom);
          var option;
          var zdata=[
            {name:'陆游',value:11052},
            {name:'苏轼',value:6487},
            {name:'刘克庄',value:5645},
            {name:'杨万里',value:5184},
            {name:'梅尧臣',value:3381},
            {name:'黄庭坚',value:3042},
            {name:'范成大',value:2598},
            {name:'欧阳修',value:2364},
            {name:'辛弃疾',value:2260},
            {name:'王安石',value:2243},
            {name:'苏辙',value:1915},
            {name:'吴文英',value:1775},
            {name:'宋祁',value:1758},
            {name:'曹勋',value:1740},
            {name:'司马光',value:1738},
            {name:'方岳',value:1722},
            {name:'邵雍',value:1689},
            {name:'李纲',value:1672},
            {name:'朱熹',value:1529},
            {name:'白玉蟾',value:1336},


          ];

          var geoCoordMap = {
             '陆游':[120.58547847885335,30.0363693113069],
             '苏轼':[103.85656331579456,30.082526119421058],
             '刘克庄':[119.0145209781265,25.45986545592271],
             '杨万里':[115.00051072001253,27.119726826070448],
             '梅尧臣':[118.76553424276743,30.94660154529291],
             '黄庭坚':[115.96066124030492,29.666660847999456],
             '范成大':[120.59241222959322,31.303564074441766],
             '欧阳修':[115.44740243988527,27.324342103714045],
             '辛弃疾':[117.12639941261048,36.65655420178723],
             '王安石':[116.36453876864373,27.954892253419565],
             '苏辙':[103.85656331579456,30.082526119421058],
             '吴文英':[121.63084278185603,29.866068124069646],
             '宋祁':[113.69558292415309,31.261414994285975],
             '曹勋':[113.49522360557991,34.14826652246125],
             '司马光':[111.01338945447925,35.03270691290923],
             '方岳':[118.34543725314781,29.721889786591692],
             '邵雍':[115.98161971138242,39.49106583200048],
             '李纲':[117.49941950209916,27.346469966260766],
             '朱熹':[117.94945960312224,28.460625921851733],
             '白玉蟾':[119.30346983854001,26.080429420698078],
          };
          var convertData = function (data) {
              var res = [];
              for (var i = 0; i < data.length; i++) {
                  var geoCoord = geoCoordMap[data[i].name];
                  if (geoCoord) {
                      res.push({
                          name: data[i].name,
                          value: geoCoord.concat(data[i].value)
                      });
                  }
              }
              return res;
          };
          // 用于处理effectScatter气泡散点图，气泡的大小
          var max = 100,
              min = 10;
          var maxSize4Pin = 100,
              minSize4Pin = 20;
          // 柱状图数据处理
          var yData = [];
          var barData = zdata.filter(function(item) {
              return item.value > 0;
          });
          barData = barData.sort(function(a, b) {
              return b.value - a.value;
          });
          for (var j = 0; j < 20; j++) {
              if (j < 10) {
                  yData.push('0' + j + barData[j].name);
              } else {
                  yData.push(j + barData[j].name);
              }
          }

          function transferProvinceName(name) {

              return name
          }


          option = {
              title: {
                  text: '',
                  subtext: '',
                  sublink: '',
                  left: 'center'
              },
              tooltip : {
                  trigger: 'item',

              },
              grid: {
                      right: 25,
                      top: 80,
                      bottom: 20,
                      width: '200'
                  },
                  xAxis: {
                      show: false
                  },
                  yAxis: {
                      type: 'category',
                      inverse: true,
                      nameGap: 16,
                      axisLine: {
                          show: false,
                          lineStyle: {
                              color: '#ddd'
                          }
                      },
                      axisTick: {
                          show: false,
                          lineStyle: {
                              color: '#ddd'
                          }
                      },
                      // Y轴刻度标签，富文本展示
                      axisLabel: {
                          interval: 0,
                          margin: 105,
                          textStyle: {
                              align: 'left',
                              fontSize: 14
                          },
                          rich: {
                              // 前三名, 序号颜色
                              a: {
                                  color: '#fff',
                                  backgroundColor: '#f0515e',
                                  width: 20,
                                  height: 20,
                                  align: 'center',
                                  borderRadius: 2
                              },
                              // 第四名之后, 序号颜色
                              b: {
                                  color: '#fff',
                                  backgroundColor: '#24a5cd',
                                  width: 20,
                                  height: 20,
                                  align: 'center',
                                  borderRadius: 2
                              },
                              // 前三名, 文字颜色
                              x: {
                                  color: '#f0515e'
                              },
                              // 第四名之后, 文字颜色
                              y: {
                                  color: '#24a5cd'
                              }
                          },
                          // 处理前三名, 及其他的标签
                          formatter: function(params) {
                              if (parseInt(params.slice(0, 2)) < 3) {
                                  return [
                                      '{a|' + (parseInt(params.slice(0, 2)) + 1) + '}' + '  ' + '{x|' + transferProvinceName(params.slice(2)) + '}'
                                  ].join('\n')
                              } else {
                                  return [
                                      '{b|' + (parseInt(params.slice(0, 2)) + 1) + '}' + '  ' + '{y|' + transferProvinceName(params.slice(2)) + '}'
                                  ].join('\n')
                              }
                          }
                      },
                      data: yData
                  },
              bmap: {
                  center: [113.01338945447925,33.03270691290923],
                  zoom: 6,
                  roam: true,
                  mapStyle: {
                      styleJson:
                                [{
                                    "featureType": "land",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#242f3eff"
                                    }
                                }, {
                                    "featureType": "manmade",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#242f3eff"
                                    }
                                }, {
                                    "featureType": "water",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#17263cff"
                                    }
                                }, {
                                    "featureType": "road",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#9e7d60ff"
                                    }
                                }, {
                                    "featureType": "road",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#554631ff"
                                    }
                                }, {
                                    "featureType": "districtlabel",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#d69563ff"
                                    }
                                }, {
                                    "featureType": "districtlabel",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#17263cff",
                                        "weight": 3
                                    }
                                }, {
                                    "featureType": "poilabel",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#d69563ff"
                                    }
                                }, {
                                    "featureType": "poilabel",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#17263cff",
                                        "weight": 3
                                    }
                                }, {
                                    "featureType": "subway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "railway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "poilabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "subwaylabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "subwaylabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "tertiarywaysign",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "tertiarywaysign",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "provincialwaysign",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "provincialwaysign",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "nationalwaysign",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "nationalwaysign",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "highwaysign",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "highwaysign",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "green",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#263b3eff"
                                    }
                                }, {
                                    "featureType": "nationalwaysign",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#d0021bff"
                                    }
                                }, {
                                    "featureType": "nationalwaysign",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#ffffffff"
                                    }
                                }, {
                                    "featureType": "city",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "on"
                                    }
                                }, {
                                    "featureType": "city",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "city",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#d69563ff"
                                    }
                                }, {
                                    "featureType": "city",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#17263cff"
                                    }
                                }, {
                                    "featureType": "water",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#d69563ff"
                                    }
                                }, {
                                    "featureType": "water",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#242f3eff"
                                    }
                                }, {
                                    "featureType": "local",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#38414eff"
                                    }
                                }, {
                                    "featureType": "local",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#ffffff00"
                                    }
                                }, {
                                    "featureType": "fourlevelway",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#38414eff"
                                    }
                                }, {
                                    "featureType": "fourlevelway",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#ffffff00"
                                    }
                                }, {
                                    "featureType": "tertiaryway",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#38414eff"
                                    }
                                }, {
                                    "featureType": "tertiaryway",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#ffffff00"
                                    }
                                }, {
                                    "featureType": "tertiaryway",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#759879ff"
                                    }
                                }, {
                                    "featureType": "fourlevelway",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#759879ff"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#759879ff"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#9e7d60ff"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#554631ff"
                                    }
                                }, {
                                    "featureType": "provincialway",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#9e7d60ff"
                                    }
                                }, {
                                    "featureType": "provincialway",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#554631ff"
                                    }
                                }, {
                                    "featureType": "tertiaryway",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#1a2e1cff"
                                    }
                                }, {
                                    "featureType": "fourlevelway",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#1a2e1cff"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#1a2e1cff"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#1a2e1cff"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#759879ff"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#9e7d60ff"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#554631ff"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#9e7d60ff"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#554631ff"
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#9e7d60ff"
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#554631fa"
                                    }
                                }, {
                                    "featureType": "medicallabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "medicallabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "entertainmentlabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "entertainmentlabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "estatelabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "estatelabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "businesstowerlabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "businesstowerlabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "companylabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "companylabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "governmentlabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "governmentlabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "restaurantlabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "restaurantlabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "hotellabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "hotellabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "shoppinglabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "shoppinglabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "lifeservicelabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "lifeservicelabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "carservicelabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "carservicelabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "financelabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "financelabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "otherlabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "otherlabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "airportlabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "on"
                                    }
                                }, {
                                    "featureType": "airportlabel",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#d69563ff"
                                    }
                                }, {
                                    "featureType": "airportlabel",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#17263cff"
                                    }
                                }, {
                                    "featureType": "airportlabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "6"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "7"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "6"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "7"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "6"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "7"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "6"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "7"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "6"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "7"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "nationalway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "6"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "7"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "highway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "provincialway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "8,9",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "provincialway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "8,9",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "provincialway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "8,9",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "provincialway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "8,9",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "provincialway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "8,9",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "provincialway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "8,9",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "6"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "7"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "6"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "7"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "6"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "7"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "8"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "6,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "9,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "stylers": {
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "9,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "9,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "9,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "9,10",
                                        "level": "9"
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off",
                                        "curZoomRegionId": "0",
                                        "curZoomRegion": "9,10",
                                        "level": "10"
                                    }
                                }, {
                                    "featureType": "building",
                                    "elementType": "geometry.topfill",
                                    "stylers": {
                                        "color": "#2a3341ff"
                                    }
                                }, {
                                    "featureType": "building",
                                    "elementType": "geometry.sidefill",
                                    "stylers": {
                                        "color": "#313b4cff"
                                    }
                                }, {
                                    "featureType": "building",
                                    "elementType": "geometry.stroke",
                                    "stylers": {
                                        "color": "#1a212eff"
                                    }
                                }, {
                                    "featureType": "road",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#759879ff"
                                    }
                                }, {
                                    "featureType": "road",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#1a2e1cff"
                                    }
                                }, {
                                    "featureType": "provincialway",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#759879ff"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#759879ff"
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#759879ff"
                                    }
                                }, {
                                    "featureType": "provincialway",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#1a2e1cff"
                                    }
                                }, {
                                    "featureType": "cityhighway",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#1a2e1cff"
                                    }
                                }, {
                                    "featureType": "arterial",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#1a2e1cff"
                                    }
                                }, {
                                    "featureType": "local",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "manmade",
                                    "elementType": "labels.text.fill",
                                    "stylers": {
                                        "color": "#d69563ff"
                                    }
                                }, {
                                    "featureType": "manmade",
                                    "elementType": "labels.text.stroke",
                                    "stylers": {
                                        "color": "#17263cff"
                                    }
                                }, {
                                    "featureType": "subwaystation",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "transportationlabel",
                                    "elementType": "labels.icon",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "transportationlabel",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }, {
                                    "featureType": "estate",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#2a3341ff"
                                    }
                                }]
                  }
              },
              series : [
                  {
                      name: '诗人的诗篇以及名句数量',
                      type: 'scatter',
                      coordinateSystem: 'bmap',
                      data: convertData(zdata),
                      symbolSize: function (val) {
                          return  10;
                      },
                      encode: {
                          value: 2
                      },
                      label: {
                          formatter: '{b}',

                          position: 'right',
                          show: false
                      },
                      emphasis: {
                          label: {

                              show: true
                          }
                      }
                  },
                  // 气泡散点图，红色气泡
                          {
                              name: '诗人的诗篇以及名句数量',
                              type: 'scatter',
                              coordinateSystem: 'bmap',
                              // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                              symbol: 'pin', //气泡
                              symbolSize: function(val) {
                                  // 根据value值，设置symbol大小，根据实际情况自己调整
                                  // if (val=== 0) {
                                  //     return 0;
                                  // }
                                  // var a = (maxSize4Pin - minSize4Pin) / (max - min);
                                  // var b = maxSize4Pin - a * max;
                                  // if (val[2]>1000){
                                  //     return a * val[2]/100+ b * 1.2;
                                  // }
                                  // else if(val[2]>100){
                                  //   return a * val[2]/10 + b * 1.2;
                                  // }
                                  return 60
                              },
                              encode: {
                                  value: 2
                              },
                              label: {

                                  normal: {
                                      show: true,
                                      formatter:function(val) {
                                          return val.data.name
                                      },
                                      textStyle: {

                                          color: '#fff',
                                          fontSize: 13,
                                      }
                                  }
                              },
                              itemStyle: {
                                  normal: {
                                      // 气泡颜色

                                      color: '#F62157',
                                      // color:'black',
                                  }
                              },
                              zlevel: 6,
                              data: convertData(zdata),
                          },

                  {
                      name: '诗人的诗篇以及名句数量',
                      type: 'effectScatter',
                      coordinateSystem: 'bmap',
                      data: convertData(zdata.sort(function (a, b) {
                          return b.value - a.value;
                      }).slice(0, 6)),
                      symbolSize: function (val) {

                          return val[2] / 500;
                      },
                      encode: {
                          value: 2
                      },
                      showEffectOn: 'render',
                      rippleEffect: {
                          brushType: 'stroke'
                      },
                      hoverAnimation: true,
                      label: {
                          formatter: '{b}',
                          position: 'right',
                          show: true
                      },
                      itemStyle: {

                          shadowBlur: 10,
                          shadowColor: '#333'
                      },
                      zlevel: 1
                  },
                   // 柱状图
                          {
                              name: '诗人的诗篇以及名句数量',
                              type: 'bar',

                              // barMaxWidth: 20,
                              // zlevel: 2,
                              // barGap: 0,
                              itemStyle: {
                                  normal: {
                                      // 柱状图，渐变色
                                      color: function(params) {
                                          var colorList = [{
                                                  colorStops: [{
                                                      offset: 0,
                                                      color: '#336633'
                                                  }, {
                                                      offset: 1,
                                                      color: '#336633'
                                                  }]
                                              },
                                              {
                                                  colorStops: [{
                                                      offset: 0,
                                                      color: '#336666'
                                                  }, {
                                                      offset: 1,
                                                      color: '#336666'
                                                  }]
                                              }
                                          ];
                                          if (params.dataIndex < 3) {
                                              return colorList[0]
                                          } else {
                                              return colorList[1]
                                          }
                                      },
                                  },
                                  // 柱状图hover颜色
                                  emphasis: {
                                      color: "#f0515e"
                                  },
                              },
                              label: {
                                  normal: {
                                      show: true,
                                      position: 'right',
                                      textBorderWidth: 0
                                  }
                              },
                              data: barData.slice(0,20)
                          }


              ]
          };
          myChart.setOption(option);


    }
	},

	mounted() {

		this.initMap();

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
.barchart{
	border-radius: 1.25rem;
	background-color:#FFFFFF ;
	height: 330px ;
	width: 20.75rem;
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
	background-color:  #f0f2f5;
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
.top{
	height: 18.75rem;
	padding:0 10px 40px;
	background-color:  #f0f2f5;
	margin-bottom: 15px;
}

.radar{
	height: 19.375rem;
	padding:0 10px 40px;
	/* background-color: #00DD0A; */

}
.radarchart{
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
	height: 20px;
}
.btn{
	position: absolute;
	top:-1rem;
}
.btn:first-child{
	left:1rem;
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
	left:30.5rem;
}
.btn:nth-child(8){
	left: 35.5rem;
}
.btn:nth-child(9){
	left: 40.5rem;
}
.btn:nth-child(10){
	left: 45.5rem;
}
.btn:nth-child(11){
	left: 50.5rem;
}
.btn:nth-child(12){
	left: 55.5rem;
}
.box{
	height: 100%;
	width: 100%;
	background-color: #ffffff;
}

#info1{
	border-radius: 1.25rem;
	margin: 0 auto;
	height: 16.75rem;
	width: 20.75rem;
	background-color: #FFFFFF;

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

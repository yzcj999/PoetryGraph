//导入路由和vue模块
import Vue from 'vue'
import Router from 'vue-router'

//导入首页
import shouye from '../components/shouye.vue'
//导入设计的页面
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
	//导入课内阅读
		//导入小学
import primary1 from '../components/kenei/xiaoxue/primary1.vue'
import primary2 from '../components/kenei/xiaoxue/primary2.vue'
import primary3 from '../components/kenei/xiaoxue/primary3.vue'
import primary4 from '../components/kenei/xiaoxue/primary4.vue'
import primary5 from '../components/kenei/xiaoxue/primary5.vue'
import primary6 from '../components/kenei/xiaoxue/primary6.vue'
		//导入初中
import junior1 from '../components/kenei/chuzhong/junior1.vue'
import junior2 from '../components/kenei/chuzhong/junior2.vue'
import junior3 from '../components/kenei/chuzhong/junior3.vue'
		//导入高中
import high1 from '../components/kenei/gaozhong/high1.vue'
import high2 from '../components/kenei/gaozhong/high2.vue'
import high3 from '../components/kenei/gaozhong/high3.vue'
	
	//导入课外阅读
		//导入感情类
import aiguo from '../components/kewai/qinggan/aiguo.vue'
import aiqing from '../components/kewai/qinggan/aiqing.vue'
import daowang from '../components/kewai/qinggan/daowang.vue'
import libie from '../components/kewai/qinggan/libie.vue'
import lizhi from '../components/kewai/qinggan/lizhi.vue'
import sinian from '../components/kewai/qinggan/sinian.vue'
import sixiang from '../components/kewai/qinggan/sixiang.vue'
import songbie from '../components/kewai/qinggan/songbie.vue'
import youguoyoumin from '../components/kewai/qinggan/youguoyoumin.vue'
import youqing from '../components/kewai/qinggan/youqing.vue'
		//导入风格类
import guiyuan from '../components/kewai/fengge/guiyuan.vue'
import haofang from '../components/kewai/fengge/haofang.vue'
import huaigu from '../components/kewai/fengge/huaigu.vue'
import shuqing from '../components/kewai/fengge/shuqing.vue'
import wanyue from '../components/kewai/fengge/wanyue.vue'
import xishi from '../components/kewai/fengge/xishi.vue'
import yongwu from '../components/kewai/fengge/yongwu.vue'
import zheli from '../components/kewai/fengge/zheli.vue'
		//导入季节类
import chuntian from '../components/kewai/jijie/chuntian.vue'
import xiatian from '../components/kewai/jijie/xiatian.vue'
import qiutian from '../components/kewai/jijie/qiutian.vue'
import dongtian from '../components/kewai/jijie/dongtian.vue'
		//导入节日类
import chunjie from '../components/kewai/jieri/chunjie.vue'
import duanwu from '../components/kewai/jieri/duanwu.vue'
import hanshi from '../components/kewai/jieri/hanshi.vue'
import jieri from '../components/kewai/jieri/jieri.vue'
import qixi from '../components/kewai/jieri/qixi.vue'
import qingming from '../components/kewai/jieri/qingming.vue'
import yuanxiao from '../components/kewai/jieri/yuanxiao.vue'
import zhongqiu from '../components/kewai/jieri/zhongqiu.vue'
import chongyang from '../components/kewai/jieri/chongyang.vue'
		//导入景物类
import changjiang from '../components/kewai/jingwu/changjiang.vue'
import diming from '../components/kewai/jingwu/diming.vue'
import feng from '../components/kewai/jingwu/feng.vue'
import hua from '../components/kewai/jingwu/hua.vue'
import huanghe from '../components/kewai/jingwu/huanghe.vue'
import liushu from '../components/kewai/jingwu/liushu.vue'
import ma from '../components/kewai/jingwu/ma.vue'
import niao from '../components/kewai/jingwu/niao.vue'
import shanshui from '../components/kewai/jingwu/shanshui.vue'
import tianyuan from '../components/kewai/jingwu/tianyuan.vue'
import xiejing from '../components/kewai/jingwu/xiejing.vue'
import xue from '../components/kewai/jingwu/xue.vue'
import yu from '../components/kewai/jingwu/yu.vue'
import yueliang from '../components/kewai/jingwu/yueliang.vue'
		//导入人物类
import ertong from '../components/kewai/renwu/ertong.vue'
import laoshi from '../components/kewai/renwu/laoshi.vue'
import muqin from '../components/kewai/renwu/muqin.vue'
import qitarenwu from '../components/kewai/renwu/qitarenwu.vue'
		//导入其他类
import biansai from '../components/kewai/qita/biansai.vue'
import chuci from '../components/kewai/qita/chuci.vue'
import dushu from '../components/kewai/qita/dushu.vue'
import yuefu from '../components/kewai/qita/yuefu.vue'
import minyao from '../components/kewai/qita/minyao.vue'
import shijing from '../components/kewai/qita/shijing.vue'
import zhanzheng from '../components/kewai/qita/zhanzheng.vue'
		//导入唐宋诗300
import tang300 from '../components/kewai/tang300.vue'
import song300 from '../components/kewai/song300.vue'
import gushi300 from '../components/kewai/gushi300.vue'
	//导入各朝代诗人籍贯页面
import jinchao from '../components/shiren/jinchao.vue'
import lianghan from '../components/shiren/lianghan.vue'
import mingdai from '../components/shiren/mingdai.vue'
import nanbeichao from '../components/shiren/nanbeichao.vue'
import qing from '../components/shiren/qing.vue'
import song from '../components/shiren/song.vue'
import sui from '../components/shiren/sui.vue'
import tang from '../components/shiren/tang.vue'
import weijin from '../components/shiren/weijin.vue'
import wudai from '../components/shiren/wudai.vue'
import xianqin from '../components/shiren/xianqin.vue'
import yuan from '../components/shiren/yuan.vue'
	//导入高考必背64页面
import gaokao from "../components/gaokao/gaokao.vue"
	//导入诗人籍贯地图页面
import songmap from '../components/map/song.vue'
import tangmap from '../components/map/tang.vue'
//导入收藏页面
import shoucang from '../components/shoucang/shoucang.vue'
//使用路由
Vue.use(Router);


//配置路由表
export default new Router({
	routes:[
		{	//登录页路由
			path:'/',
			name:'Login',
			component:Login
		},
		{	//首页路由（总路由）
			path:'/Home',
			name:'Home',
			component:Home,
			//各分页路由
			children:[
				{	//首页路由
					path:"/shouye",
					name:'shouye',
					component:shouye
				},
				{
					//小学页面路由
					path:'/primary1',
					name:'primary1',
					component:primary1
				},
				{
					path:'/primary2',
					name:'primary2',
					component:primary2
				},
				{
					path:'/primary3',
					name:'primary3',
					component:primary3
				},
				{
					path:'/primary4',
					name:'primary4',
					component:primary4
				},
				{
					path:'/primary5',
					name:'primary5',
					component:primary5
				},
				{
					path:'/primary6',
					name:'primary6',
					component:primary6
				},
				{	//初中页面路由
					path:'/junior1',
					name:'junior1',
					component:junior1
				},
				{
					path:'/junior2',
					name:'junior2',
					component:junior2
				},
				{
					path:'/junior3',
					name:'junior3',
					component:junior3
				},
				{	//高中页面路由
					path:'/high1',
					name:'high1',
					component:high1
				},
				{
					path:'/high2',
					name:'high2',
					component:high2
				},
				{
					path:'/high3',
					name:'high3',
					component:high3
				},
				{	//唐诗300页面路由
					path:'/tang300',
					name:'tang300',
					component:tang300
				},
				{	//宋词300页面路由
					path:'/song300',
					name:'song300',
					component:song300
				},
				{	//古诗300页面路由
					path:'/gushi300',
					name:'gushi300',
					component:gushi300
				},
				//感情类路由
				{	
					path:'/aiguo',
					name:"aiguo",
					component:aiguo
				},
				{
					path:'/aiqing',
					name:'aiqing',
					component:aiqing
				},
				{
					path:'/daowang',
					name:'daowang',
					component:daowang
				},
				{
					path:'/libie',
					name:'libie',
					component:libie
				},
				{
					path:'/lizhi',
					name:'lizhi',
					component:lizhi
				},
				{
					path:'/sinian',
					name:'sinian',
					component:sinian
				},
				{
					path:'/sixiang',
					name:'sixiang',
					component:sixiang
				},
				{
					path:'/songbie',
					name:'songbie',
					component:songbie
				},
				{
					path:'/youguoyoumin',
					name:'youguoyoumin',
					component:youguoyoumin
				},
				{
					path:'/youqing',
					name:'youqing',
					component:youqing
				},
				
				//风格类路由
				{
					path:'/guiyuan',
					name:'guiyuan',
					component:guiyuan
				},
				{
					path:'/haofang',
					name:'haofang',
					component:haofang
				},
				{
					path:'/huaigu',
					name:'huaigu',
					component:huaigu
				},
				{
					path:'/shuqing',
					name:'shuqing',
					component:shuqing
				},
				{
					path:'/wanyue',
					name:'wanyue',
					component:wanyue
				},
				{
					path:'/xishi',
					name:'xishi',
					component:xishi
				},
				{
					path:'/yongwu',
					name:'yongwu',
					component:yongwu
				},
				{
					path:'/zheli',
					name:'zheli',
					component:zheli
				},
				
				//季节类路由
				{
					path:'/chuntian',
					name:'chuntian',
					component:chuntian
				},
				{
					path:'/xiatian',
					name:'xiatian',
					component:xiatian
				},
				{
					path:'/qiutian',
					name:'qiutian',
					component:qiutian
				},
				{
					path:'/dongtian',
					name:'dongtian',
					component:dongtian
				},
				//节日类路由
				{
					path:'/chunjie',
					name:'chunjie',
					component:chunjie
				},
				{
					path:'/duanwu',
					name:'duanwu',
					component:duanwu
				},
				{
					path:'/hanshi',
					name:'hanshi',
					component:hanshi
				},
				{
					path:'/jieri',
					name:'jieri',
					component:jieri
				},
				{
					path:'/qixi',
					name:'qixi',
					component:qixi
				},
				{
					path:'/qingming',
					name:'qingming',
					component:qingming
				},
				{
					path:'/yuanxiao',
					name:'yuanxiao',
					component:yuanxiao
				},
				{
					path:'/zhongqiu',
					name:'zhongqiu',
					component:zhongqiu
				},
				{
					path:'/chongyang',
					name:'chongyang',
					component:chongyang
				},
				//景物类路由
				{
					path:'/changjiang',
					name:'changjiang',
					component:changjiang
				},
				{
					path:'/diming',
					name:'diming',
					component:diming
				},
				{
					path:'/feng',
					name:'feng',
					component:feng
				},
				{
					path:'/hua',
					name:'hua',
					component:hua
				},
				{
					path:'/huanghe',
					name:'huanghe',
					component:huanghe
				},
				{
					path:'/liushu',
					name:'liushu',
					component:liushu
				},
				{
					path:'/ma',
					name:'ma',
					component:ma
				},
				{
					path:'/niao',
					name:'niao',
					component:niao
				},
				{
					path:'/shanshui',
					name:'shanshui',
					component:shanshui
				},
				{
					path:'/tianyuan',
					name:'tianyuan',
					component:tianyuan
				},
				{
					path:'/xiejing',
					name:'xiejing',
					component:xiejing
				},
				{
					path:'/xue',
					name:'xue',
					component:xue
				},
				{
					path:'/yu',
					name:'yu',
					component:yu
				},
				{
					path:'/yueliang',
					name:'yueliang',
					component:yueliang
				},
				//人物类路由
				{
					path:'/ertong',
					name:'ertong',
					component:ertong
				},
				{
					path:'/laoshi',
					name:'laoshi',
					component:laoshi
				},
				{
					path:'/muqin',
					name:'muqin',
					component:muqin
				},
				{
					path:'/qitarenwu',
					name:'qitarenwu',
					component:qitarenwu
				},
				//其他类路由
				{
					path:'/biansai',
					name:'biansai',
					component:biansai
				},
				{
					path:'/dushu',
					name:'dushu',
					component:dushu
				},
				{
					path:'/yuefu',
					name:'yuefu',
					component:yuefu
				},
				{
					path:'/chuci',
					name:'chuci',
					component:chuci
				},
				{
					path:'/minyao',
					name:'minyao',
					component:minyao
				},
				{
					path:'/shijing',
					name:'shijing',
					component:shijing
				},
				{
					path:'/zhanzheng',
					name:'zhanzheng',
					component:zhanzheng
				},
				//诗人机关页面路由
				{
					path:'/jinchao',
					name:'jinchao',
					component:jinchao
				},
				{
					path:'/lianghan',
					name:'lianghan',
					component:lianghan
				},
				{
					path:'/mingdai',
					name:'mingdai',
					component:mingdai
				},
				{
					path:'/nanbeichao',
					name:'nanbeichao',
					component:nanbeichao
				},
				{
					path:'/qing',
					name:'qing',
					component:qing
				},
				{
					path:'/song',
					name:'song',
					component:song
				},
				{
					path:'/sui',
					name:'sui',
					component:sui
				},
				{
					path:'/tang',
					name:'tang',
					component:tang
				},
				{
					path:'/weijin',
					name:'weijin',
					component:weijin
				},
				{
					path:'/wudai',
					name:'wudai',
					component:wudai
				},
				{
					path:'/xianqin',
					name:'xianqin',
					component:xianqin
				},
				{
					path:'/yuan',
					name:'yuan',
					component:yuan
				},
				{
					path:'/gaokao',
					name:'gaokao',
					component:gaokao
				},
				//导入地图
				{
					path:'/songmap',
					name:'songmap',
					component:songmap
				},
				{
					path:'/tangmap',
					name:'tangmap',
					component:tangmap
				},
				{
					path:'/shoucang',
					name:'/shoucang',
					component:shoucang
				}
			]
		}
	]
	
})
<template>
	<ul class="show_list" :view-id="changeP">
		            		<li >
		            			<div class="top">
		            				<span>
		            					日志访问统计
		            				</span>
		            				<div class="more"></div>
		            			</div>
		            			<div id="Log_manage">
		            				
		            			</div>
		            		</li>
		            		<li>
		            			<div class="top">
		            				<span>
		            					最新公告
		            				</span>
		            				<div class="more"></div>
		            			</div>
		            			<div id="Notice">
		            				<h2>{{noticeMsg.noticeTitle}}</h2>
		            				<p>
		            					&nbsp;&nbsp;&nbsp;&nbsp;{{noticeMsg.noticeCont}}
		            				</p>
		            			</div>
		            		</li>
		            		<li class="Weekly_wearning">
		            			<div class="top">
		            				<span>
		            					最新动态
		            				</span>
		            				<div class="more"></div>
		            			</div>
		            			<div id="Notice">
		            				<ul style="color:#8fa6b3">
		            					<li v-for="a in noticeList">
		            						{{a.OPER_DATE}}
		            						{{a.USER_ID}} 
		            						{{a.LOGIN_LOCATION}} 
		            						<i>{{a.OPER_CONTENT}} </i>
		            					</li>
		            				</ul>
		            			</div>
		            		</li>
		            		<li>
		            			<div class="top">
		            				<span>
		            					登录统计
		            				</span>
		            				<div class="more"></div>
		            			</div>
		            			<div id="Earn_country">
		            				<div id="con"></div>
		            			</div>
		            		</li>
		            	</ul>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line')
// 引入饼状图组件
require('echarts/lib/chart/pie')

// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

import config from '../config/config.js'

export default {
  name: 'hello',
  data() {
  	
    return {
      msg: 'Welcome to Your Vue.js App', 
      noticeMsg:{
      	noticeCont:null,
      	noticeTitle:null
      },
      pieSeries:[],
      noticeList:[],
      
    }
  },
  computed:{
		    		changeP:function(){
		    		
						this.getEchartData();
						this.getLogAndNotice(); 	
		    			return this.$store.state.placeId;
		    		},
		    	},
  mounted() {	
  this.getEchartData();
  this.getLogAndNotice(); 				        				        
  },
  methods: {
  	
  	getLogAndNotice(){
  		 //添加公告内容
    this.$http.get(config.content+'/asmx/GongGaoService.asmx/GetGongGaoDataByPage',{params:{SYS_ID:this.$store.state.placeId,staDate:null,endDate:null,pageSize:1,pageIndex:0,keyword:null}}).then(response => {				 								
										
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						            	
						            		if(obj.Result.TableInfo.length>0){
							                 this.noticeMsg.noticeTitle=obj.Result.TableInfo[0].BIAOTI;
							                 this.noticeMsg.noticeCont=obj.Result.TableInfo[0].NEIRONG;
						            		}else{
						            			this.noticeMsg.noticeTitle=null;
							                 this.noticeMsg.noticeCont=null;
						            		}

						        }, response => {
						            console.log("error");
						        });
	 //添加日志内容
    this.$http.get(config.content+'/asmx/LogService.asmx/GetLogDataByPage',{params:{SYS_ID:this.$store.state.placeId,staDate:null,endDate:null,pageSize:5,pageIndex:0,keyword:null,userID:null}}).then(response => {				 								
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						            	obj.Result.TableInfo?this.noticeList=obj.Result.TableInfo:this.noticeList=null;

						        }, response => {
						            console.log("error");
						        });	
  	},
  	getEchartData(){
  		let pieSeries=[];
  		let linkSeriesX=[];
  		let linkSeriesY=[];
  		//get pie data/asmx/LogService.asmx?op=GetLogStatics
  		this.$http.get(config.content+'/asmx/LogService.asmx/GetLogStatics',{params:{SYS_ID:this.$store.state.placeId}}).then(response => {				 								
										let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                 
						                 obj.Result?pieSeries=obj.Result:pieSeries=[];
						                 this.drawPie(pieSeries);
						        }, response => {
						            console.log("error");
						        });
		//http://101.200.232.210:8020/asmx/LogService.asmx/GetLogStaticsByDay
  		this.$http.get(config.content+'/asmx/LogService.asmx/GetLogStaticsByDay',{params:{SYS_ID:this.$store.state.placeId}}).then(response => {				 								
										let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                
						                if(obj.Result){
						                	for(let a of obj.Result){
							               	 linkSeriesX.push(a.name);
							               	 linkSeriesY.push(a.value);
						               		}
						                }else{
						                	linkSeriesX=[];
						                	linkSeriesY=[];
						                }
										  this.drawLine(linkSeriesX,linkSeriesY);
										  
						        }, response => {
						            console.log("error");
						        });
						        
						        
						        
  	},
    drawLine(linkSeriesX,linkSeriesY) {
    	
         let myChart = echarts.init(document.getElementById('Log_manage'));
				    let font_color="#fff";
			myChart.setOption({
				   /* title: {
				        text: '示例',
				        left: 'center',
				        textStyle:{
				        	 color:"#fff",
				        }
				    },*/
				    tooltip: {
				        trigger: 'item',
				        formatter: '{a}: {c} <br/>时&#160;&#160;&#160;间：{b} '
				    },
				   /* legend: {
				        left: 'left',
				        data: ['指数2',],
				        textStyle:{
				        	 color:"#fff",
				        }
				    },*/
				    xAxis: {
				        type: 'category',
				        name: 'x/ 时间',
				         splitLine: {
				         		show:true,
				         		interval: 'auto',
					            lineStyle: {
					                type: 'solid',
					                color:"#8fa6b3",
					                opacity:0.6,
					            }
					        },
				        color:"#fff",
				        data: linkSeriesX,
					    nameTextStyle:{color:"#8fa6b3",},
				        axisLine:{
					    	lineStyle:{
					    		width:2,
					    		color:"#8fa6b3",
					    		type:"dotted",
					    		opacity:0.6,
					    	},
				    	},
				    },
				   
				    grid: {
				    	show:false,
				        containLabel:true,
				        borderColor:"#8fa6b3",
				      	bottom:60,
				   },
				    yAxis: {
				        type: 'value',
				        name: 'y/ 计数',
				        nameTextStyle:{
				        	 color:"#8fa6b3",
				        },
				        splitLine: {
					            lineStyle: {
					                type: 'solid',
					                color:"#8fa6b3",
					                opacity:0.6,
					            }
					        },
				        axisLine:{
					    	lineStyle:{
					    		width:2,
					    		color:"#8fa6b3",
					    		type:"dotted",
					    		opacity:0.6,
					    	},
				    	},
				    },
				    series: [
				        {
				            name: '统计量',
				            type: 'line',
				            data: linkSeriesY,
				            textStyle:{color:"#8fa6b3"},
				            symbolSize:15,
				            itemStyle:{
						        	normal:{
						        		borderWidth:2,
						        		borderType:"solid",
						        		color:"#22a89a"
						        	}
				       		 },
					        lineStyle:{
					            	normal:{
					            		color:{
					            			type: 'linear',
										    x: 0,
										    y: 1,
										    width:2,
										    colorStops: [{
										        offset: 0, color: 'red' // 0% 处的颜色
										    }, 
										    {
										        offset: 0.5, color: '#48458d' // 0% 处的颜色
										    }, 
										    {
										        offset: 1, color: '#22a89a' // 100% 处的颜色
										    }],
										    globalCoord: true // 缺省为 false
					            		},
					            		width:2,
					            },
					            
					        },
					        areaStyle:{
					            	normal:{
					            		 	color: {
											     type: 'linear',
												    x: 0,
												    y: 0,
												    x2: 0,
												    y2: 1,
												    colorStops: [{
												        offset: 0, color: '#165466' // 0% 处的颜色
												    },{
												        offset: 0.5, color: '#163052' // 0% 处的颜色
												    }, {
												        offset: 1, color: '#1f3346' // 100% 处的颜色
												    }],
												    globalCoord: true // 缺省为 false
											}
					            	}
					        },
				        },
				    ]
				    });

			window.onresize = function(){
			    myChart.resize(); 
			};
    },
    drawPie(pieSeries){
    	
    		let myChart2 = echarts.init(document.getElementById('con'));
				    myChart2.setOption({
				    /*title: {
				        text: '系统登录点统计',
				        left: 'center',
				        textStyle:{
				        	 color:"#fff",
				        }
				    },*/
				
				    tooltip: {
		                trigger: 'item',
		                formatter: "{b} : {c} ({d}%)"
		            },
					legend: {
				        orient: 'vertical',
				        left: 'left',
				        bottom:"bottom",
				        data: ['成都','武汉','郑州','北京','甘孜阿坝'],
				        textStyle:{
				        	color:"#eee",
				        }
				    },
		            series: [
		                {
		                    name: "登录统计",
					        type: 'pie',
					        radius : '70%',
					        center: ['50%', '55%'],
		                    data:pieSeries ,
		                 /*   roseType: 'area',*/
		                    label: {
		                        normal: {
		                            position: "outside",
		                            textStyle: {
		                                fontSize: 16,
		                                color: '#e54035'
		                            },
		                        }
		                    },
		                    labelLine: {
		                        normal: {
		                            position: "outside",
		                            lineStyle: {
		                                color: '#b1b1b1'
		                            },
		                            //smooth: 0.2,
		                            length: 20,
		                            length2: 30
		                        }
		                    },
		                    itemStyle: {
		                        normal: {
		                            //color: '#c23531',
		                            //shadowBlur: 200,
		                            shadowColor: 'rgba(0, 0, 0, 0.5)'
		                        }
		                    }
		                }
		            ]
				    }),
    	window.onresize = function(){
			    myChart2.resize(); 
			};
    	
    },
  }
}
</script>
<style scoped="scoped">
.main ul.show_list{
	height:calc( 100% - 8%);
}
.main ul.show_list>li{
	float:left;
	margin-left: 1%;
    margin-bottom: 0.85em;
	background-color:#1c303a;
	color:white;
	box-shadow: 3px 10px 10px #233033;
	overflow: auto;
}
.main ul.show_list>li{
	/*height:22em;*/
	height: 46.5%;
	width:49%;
}
.main ul.show_list>li h2{
	text-align: center;
	font-weight: bold;
	color:#fecd02;
	margin:0px 0px 10px;
}
.main div#Log_manage{
	float: left;
	height:calc(100% - 3.4em);
	width:100%;
}
.main .show_list div.top{
	height:3em;
	line-height: 3em;
	margin-left:1em;
	font-size: 1.125em;
}

.main ul.top_list>li:first-child{
	margin-left:0px;
}
.main #Notice{
	padding:0px 10px;
	padding-left:15px;
}
.main #Notice>ul{
	margin:0px;
	padding:0px;
	list-style: none;
}
.main #Notice>ul li{
	height: 50px;
    border-bottom: 2px dashed #223640;
    padding-left: 1em;
    line-height: 50px;
}
.main div#Earn_country{
	height:calc(100% - 54px);
}
.main div#con{
	/*height:15em;*/
	float:left;
	height:calc(100% - 3.2em);
	width:100%;
	margin:0px auto;
	/*background-image: url(../../images/funcon.png);*/
}

</style>
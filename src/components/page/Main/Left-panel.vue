<template>
	<div id="left_panel2">
		<div class="left_panel">
			            	<div class="content">
				            	<div id="jquery-accordion-menu" class="jquery-accordion-menu red">
									<div id="form" class="jquery-accordion-menu-header">
										<form class="filterform" action="#">
											<input v-model="keyword" class="filterinput" @keyup="inputChange" @change="inputChange" type="text">
										</form>
									</div>
											<ul id="demo-list">
												<li :code="i.code" v-for="(i ,index) in father"  :class="{active :index ==num}">
													<a @click="liClick(i.code,index)" href="javascript:void(0)" class="submenu-indicator-minus" >
														<i class="fa fa-home"></i>
														{{i.name}}
													</a> 
													<ul class="submenu">
															<li v-for="(c ,e) in i.ChildrenMenu"  :class="{active :e ==nums}">
																<a   @click="addSecond(c.code,e)" href="javascript:void(0)" class="submenu-indicator-minus">{{c.name}}</a><span class="jquery-accordion-menu-label">{{c.count}}</span>
																<ul class="submenu">
																	<li v-for="(d , eq) in childs"  :class="{active :eq ==numt}" @click="tchild(eq,d.CODE)"><a href="javascript:void(0)">{{d.NAME}}</a></li>
																</ul>
															</li>
													</ul>
												</li>
											</ul>
				            	</div>
			            	</div>
			        </div>
	</div>
</template>

<script>
	
import Vue from 'vue'
import '../../../assets/js/jquery-accordion-menu.js'
import '../../../assets/css/jquery-accordion-menu.css'
import config from '../../../config/config.js'
export default{
	data(){
		return {
					father:[
							],
					child:[
						/*{NAME:"国家级自然保护区",CODE:"01",num:23},
						{NAME:"国家湿地公园",CODE:"02",num:67},
						{NAME:"国有林场",CODE:"03",num:98},*/
					],
					childs:[
					],
					active:"active",
					num:0,
					numt:-1,
					nums:-1,
					first:0,
					keyword:null,
		}
	},
	beforeCreate(){
			this.$http.get(config.content+'/asmx/MochaITomMainService.asmx/GetAreaMenu').then(response => {
		 									
						let result = response.body;
		                let father=[];
		                 result = $.parseXML(result);
		                 let obj;
		                 $(result).find("string").each(function(i){
		                                          
		                 	obj=$.parseJSON($(this).text());
		                                          
		                })
		               //  obj.Result[0].classify="active";
		                this.father = obj.Result;
						
		        }, response => {
		            console.log("error");
		        });

	},
	updated(){
		if(this.first==0){
			jQuery("#jquery-accordion-menu").jqueryAccordionMenu();
							$.expr[":"].Contains = function(a, i, m) {
								return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
							};
							$("span.submenu-indicator").css("transform","none");
						/*function filterList(header, list) {
								//@header 头部元素
								//@list 无需列表
								//创建一个搜素表单
								var form = $("<form>").attr({
									"class":"filterform",
									action:"#"
								}), input = $("<input>").attr({
									"class":"filterinput",
									type:"text"
								});*/
							/*	$(form).append(input).appendTo(header);*/
							/*	$(input).change(function() {
									var filter = $(this).val();
									if (filter) {
										$matches = $(list).find("a:Contains(" + filter + ")").parent();
										$("li", list).not($matches).slideUp();
										$matches.slideDown();
									} else {
										$(list).find("li").slideDown();
									}
									return false;
								}).keyup(function() {
									$(this).change();
								});
							}
							
							filterList($("#form"), $("#demo-list"));*/
							
		}	
	//	this.first==0?this.defaultF():null;
		this.first=1;
	},
	methods:{
		liClick(code,index){
			this.num=index;
			this.numt=-1;
			this.nums=-1;
			//跳转到首页
			 this.$router.replace({ path: '/' })
		},
		tchild(eq,placeId){
			this.numt=eq;
			this.$emit("setPlaceId",placeId);
			this.$store.commit("changePlace",{placeId:placeId});
		},
		inputChange(){
			if (this.keyword) {
			var $matches = $("#demo-list").find("a:Contains(" + this.keyword + ")").parent();
					$("li", "#demo-list").not($matches).slideUp();
					$matches.slideDown();
					} else {
							$("#demo-list").find("li").slideDown();
					}
				return false;
		},
		addSecond(a,e){
			this.$router.replace({ path: '/' });
			this.nums=e;
			this.numt=-1;
			$(this).addClass("active");
			let col=a;
			this.$http.get(config.content+'/asmx/MochaITomMainService.asmx/GetChildrenMenu',{params:{parentCode:col}}).then(response => {
		 				   				
						let results = response.body;
		                let childs=[];
		                 results = $.parseXML(results);
		                 let objs;
		                 $(results).find("string").each(function(i){
		                 	objs=$.parseJSON($(this).text());                   
		                })
		                objs.Result[0].classify="active";
		                this.childs = objs.Result;
		        }, response => {
		            console.log("error");
		        });
		},
		defaultF(){
			$("#demo-list>li:first-child").trigger("click");
			$("#demo-list>li:first-child ul.submenu>li:first-child>a").trigger("click");
		}
	},
}
</script>

<style>
	*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.content{width:100%;}
.filterinput{
	background-color:rgba(249, 244, 244, 0);
    /*background-image:url(../../images/Main/search_boxp.png);
 	border-radius:5px;
	background-repeat: no-repeat;
	background-size:cover;*/
	width:90%;
	border-radius:8px;
	font-size:1em;
	line-height: 20px;
	height:24px;
	border:1px solid #64798f;
	text-indent:0.5em;
	font-weight:normal;
	color:#FFF;
}
#demo-list a{
	overflow:hidden;
	text-overflow:ellipsis;
	-o-text-overflow:ellipsis;
	white-space:nowrap;
	width:100%;
}

</style>
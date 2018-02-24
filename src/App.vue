<template>
  <div id="app" class="main" v-if="roleType=='1'">
  	<div class="head">
  		<div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 nopadding">
  				<Nava></Nava>
  		</div>
  	</div>
  	<div class="body" :style="{height:  $route.height}">
  		<div class="col-lg-2 col-sm-2 col-md-2 col-xs-12 nopadding left_section">	
  			<leftpanel v-on:setPlaceId="actionId"></leftpanel>
  		</div>
  		<div class="col-lg-10 col-sm-10 col-md-10 col-xs-12 nopadding right_section"> 
  			<div id="nav_list">
	  			<div class="top_nav">
		  			<ul class="top_list">
			  			<li>
			  				<div class="nav_icon page_main">
			  					<img src="./assets/Main/page_main.png" alt="主页">
			  					<router-link class="MainPage" to= "/">主         页</router-link>
			  				</div>
			  			</li>
			  			<li>
			  				<div class="nav_icon travel">
			  					<img src="./assets/Main/travel.png" alt="巡航设备">
			  					<router-link to="/TravelSet">巡航设备</router-link>
			  				</div>
			  			</li>
			  			<li>
			  				<div class="nav_icon service">
			  					<img src="./assets/Main/service.png" alt="服务器">
			  					<router-link to="/ServerManage">服务器</router-link>
			  				</div>
			  			</li>
			  			<li>
			  				<div class="nav_icon beyound">
			  					<img src="./assets/Main/beyound.png" alt="在线升级">
			  					<router-link to="/OnlineUpdate">在线升级</router-link>
			  				</div>
			  			</li>
			  			<li>
			  				<div class="nav_icon map">
			  					<img src="./assets/Main/map.png" alt="地图服务">
			  					<router-link to="/MapManage">地图服务</router-link>
			  				</div>
			  			</li>
			  			<li>
			  				<div class="nav_icon user">
				  				<img src="./assets/Main/user.png" alt="用户管理">
				  				<router-link  to= "/ManageSud">用户管理</router-link>
			  				</div>
			  			</li>
			  			<li>
			  				<div class="nav_icon role">
			  					<img src="./assets/Main/role.png" alt="角色管理">
			  					<router-link  to= "/ManageRole">角色管理</router-link>
			  				</div>
			  			</li>
			  			<li>
			  				<div class="nav_icon log">
			  					<img src="./assets/Main/log.png" alt="日志管理">	
			  					<router-link to="/LogManage">日志管理</router-link>
			  				</div>
			  			</li>
			  			<li>
			  				<div class="nav_icon notice">
			  					<img src="./assets/Main/notice.png" alt="公告管理">
			  					<router-link to="/NoticeManage">公告管理</router-link>
			  				</div>
			  			</li>
			  			<li>
			  				<div class="nav_icon doc">
			  					<img src="./assets/Main/doc.png" alt="字典管理">
			  					<router-link to="/DocManage">字典管理</router-link>
			  				</div>
			  			</li>
			  			<li>
			  				 <div class="nav_icon book">
			  					<img src="./assets/Main/book.png" alt="定制表单">
			  					<a href="">定制表单</a>
			  				</div>
			  				<!--<div class="nav_icon doc">
			  					<img src="./assets/Main/doc.png" alt="字典管理">
			  					<router-link to="/Panos">全景展示</router-link>
			  				</div>-->
			  			</li>
		  			</ul>
	  			</div>
  			</div>
	  			<keep-alive>
	  				<router-view></router-view>
	  			</keep-alive>

  		</div>
  	</div>
  </div>
  
    <div id="app" class="main user" v-else-if="roleType=='0'">
  	<div class="head">
  		<div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 nopadding">
  				<Nava></Nava>
  		</div>
  	</div>
  	<div class="body" :style="{height:  $route.height}">
  	
  		<div class="col-lg-2 col-sm-2 col-md-2 col-xs-12 nopadding left_section">	
  			<!--<leftpanel v-on:setPlaceId="actionId"></leftpanel>-->
  			
  				<div id="nav_list">
		  			<div class="top_nav">
				  		<ul class="Panel_list">
					  			<li>
				  				<div class="nav_icon page_main">
				  					<img src="./assets/Main/page_main.png" alt="主页">
				  					<router-link class="MainPage" to= "/"> 主         页
				  						
				  					</router-link>
				  				</div>
				  			</li>
				  			<li>
				  				<div class="nav_icon travel">
				  					<img src="./assets/Main/travel.png" alt="巡航设备">
				  					<router-link to="/TravelSet">巡航设备</router-link>
				  				</div>
				  			</li>
				  			<li>
				  				<div class="nav_icon service">
				  					<img src="./assets/Main/service.png" alt="服务器">
				  					<router-link to="/ServerManage">服务器</router-link>
				  				</div>
				  			</li>
				  			<li>
				  				<div class="nav_icon beyound">
				  					<img src="./assets/Main/beyound.png" alt="在线升级">
				  					<router-link to="/OnlineUpdate">在线升级</router-link>
				  				</div>
				  			</li>
				  			<li>
				  				<div class="nav_icon map">
				  					<img src="./assets/Main/map.png" alt="地图服务">
				  					<router-link to="/MapManage">地图服务</router-link>
				  				</div>
				  			</li>
				  			<li>
				  				<div class="nav_icon user">
					  				<img src="./assets/Main/user.png" alt="用户管理">
					  				<router-link  to= "/ManageSud">用户管理</router-link>
				  				</div>
				  			</li>
				  			<li>
				  				<div class="nav_icon role">
				  					<img src="./assets/Main/role.png" alt="角色管理">
				  					<router-link  to= "/ManageRole">角色管理</router-link>
				  				</div>
				  			</li>
				  			<li>
				  				<div class="nav_icon log">
				  					<img src="./assets/Main/log.png" alt="日志管理">	
				  					<router-link to="/LogManage">日志管理</router-link>
				  				</div>
				  			</li>
				  			<li>
				  				<div class="nav_icon notice">
				  					<img src="./assets/Main/notice.png" alt="公告管理">
				  					<router-link to="/NoticeManage">公告管理</router-link>
				  				</div>
				  			</li>
				  			<li>
				  				<div class="nav_icon doc">
				  					<img src="./assets/Main/doc.png" alt="字典管理">
				  					<router-link to="/DocManage">字典管理</router-link>
				  				</div>
				  			</li>
				  			<li>
				  				<div class="nav_icon book">
				  					<img src="./assets/Main/book.png" alt="定制表单">
				  					<a href="">定制表单</a>
				  				</div>
				  			</li>
			  			</ul>
		  			</div>
  				</div>

  		</div>
  		<div class="col-lg-10 col-sm-10 col-md-10 col-xs-12 nopadding right_section listPanel"> 
  			<router-view></router-view>
  		</div>
  	</div>
  </div>
  
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Nava from './components/page/Main/Nav'
import leftpanel from './components/page/Main/Left-panel'
import swal from './components/sweetalert/sweetalert-dev.js'
import iView from 'iview';
import './components/sweetalert/sweetalert.css';
import 'iview/dist/styles/iview.css';
import config from './config/config.js'
Vue.use(iView)  
export default {
  name: 'app',
  components: {Nava,leftpanel},
  data(){
  	return{
  		placeId:null,      //三级目录ID
  		roleType:"0",  //admin//user --->publish
  	//  roleType:"1",
  	  account:"",
  	  ticket:"",
  	}		
  },

  beforeMount(){
  		
  		if(this.getC("account") && this.getC("account")!=" " && this.getC("account")!=""){

  				sessionStorage.setItem("account",this.getC("account"));
  				sessionStorage.setItem("ticket",this.getC("ticket"));
  				
  				this.account = this.getC("account");
  				this.ticket  = this.getC("ticket");
  			
  			
  			
  		}else{
  			
  			if( sessionStorage.getItem("account") && sessionStorage.getItem("account") != '' && sessionStorage.getItem("account")!=" "){
  				
  					this.account = sessionStorage.getItem("account");
  			    this.ticket  = sessionStorage.getItem("ticket");
  			
  			}else{
  				
  				swal({ 
							  title: "身份已信息失效", 
							  text: "请重新登录！", 
							  type: "warning",
							  showCancelButton: false, 
							  confirmButtonColor: "#DD6B55",
							  confirmButtonText: "确定", 
							  closeOnConfirm: false
							},
							function(){
							  window.location = config.quit;
							});
  			}

  		}
			this.getMsg();
  },
  methods:{
  	actionId:function(data){
  		this.placeId=data;
  	},
  	getC(name){
  		
  				let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			    let r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  decodeURI(r[2]); return null;
  		
  	},
		getMsg(){
			this.$http.get(config.content+'/asmx/LoginService.asmx/CheckLogin',{params:{account:this.account,ticket:this.ticket}}).then(response => {			
										
										this.roleHas=0;
										let result = response.body;
						        result = $.parseXML(result);
						        let obj;
						        $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						        })
										
						        if(obj.Result){
						         obj.Result.type?this.roleType=obj.Result.type:this.roleType="0";

											this.$store.state.USER_MC=obj.Result.info[0]. USER_MC;
											this.$store.state.USER_ID=obj.Result.info[0]. USER_ID;
											this.$store.state.ROLE_MC=obj.Result.info[0]. ROLE_MC;
								        if(obj.Result.type== "1"){   //超级管管理员
								        	
								        this.$store.state.LOCAL_MC='茂兰国家级自然保护区';
													this.$store.commit("changePlace",{placeId:"1101001"});
								        
								        	
								        }else{
								        	
								        	this.$store.state.LOCAL_MC=obj.Result.info[0]. NAME;
								        	
													this.$store.commit("changePlace",{placeId:obj.Result.info[0]. SHANGJI_ID});
								        }
						           console.log(this.$store.state.LOCAL_MC);
						        }else{
						        	
											//	this.$store.commit("changePlace",{placeId:""}); --publish
						        		
						        		this.$store.commit("changePlace",{placeId:"1101001"});
						        		
						        }
						        
						       
						       
										
						        }, response => {
						           this.$Message.warn('系统繁忙！');
						        });
		}
  }
} 


</script>

<style>

/***当前位置**/
.main div.local{
	color:#b9cdd7;
	padding-left:1em;
}
/*自定义iview*/
/*****model***********/

.v-transfer-dom .ivu-modal-content{
	background-color:#161e2e;
}
.v-transfer-dom .ivu-form .ivu-form-item-label{
	  color:#b9cdd7;
}

.v-transfer-dom .ivu-modal-header{
	border-bottom: none;
	background-color:#161e2e;
	font-family: "微软雅黑";
	color:#b9cdd7;
	padding:10px 8px;
}
.v-transfer-dom .ivu-modal-close .ivu-icon-ios-close-empty{
	top: -3px;
}
.v-transfer-dom .ivu-modal-body{
	color:#b9cdd7;
	background-color:#1e2a3a;
}
.v-transfer-dom .ivu-modal-footer{
	border-top: none;
	padding: 10px 8px;
}
.v-transfer-dom .ivu-input{
	background-color:#161e2e;
	color: #b9cdd7;
	border-radius: 0px;
	border-color:#b9cdd7;
	color:#b9cdd7;
}
.v-transfer-dom .ivu-form-item-error-tip{
	/*color:#b9cdd7;*/
	color:#57a3f3;
}
.v-transfer-dom .ivu-form-item-error .ivu-input:hover{
	border-color: #57a3f3;
}
.v-transfer-dom .ivu-form-item-error .ivu-input{
	border-color: #57a3f3;
}
.v-transfer-dom .ivu-form-item-required .ivu-form-item-label:before{
	/*color:#b9cdd7;*/
	color:#57a3f3;
}
.ivu-form .ivu-form-item-error-tip{
	/*color:#b9cdd7;*/
	color:#57a3f3;
}
.ivu-form .ivu-form-item-error  .ivu-input:hover{
	border-color: #57a3f3;
}
.ivu-form .ivu-form-item-error .ivu-input{
	border-color: #57a3f3;
}
.ivu-form .ivu-form-item-required .ivu-form-item-label:before{
	/*color:#b9cdd7;*/
	color:#57a3f3;
}

/*下拉列表*/
.v-transfer-dom .ivu-form-item-error .ivu-select-selection{
	border:1px solid #57a3f3;
}
.v-transfer-dom .ivu-form-item-error .ivu-select-arrow {
	color:#57a3f3;
}
.ivu-select .ivu-select-selection,.v-transfer-dom .ivu-select-selection{
	background-color:rgb(22,30,46);
	border-radius: 0px;
}
.ivu-select .ivu-select-dropdown,.v-transfer-dom .ivu-select-dropdown{
	background-color:#1e2a3a;
}
.ivu-select .ivu-select-selected-value,.v-transfer-dom .ivu-select-selected-value{
	color:#b9cdd7;
}
.ivu-select .ivu-select-item,.v-transfer-dom .ivu-select .ivu-select-item{
	color:#b9cdd7;
	background-color:#1e2a3a;
}
.ivu-select .ivu-select-item:hover,.v-transfer-dom .ivu-select-item:hover{
	background-color:rgb(22,30,46);
}
/*弹出框的下拉列表*/
.ivu-modal .ivu-cascader .ivu-cascader-menu-item{
	color:#b9cdd7;
	background-color:#1e2a3a;
}
.ivu-modal .ivu-cascader .ivu-cascader-menu-item:hover{
	background-color:rgb(22,30,46);
}

/********文件上传**************/
.v-transfer-dom .ivu-upload-list-file>span,.main .ivu-upload-list-file .ivu-upload-list-file>span{
	color:#b9cdd7;
}
.v-transfer-dom .ivu-upload-list-file>span i,.main .ivu-upload-list-file .ivu-upload-list-file>span i{
	color:#b9cdd7;
}
.v-transfer-dom .ivu-upload-list-file:hover,.main .ivu-upload-list-file:hover{
	background-color:#161e2e;
}
/*******时间日期*********/
.v-transfer-dom .el-input__inner,.main .el-input__inner{
	background-color:rgb(22,30,46);
	color:#b9cdd7;
	border-radius: 0px;
}
.v-transfer-dom .el-picker-panel,.v-transfer-dom .el-picker-panel__footer,.main .el-picker-panel,.main .el-picker-panel__footer{
	background-color:rgb(22,30,46);
	color:#fff;
}
.v-transfer-dom .el-date-table td.available:hover,.main .el-date-table td.available:hover{
	background-color:#1e2a3a;
}
.v-transfer-dom .el-date-table td.next-month,.v-transfer-dom .el-date-table td.prev-month,.main .el-date-table td.next-month,.main .el-date-table td.prev-month{
	color:#8391a5;
}
.v-transfer-dom .el-date-table td.disabled,.main .el-date-table td.disabled{
	background-color:#1e2a3a;
}
.v-transfer-dom .el-picker-panel__btn,.main .el-picker-panel__btn{
		color:#b9cdd7;
}
.v-transfer-dom .el-picker-panel,.main .el-picker-panel{
	box-shadow: 0 2px 6px #1e2a3a;
}
.v-transfer-dom .el-picker-panel__body .el-input__inner,.main .el-picker-panel__body .el-input__inner{
	border:none;
	color:rgb(87, 163, 243);
}
.v-transfer-dom .ivu-btn-text{
	color:#b9cdd7;
}
/******单选**********/
.ivu-radio-group .ivu-radio-inner{
	background-color:#1e2a3a;
}
/****el树************/
.main .el-tree,.v-transfer-dom .el-tree{
	color:#b9cdd7;
	background-color:#1e2a3a;
	border:none;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
	background-color:#161e2e;
}
.main .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content,.v-transfer-dom .el-tree--highlight-current .el-tree-node.is-current{
	background-color:#161e2e;
}
.main .el-checkbox__inner,.v-transfer-dom .el-checkbox__inner{
	background-color:#161e2e;
}
.main .el-tree-node__content:hover,.v-transfer-dom .el-tree-node__content:hover{
	background-color:#161e2e;
}

/****eltable***********/
.v-transfer-dom .el-table,.main .el-table{
	background-color: #161e2e;
  color: #b9cdd7;
  border:none;
}
.v-transfer-dom .el-table tr,.main .el-table{
	background-color: #1e2a3a;
}
.v-transfer-dom .el-table--enable-row-hover .el-table__body tr:hover>td,.main .el-table--enable-row-hover .el-table__body tr:hover>td{
	background-color: #161e2e;
}
.v-transfer-dom .el-tabs__header,.main .el-tabs__header{
	height:42px;
}
.v-transfer-dom .el-tabs__content,.main .el-tabs__content{
	height: calc(100% - 80px);
}
.v-transfer-dom .el-table::before,.main .el-table::before{
	height:0px;
}
.v-transfer-dom .el-table::after,.main .el-table::after{
	width:0px;
}
.v-transfer-dom .el-table tbody,.main .el-table tbody{
	border:none;
}
.v-transfer-dom .el-table th,.main .el-table th{
	background-color:#37505f;
	color:#b9cdd7;
}
.v-transfer-dom .el-table th>.cell,.main .el-table th>.cell{
	background-color: #37505f;
	color:#b9cdd7;
}
.v-transfer-dom .el-table tr,.main .el-table tr{
	background-color:#223642;
	color:#b9cdd7;
	border:none;
}
.v-transfer-dom .el-table td,.v-transfer-dom .el-table th.is-leaf,.main .el-table td,.main .el-table th.is-leaf{
	 border-bottom:0px !important;
}
.v-transfer-dom .el-table tr:hover>td,.main .el-table tr:hover>td{
	background-color:#37505f;
}
.v-transfer-dom .el-table__body tr.current-row>td,.main .el-table__body tr.current-row>td{
	background-color:#587081;
}



/*公告管理开始时间,结束时间*/
.main div.search label{
	font-weight:normal;
}
.main div.search .date .el-input__inner{
	background-color: rgba(205,210,234,0.2);
	border: 1px solid #8a92a8;
	color:#fff;
}
.main div.search .date .el-input__icon{
	color:#fff;
}

.main div.search .endDate .el-input__inner{
	background-color: rgba(205,210,234,0.2);
	border: 1px solid #8a92a8;
	color:#fff;
}
.main div.search .endDate .el-input__icon{
	color:#fff;
}


.main div.search .input .ivu-input{
	background-color: rgba(205,210,234,0.2);
	color:#fff;
}

.main div.search .input .ivu-input:hover {
    border-color: #8a92a8;
}
/*下拉列表*/
div.search .ivu-select-selection{
	  background-color: rgba(205,210,234,0.2);
    border: 1px solid #8a92a8;
    color:#fff;
}
div.search .ivu-select-arrow{
	color:#fff;
}
/*用户管理*/
div.manageTree .el-tree{
	background-color: #2a404e;
	color:#b9cdd7;
	border-color: #2a404e ;
}
div.manageTree .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
	    background-color: #587081;
}
div.manageTree .el-tree-node__content:hover{
	background-color: #587081;
}
div.manageTree .el-tabs--border-card>.el-tabs__header{
	background-color: #2a404e;
	border-bottom-color: #1c303a;
}
div.manageTree .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
	background-color: #1c303a;
	border-color:#1c303a ;
}
div.manageTree .el-tabs--border-card{
	border:none;
	background-color: #1c303a ;
}
div.manageTree label.ivu-form-item-label{
	color:#b9cdd7;
}
div.manageTree .ivu-input{
	background-color: #1e2a3a;
	color:#b9cdd7;
}

/*项目*/
.main ul.top_list {
	float: left;
    margin-top: 1.875em;
    padding: 0 0.8%;
}
.main ul.top_list>li{
	list-style: none;
	margin:0px;
	/*height:4.25em;*/
	margin-bottom:0.4em;
}
.main ul.top_list>li>div>a{
	text-decoration: none;
	color:#fff;
}
.main ul.top_list>li>div>a.router-link-exact-active{
	color:#1c303a;
}
 .main ul.top_list>li{
    	    width: 8.3em;
    		font-size: 16px;
    }
.main ul.top_list {
	float:left;
	margin-top:1em;
	margin-left: 10px;
	padding:0px;
	}
.main ul.Panel_list>li{
	margin:1em 1em 0;
}

div#nav_list  ul.Panel_list>li>div>a{
	text-decoration: none;
	color:#fff;
}
div#nav_list  ul.Panel_list>li>div>a.router-link-exact-active{
	color:#1c303a;
}
/*滚动条*/
#left_panel2::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #1C303A;
	
}

#left_panel2::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

#left_panel2::-webkit-scrollbar-thumb
{
		background-color: rgb(41,73,95);
}

.show_list>li::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #1C303A;
	
}

.show_list>li::-webkit-scrollbar
{
	width: 10px;
	height:10px;
	background-color: #F5F5F5;
}

.show_list>li::-webkit-scrollbar-thumb
{
		background-color: rgb(41,73,95);
}



body::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		background-color: #1C303A;
	
}

body::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

body::-webkit-scrollbar-thumb
{
	background-color: rgb(41,73,95);
}
/*********ie8滚动兼容***************/
body{
	scrollbar-face-color:#1C303A;
	scrollbar-3dlight-color: rgb(41,73,95);
	scrollbar-shadow-color: rgb(41,73,95);
  scrollbar-highlight-color: rgb(41,73,95);
	scrollbar-track-color: rgb(41,73,95);
}

/***********表格样式*************/
.main div.table{
	height: calc(100% - 60px);
    overflow-y: auto;
}
.main div.table::-webkit-scrollbar-track 
{ -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
background-color: rgb(41,73,95); } 
.main div.table::-webkit-scrollbar 
{ width: 10px; background-color: #F5F5F5; } 
.main div.table::-webkit-scrollbar-thumb 
{ background-color: #1C303A; }

/**********表格样式*****************/
.main table.msg_table{
	width:100%;
	color: #b9cdd7;
}
.main table.msg_table thead tr{
	height: 44px;
	background-color: #29495f;
	text-align: center;
	font-size: 1.25em;
}
.main table.msg_table tbody tr.serverMag>td:first-child{
	width:40px;
}
.main table.msg_table tbody tr.serverMag>td:nth-child(2){
	display: none;
}
.main table.msg_table tbody tr.serverMag>td:nth-child(3){
	display: none;
}
.main table.msg_table tbody tr.serverMag>td:nth-child(4){
	display: none;
}
.main table.msg_table tr{
	font-size: 1em;
	height:44px;
	text-align: center;
	background-color: #223642;
	cursor:pointer;
}
.main table.msg_table tr.odd{
	background-color: #2a404e;
}
.main table.msg_table tbody tr:hover{
	background-color: #37505f;
}
.main table.msg_table tr.active{
	background-color: #37505f;
}
.main table.msg_table tr div.check_box{
	height:1em;
	width:1em;
	background-color: #798e9a;
	margin:0px auto;
	cursor: pointer;
}
.main table.msg_table tbody td>div{
	margin:0px auto;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}
.main table.msg_table tr div.check_box.active{
	background-image: url(./assets/table/right.png);
	background-repeat: no-repeat;
	background-position: center;
}
.main table.msg_table tr div.check_box.active.noactive{
	background: none;
}

.main table.msg_table tbody tr>td:nth-child(2){
	display: none;
}
.main table.msg_table tbody tr>td:nth-child(3){
	display: none;
}
/*//公告管理*/
.main table.msg_table tbody tr.noticeMag>td:nth-child(4){
	display: none;
}
.main table.msg_table tbody tr.noticeMag>td:nth-child(6){
	max-width:600px;
}
/*//角色管理*/
.main table.msg_table tbody tr.ManageRole>td:nth-child(6){
	display: none;
}
.main table.msg_table tbody tr.ManageRole>td:nth-child(8){
	display: none;
}
.main table.msg_table tbody tr.ManageRole>td button{
	color: #fff;
    width: 4.5em;
    height: 2em;
    border-radius: 5px;
    background-color: rgba(205,210,234,0.2);
    margin-left: 10px;
    line-height: 2em;
    cursor: pointer;
    border: 1px solid #8a92a8;
}

/*日志管理*/
.main table tr.Log_msg td:nth-child(4){
	display: none;
}
.main table tr.Log_msg td:nth-child(8){
	display: none;
}
.main table tr.Log_msg td:nth-child(10){
	display: none;
}
/*****字典管理*******/

.main table tr.doc_Msg td:nth-child(4){
	display: none;
}
.main table tr.doc_Msg td:nth-child(6){
	max-width:600px;
}
.main table tr.doc_Msg td:nth-child(7){
	display: none;
}
.main table tr.doc_Msg td:nth-child(10){
	max-width:400px;
	overflow:hidden;
text-overflow:ellipsis;
-o-text-overflow:ellipsis;
white-space:nowrap;
}

/***************地图服务表格设置********************/

.main table.msg_table tbody tr.MapTable>td:nth-child(4)>div{
	width: 120px;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(6)>div{
	max-width: 560px;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(4){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(5){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(6){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(7){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(8){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(14){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(10){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(11){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(15){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(17){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(18){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:nth-child(19){
	display:none;
}
.main table.msg_table tbody tr.MapTable>td:last-child{
	display: none;
}
/********设置*****************************/

/*.main table.msg_table tbody tr.Setting>td:nth-child(6){
	display: none;
}*/

/****************在线升级*******************/
.main table.msg_table tbody tr.OnlineUpdate>td:nth-child(4){
	display: none;
}
.main table.msg_table tbody tr.OnlineUpdate>td:nth-child(6) div{
	width:400px;
}
.main table.msg_table tbody tr.OnlineUpdate>td:nth-child(7) div{
	width:300px;
}
.main table.msg_table tbody tr.OnlineUpdate>td:last-child{
	display: none;
}





/**********分页工具条**************************/

.main div.page_list{
	margin:10px;
	padding:10px;
	color:#b9cdd7;
	background-color: #1c303a;
	height: calc(100% - 184px);
}
.main div.listPanel{
	margin-top:20px;
}
.main div.listPanel .page_list{
	height: calc(100% - 100px);
}
.main div.listPanel .table{
	height: calc(100% - 60px);
}
.main div.page_list ul.page{
	margin:0px auto;
	margin-top: 20px;
	height:20px;
	width:430px;
	padding:0px;
}
.main div.page_list li{
	list-style: none;
	float:left;
	margin-left:4px;
}
.main div.page_list li>div{
	width:1.5em;
	height:1.5em;
	border-radius: 3px;
	background-color: #2b424f;
	text-align: center;
	font-size: 1em;
	cursor: pointer;
}
.main div.page_list li>input.local_page{
	outline: none;
	border:0px;
	border-radius: 3px;
	background-color: #527083;
	text-align: center;
	width:1.5em;
	height:1.5em;
}
.main div.page_list .page li>div{
	background-size:8px  8px;
	background-repeat:no-repeat ;
	background-position:6px  8px;
}
.main div.page_list .page li .prev{
	background-image: url(./assets/table/prev.png);
}
.main div.page_list .page li .top{
	background-image: url(./assets/table/tool_top.png);
}
.main div.page_list .page li .bottom{
	background-image: url(./assets/table/bottom.png);
}
.main div.page_list .page li .next{
	background-image: url(./assets/table/next.png);
}
</style>

<template>
	<div id="nav">
		<div class="nav">
			<div class="nav_list">
				<ul id="nav_ul">
					<li :title="USER_MC" >
						<Icon size="22" type="person"></Icon>
						用户：<p class="user">{{this.USER_MC}}</p></li>
					<li :title="ROLE_MC">
						<Icon size="22" type="key"></Icon>
						角色：<p class="role">{{this.ROLE_MC}}</p></li>
					<li title="点击查看个人信息" @click="UpdateMessage"><span class="personal"></span>个人信息</li>
					<li title="点击修改密码" @click="UpdatePassword"><span class="password"></span>修改密码</li>
					<li title="退出"><span class="quit"></span> <a :title="URL" :href="URL">退出</a></li>
					<li title="系统设置" @click="setting">
						<span class="setting" >
							<Icon size="22" type="gear-a"></Icon>
						</span>
						设置
					</li>
				</ul>
			</div>
		</div>
		
		
		
		
		 <Modal
        v-model="UpdateP" @on-cancel="UpdateP=false">
         <p slot="header" style="color:#57a3f3;text-align:left;font-size:20px;font-weight:normal">
		    <span>密码修改</span>
		</p>
        <div>
        	<Form ref="detailUserMsg" :rules="formInline2" :model="detailUserMsg" :label-width="120">
				<FormItem prop="T_PASSWORD" label="请输入登录密码" >
					<Input type="password" v-model="detailUserMsg.T_PASSWORD" placeholder="请输入">
					</Input>
				</FormItem>
				<FormItem prop="N_PASSWORD" label="请输入新密码">
					<Input type="password" v-model="detailUserMsg.N_PASSWORD" placeholder="请输入">
					</Input>
				</FormItem>
				<FormItem prop="NG_PASSWORD" label="确认密码">
					<Input type="password" v-model="detailUserMsg.NG_PASSWORD" placeholder="请输入">
					</Input>
				</FormItem>
					<!--<Button type="primary" style="float:right;" @click="saveUser">保存</Button>-->
				</Form>
        </div>
          
				
				 <div slot="footer">
		        	<Button type="text" @click="closeM">取消</Button>
		            <Button type="primary" @click="saveUser('detailUserMsg')">保存</Button>
        		</div>
				
    	</Modal>
		
		
		
		
		
		 <Modal
        v-model="UpdateM" @on-cancel="UpdateM=false">
         <p slot="header" style="color:#57a3f3;text-align:left;font-size:20px;font-weight:normal">
		    <span>个人信息</span>
		</p>
		
		<div class="photo">
			
			<div class="icon">
				<img src="" alt="" />
			</div>
			
		</div>
        
        <div class="msg">
        	<Form ref="detailUserMsg" :rules="formInline" :model="detailUserMsg" :label-width="80">
				<FormItem prop="LOGNAME" label="登录账号" >
					<Input title="登录账号不能修改"  disabled="disabled"  type="text" v-model="detailUserMsg.LOGNAME" placeholder="请输入">
					</Input>
				</FormItem>
				<FormItem prop="USER_MC" label="用户名称">
					<Input type="text" v-model="detailUserMsg.USER_MC" placeholder="请输入">
					</Input>
				</FormItem>
				<FormItem prop="SHEBEI_BH" label="手机号">
					<Input type="text" v-model="detailUserMsg.SHEBEI_BH" placeholder="请输入">
					</Input>
				</FormItem>
				<FormItem prop="NEIBU_DH" label="内部短号">
					<Input type="text" v-model="detailUserMsg.NEIBU_DH" placeholder="请输入">
					</Input>
				</FormItem>
				<FormItem prop="DATE_YQ" label="时间要求">
					<Input type="text" v-model="detailUserMsg.DATE_YQ" placeholder="请输入">
					</Input>
				</FormItem>
				<FormItem prop="EMAIL" label="邮箱">
					<Input type="text" v-model="detailUserMsg.EMAIL" placeholder="请输入">
					</Input>
				</FormItem>
				
				<!--<FormItem prop="MIAOSHU" label="所属部门">
						<Input type="text" v-model="detailUserMsg.JIGOU_ID_NAME" placeholder="请输入">
						</Input>
					</FormItem>-->
				<!-- <FormItem prop="MIAOSHU" label="修改头像">
						<Upload
							action="http://101.200.232.210:8020/asmx/UserManager.asmx/UploadFile"
							:format="['jpg','jpeg','gif','png']"
							:on-format-error="handleFormatError"
							:max-size = "1024000"
							:on-success="UploadDetail"
							:show-upload-list= "true"
							:on-error="Uploaderror">
							<Button type="ghost" icon="ios-cloud-upload-outline"  long style="color:#b9cdd7">选择要上传文件的文件</Button>
						</Upload>
					</FormItem>-->
					
				<FormItem prop="MIAOSHU" label="用户描述">
						<Input type="textarea" :autosize="{minRows: 2,maxRows: 2}" v-model="detailUserMsg.BEIZHU" placeholder="请输入">
						</Input>
				</FormItem>
					<!--<Button type="primary" style="float:right;" @click="saveUser">保存</Button>-->
				</Form>
        </div>
          
				
				 <div slot="footer">
		        	<Button type="text" @click="closeM">取消</Button>
		            <Button type="primary" @click="saveUser('detailUserMsg')">保存</Button>
        		</div>
				
    	</Modal>
	</div>
</template>

<script>
import config from '../../../config/config.js'
export default {	
	data () {
		
		const validatePass = (rule, value, callback) => {
			var  value = $.trim(value);
                if (value === ''|| !value) {
                    callback(new Error('请输入登录密码'));
                } 
                else if($.trim(value) != $.trim(this.detailUserMsg.PASSWORD) ){
                	
                    callback(new Error('密码不正确请重新输入'));
                    
                }else {
                	callback();
                }
            };
            const validateNPass = (rule, value, callback) => {
                var  value = $.trim(value);
                if (value === ''|| !value) {
                    callback(new Error('请输入新密码'));
                } 
                else if($.trim(value) == $.trim(this.detailUserMsg.PASSWORD) ){
                	
                    callback(new Error('密码和原密码一致，请重新输入'));
                    
                }else {
                	callback();
                }
            };
            const validateNGPass = (rule, value, callback) => {
                var value = $.trim(value);
                if (value === ''|| !value) {
                    callback(new Error('请再次输入新密码'));
                } 
                else if($.trim(value) != $.trim(this.detailUserMsg.N_PASSWORD) ){
                	
                    callback(new Error('两次输入不一致，请重新输入'));
                    
                }else {
                	callback();
                }
            };
		
    			return {
    					USER_MC:"",
    					ROLE_MC:"",
    					URL:"",
    					account:null,
    					ticket:null,
						UpdateM:false,
						UpdateP:false,
						detailUserMsg:{
							LOGNAME:null,
						    USER_MC:null,
						    T_PASSWORD:null,
						    TOUXIANG:null,
						    SHEBEI_BH:null,
						    NEIBU_DH:null,
						    DATE_YQ:null,
						    JIGOU_ID:null,
						    EMAIL:null,
						    BEIZHU:null,
						    N_PASSWORD:null,
						    NG_PASSWORD:null
						},
						formInline:{

									EMAIL: [
					                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
					                        { type: 'email', message: '清输入正确的邮箱', trigger: 'blur' }
                    							],
									 LOGNAME:[
									 	 { required:true, message: '请输入用户名', trigger: 'blur' },
									 ],
									 USER_MC: [
							            { required: true, message: '请输入用户名称', trigger: 'blur'},
							          ]
		    					},
		    			formInline2:{
							         T_PASSWORD:[
							         	{required: true,  validator: validatePass, trigger: 'blur' }
							         ],
							         N_PASSWORD:[
							         	{required: true,  validator: validateNPass, trigger: 'blur' }
							         ],
							         NG_PASSWORD:[
							         	{required: true,  validator: validateNGPass, trigger: 'blur' }
							         ],
							         
		    					},
    	}
  },
/* computed:{
		    		USER_MC:function(){
		    			return this.$store.state.USER_MC;
		    		},
		    		ROLE_MC:function(){
		    		
		    			return this.$store.state.ROLE_MC;
		    		}
		    	},*/
    mounted(){
    	
		this.URL=config.quit;
		this.account = sessionStorage.getItem("account");
		
		this.ticket = sessionStorage.getItem("ticket");
		
    	this.getPerMsg();
  },
  methods:{
  		closeM(){
  			this.UpdateP=false;
  		    this.UpdateM=false;
  		},
  	  	getPerMsg:function(){
  		
  		let getC=function(name){
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  decodeURI(r[2]); return null;
			};
			this.$http.get(config.content+'/asmx/LoginService.asmx/CheckLogin',{params:{account:this.account,ticket:this.ticket}}).then(response => {			
										
										this.roleHas=0;
										let result = response.body;
						        result = $.parseXML(result);
						        let obj;
						        $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						        })
						        
						        if(obj.Result){
						        	this.roleType=obj.Result.type;
						        			
						        			this.USER_MC=obj.Result.info[0]. USER_MC;
						        			this.ROLE_MC=obj.Result.info[0]. ROLE_MC;
											this.$store.state.USER_MC=obj.Result.info[0]. USER_MC;
											this.$store.state.USER_ID=obj.Result.info[0]. USER_ID;
											this.$store.state.ROLE_MC=obj.Result.info[0]. ROLE_MC;
											
						        }
										
						        }, response => {
						           this.$Message.warn('系统繁忙！');
						        });
  	},
  	setting(){
  		this.$router.replace({ path: '/Setting' });
  	},
  	UpdateMessage(){
        this.$refs['detailUserMsg'].resetFields();
  		this.$http.get(config.content+'/asmx/UserManager.asmx/GetUserDetail',{params:{userId:this.$store.state.USER_ID,}}).then(response => {			
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						            
						                obj.Result?this.detailUserMsg=obj.Result[0]:
						                this.detailUserMsg={};
						        }, response => {
						            console.log("error");
						        });
  		
  		this.UpdateP=false;
  		this.UpdateM=true;
  	},
  	UpdatePassword(){
  	//	this.$refs['detailUserMsg'].resetFields();
  		this.$http.get(config.content+'/asmx/UserManager.asmx/GetUserDetail',{params:{userId:this.$store.state.USER_ID,}}).then(response => {			
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						            	
						            	if(obj.Result){
						            		this.detailUserMsg=obj.Result[0];
						            		this.detailUserMsg.T_PASSWORD = null;
						            		this.detailUserMsg.N_PASSWORD = null;
						            		this.detailUserMsg.NG_PASSWORD = null;
						            	}else{
						            		this.detailUserMsg={};
						            	}
						            	
						        }, response => {
						            console.log("error");
						        });
						        
		this.UpdateP=true;
  		this.UpdateM=false;				        
  	},
  	saveUser(name){
  		
  		this.$refs[name].validate((valid) => {
  			
  			if(valid){
  				
  				let jsons=this.detailUserMsg;
  				
  				if(this.detailUserMsg.NG_PASSWORD){
  					jsons.PASSWORD=this.detailUserMsg.NG_PASSWORD;
  				}
  				
  				delete jsons.N_PASSWORD;
  				delete jsons.NG_PASSWORD;
		    			jsons=JSON.stringify(jsons);
		    		//	console.log(jsons);
		                this.$http.get(config.content+'/asmx/UserManager.asmx/UpdateUserData',{params:{
		                    json:jsons
			                    	}}).then(response => {
			                    			this.USER_MC=this.detailUserMsg.USER_MC;
										   this.$Message.success('提交成功');
							               this.modalTotal = false;
							               this.$Notice.success({
							                    title: '已成功更新该人员信息',
							               });
							            this.UpdateM=false;
							            this.UpdateP=false;
							        }, response => {
							             swal("失败", "更新失败", "error");
							        });
  				
  			}else{
  				
  				   this.$Message.error('验证失败');
				   return false;
  				
  			}
  			
  						
  			
  		})
  		
  	},
  	
  }
}
</script>

<style>
	
html{
	font-size: 100%;
	height: 100%;
}
body{
	height: 100%;
}
#nav p.user{
	display: block;
    float: right;
    max-width: 64px;
    overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;

}  
#nav p.role{
	display: block;
    float: right;
    max-width: 66px;
    overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;

}   
div.main{
	height: 100%;
	background-repeat: no-repeat;
	background-size:cover;
	font-size:16px;
}
.main .head{
	height:4.5em;
}
.main .body{
	overflow: hidden;
	height:calc(100% - 72px) ;
	width:100%;
	background-size: cover;
	background-image: url(../../../assets/left-panel/right_section.png);
}
.main .nopadding{
	padding:0px;
}
.main div.nav{
	height:4.5em;
	background-color: rgba(36,42,47,0.5);
/*	background-image:url(../../images/top.png);
	background-repeat: no-repeat;
	background-size: cover;*/
}
.main div#nav_list{
	height: 8%;
}
.main div.nav_list{
	height:100%;
	background-repeat: no-repeat;
	background-position: 1.25em 1em;
}
.main div.right_section{
	/*background-image: url(../assets/left-panel/right_section.png);
	background-size:cover;*/
	height:100%;
}
	.main #nav_ul{
	float:right;
	list-style: none;
	width:36.75em;
	margin:20px 0px 0px 0px;
	border-radius: 0.93em;
	padding:0px;
	background-image:url(../../../assets/Nav/top_2.png) ;
	background-repeat: no-repeat;
	margin-right:1.5em;
	color:#FFFFFF;
}
.main #nav_ul>li{
	float:left;
	margin-left:0.8em;
	padding-top:0.31em;
	height:2.125em;
	cursor:pointer;
}
.main #nav_ul span{
	background-size:contain;
	background-repeat:no-repeat ;
	margin-top: 2px;
	margin-right:2px;
	width:18px;
	height:18px;
	cursor: pointer;
}
.main #nav_ul .personal{
	display: block;
    float: left;
	background-image: url(../../../assets/Nav/user_icon.png);
}
.main #nav_ul .password{
	display: block;
    float: left;
	background-image: url(../../../assets/Nav/edit.png);
}
.main #nav_ul .quit{
	display: block;
    float: left;
	background-image: url(../../../assets/Nav/close.png);
}
.main #nav_ul .setting{
	display: block;
    float: left;
}
.main #nav_ul a{
	text-decoration: none;
	color:#fff !important;
}
.main ul.show_list{
	list-style: none;
	margin:0px;
	padding:0px;
}
.main div.right_area{
	margin:0px;
	overflow: hidden;
}
.main div.nav{
	height:4.5em;
	background-color: rgba(36,42,47,0.5);
/*	background-image:url(../../images/top.png);
	background-repeat: no-repeat;
	background-size: cover;*/
}
.main div.left_section{
	background-image: url(../../../assets/left-panel/left_section.png);
	background-size:cover;
	height:100%;
}
.main div.top_nav{
	/*height:7em;*/
	height: 8%;
}
#left_panel2{
	max-height:100%;
	overflow-y: auto;
}

@media screen and (max-width: 1366px) {
	
	
	.main ul.top_list>li>div{
		min-height: 30px;
	}
    .main ul.top_list>li{
    	font-size: 12px;
    }
    .main div.nav_icon>img{
    	width:30px;
	}
	.main ul.top_list>li>div>a{
		width:56px;
	}
}
@media screen and (min-width: 1366px) {
     .main ul.top_list>li>div{
     	padding-top:6px;
		min-height:44px;
	}
	 .main ul.top_list>li{
    	font-size: 12px;
    }
	.main ul.top_list>li>div>a{
		width:56px;
	}
	 .main div.nav_icon>img{
    	width:30px;
	}
}
@media screen and (min-width: 1560px) {
     .main ul.top_list>li>div{
     	padding-top:8px;
		min-height:52px;
	}
	 .main ul.top_list>li{
    	font-size: 14px;
    }
	.main ul.top_list>li>div>a{
		width:64px;
	}
	 .main div.nav_icon>img{
    	width:36px;
	}
}
@media screen and (min-width: 1625px) {
    .main ul.top_list>li>div{
    	padding-top:10px;
		min-height:50px;
	}
	 .main ul.top_list>li{
    	font-size: 16px;
    }
	.main ul.top_list>li>div>a{
		width:64px;
	}
	 .main div.nav_icon>img{
    	width:40px;
	}
}
@media screen and (min-width: 1770px) {
	
	.main ul.top_list>li>div{
		min-height: 64px;
		padding-top:10px;
	}
	 .main ul.top_list>li{
    	font-size: 16px;
    }
	.main ul.top_list>li>div>a{
		width:66px;
	}
	 .main div.nav_icon>img{
    	width:50px;
	}
}
/*//右上导航*/
.main ul.top_list{
	flex-direction: row;
	display: flex;
	width:100%;
	flex-wrap:nowrap;
	
}
.main ul.top_list>li{
	flex:1;
	width: 8.3%;
	margin-left:0.6%;
}
.main ul.top_list>li:first-child{
	margin-left:0px;
}
.main ul.top_list>li>div{
	text-align: center;
	vertical-align: middle;
}
.main ul.top_list>li>div>a{
	text-align: center;
}
.main ul.top_list>li>div>*{
	display:inline-flex;
	display: inline-block;
}
.main div.nav_icon{
	cursor:pointer;
	color:#fff;
	font-size:1em;
	border-radius: 5px;
	background-repeat: no-repeat;
}
.main div.page_main{
	background-color: #dc9d49;
}
.main div.travel{
	background-color: #a4c445;
}
.main div.service{
	background-color: #54d35b;
}
.main div.beyound{
	background-color: #55d0b7;
}
.main div.map{
	background-color: #66b6e2;
}
.main div.user{
	background-color: #bd78b2;
}
.main div.role{
	background-color: #dc9d49;
}
.main div.log{
	background-color: #d07379;
}
.main div.notice{
	background-color: #ef84ab;
}
.main div.doc{
	background-color: #d1a185;
}
.main div.book{
	background-color: #3fbadf;
}
/*头像*/
div.photo{
	height:100px;
	border:1px solid #E3E3E3;
	width:100px;
	display: inline-block;
	margin-top:0px;
	float:left;
	margin-right:20px;
}
div.msg{
	display:inline-block;
	width: 360px;
	border-left:1px dashed rgb(221, 221, 221);
}
</style>
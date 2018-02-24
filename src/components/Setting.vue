<template>
	<div class="main">
		<div class="local">
		    当前位置：<span class="pos1">{{Local}}</span> > <span class="pos2">{{ $route.name}}</span>
		</div>
	<div class="search">
		    <div class="del" @click="modaldel = true"><span></span>删除</div>
		    <div class="update" @click="updateServer"><span></span>修改</div>
		    <div class="add" @click="addServer"><span></span>增加</div>
	</div>
	<Modal
        v-model="modaldel">
         <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <p>是否删除选中内容？</p>
        <div slot="footer">
        	<Button type="primary"  @click="modaldel=false ">取消</Button>
            <Button type="error"  @click="delLog">删除</Button>
        </div>
  </Modal>
    <Modal
        v-model="modalTotal">
        <div slot="header" style="color:#57a3f3;text-align:left;font-size:20px;">
		            <span>编辑数据</span>
		  </div>
         <Form ref="formInline" :model="SettingInfo" :rules="ruleInline" :label-width="90">
         	
	        <FormItem prop="SETTING_KEY" label="设置键">
	            <Input type="text" v-model="SettingInfo.SETTING_KEY" placeholder="请输入">
	               <!-- <Icon type="ios-locked-outline" slot="prepend"></Icon>-->
	            </Input>
	        </FormItem>
	        <FormItem prop="SETTING_VALUE" label="设置值">
	            <Input type="text" v-model="SettingInfo.SETTING_VALUE" placeholder="请输入">
	            </Input>
	        </FormItem>
	         <FormItem prop="SETTING_GROUP" label="设置组">
	         	 <Input type="text" v-model="SettingInfo.SETTING_GROUP" placeholder="请输入">
	               <!-- <Icon type="ios-locked-outline" slot="prepend"></Icon>-->
	            </Input>
	        </FormItem>
	         <FormItem prop="STA" label="状态">
	            <Input type="text" v-model="SettingInfo.STA" placeholder="请输入">
	               <!-- <Icon type="ios-person-outline" slot="prepend"></Icon>-->
	            </Input>
	        </FormItem>
	        <FormItem prop="MIAOSHU" label="描述">
	            <Input type="text" v-model="SettingInfo.MIAOSHU" placeholder="请输入">
	            </Input>
	        </FormItem>
   		 </Form>
   		  <div slot="footer">
	        	<Button type="text" @click="modalTotal=false">取消</Button>
	            <Button type="primary" @click="handleSubmit('formInline')">提交</Button>
        	</div>
    </Modal>
	<div class="page_list">
		<div class="table">
			<table class="msg_table" :view-id="changeP">
			            				<thead>
			            					<tr>
			            						<td>
			            							<div class="check_box" v-bind:class='{ "active" : this.isA, "": !this.isA }' v-on:click="check_box()">
			            							</div>
			            						</td>
			            						<td v-for="i in thead">{{i}}</td>
			            					</tr>
			            				</thead>
			            				<tbody :view-id="changeP">
			            					<ttboady @sendTodo="getTodo"  class="Setting" v-on:change_AC="change_fAC" v-bind:isActive="isfA"  v-for="(item,index) in tr" v-bind:todo="item" v-bind:index="index" v-bind:key="item.id"></ttboady>
			            				</tbody>
			            		</table>
		</div>
			            				<ul class="page">
			            					<li>共<span class="total_page">{{totalPage}}</span>页，
			            						每页<span class="page_num">{{pageSize}}</span>条，
			            						共<span class="total_num">{{totalNum}}</span>条
			            					</li>
			            					<li>
			            						<div class="top" @click="firstPage"></div>
			            					</li>
			            					<li><div class="prev" @click="prevPage"></div></li>
			            					<li>
			            						<input type="text" v-model="pageIndex" class="local_page"/>
			            					</li>
			            					<li><div class="next" @click="nextPage"></div></li>
			            					<li><div class="bottom" @click="lastPage"></div></li>
			            					<li><div class="gon" @click="GOPage">GO</div></li>
			            				</ul></div>
	</div>
</template>

<script>
 import ttboady from './page/comments/table-tbody'
 import config from '../config/config.js'
	export default{
  components:{ttboady},
	data (){
		    			return {
		    					thead:["设置键","设置值","描述"],
		    					tr:[
									
									],
		    					isA:false,
		    					isfA:false,
		    					modaldel:false,
		    					modalTotal:false,
		    					updateMsg:{},
		    					pageIndex:1,
		    					pageSize:12,
		    					totalPage:null,
		    					totalNum:null,
		    					submitType:null,
		    					SettingInfo: {
		    						 STA:null,
						             SETTING_GROUP:null,
						             SETTING_KEY:null,
						             MIAOSHU:null,
						             SETTING_VALUE:null,
		    					},
				                ruleInline: {
					                    STA: [
					                        { required: true, message: '请填写状态', trigger: 'blur' }
					                    ],
					                    SETTING_GROUP: [
					                        { required: true, message: '请填写设置组', trigger: 'blur' }
					                    ],
					                    SETTING_VALUE: [
					                        { required: true, message: '请填写设置值', trigger: 'blur' },
					                    ],
					                    SETTING_KEY: [
					                        { required: true, message: '请填写设置键', trigger: 'blur' },
					                    ],
				                	}
		    					
								}
		    },
		    	computed:{
		    		changeP:function(){
		    			console.log(this.$store.state.placeId);
						this.reloadTable();
		    			return this.$store.state.placeId;
		    		},
		    		Local:function(){
		    			return this.$store.state.LOCAL_MC;
		    		}
		    	},
		    	updated(){
		    		$("table.msg_table tr:odd").addClass("odd");
		    	},
		    	mounted(){
		    		$("table.msg_table tr:odd").addClass("odd");
		    	},
		    	methods:{
		    		check_box:function(){
		    			this.isA = !this.isA;
		    			this.isfA = !this.isfA;
		    			if(this.isA){
		    				this.$store.state.tableselectCode=this.$store.state.tableallCode;
		    			}else{
		    				this.$store.state.tableselectCode=[];
		    			}
		    			console.log(this.$store.state.tableselectCode);
		    		},
		    		searchMsg(){
		    			this.reloadTable();
		    		},
		    		delLog(){
		    			this.modaldel = false;
		    			if(this.$store.state.tableselectCode.length<1){
		    				this.$Message.warning('您未选择数据。');
		    			}else{
		    				console.log(this.$store.state.tableselectCode.join(",")); 
		    					this.$http.get(config.content+'/asmx/SysSettingService.asmx/DeleteSysSettingByID',{params:{id:this.$store.state.tableselectCode.join(",")}}).then(response => {
										this.$Notice.success({
						                    title: '已成功删除选中数据。',
						               });
										this.reloadTable();
						        }, response => {
						            console.log("error");
						        });
		    			}
		    		},
		    		getTodo(data){
		    			this.updateMsg=data;
		    		},
		    		closeModal(){
		    				this.modaldel = false;
		    				this.$Message.info('已取消。');
		    		},
		    		change_fAC(data){
		    			console.log(data);
		    			this.isfA = data;
		    		},
		    		reloadTable(){
		    			let Index=this.pageIndex-1; 
		    			this.$http.get(config.content+'/asmx/SysSettingService.asmx/GetSysSettingDataByPage',{params:{SYS_ID:this.$store.state.placeId,pageSize:this.pageSize,pageIndex:Index}}).then(response => {
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                 console.log(obj.Result.TableInfo);
						                 this.tr=obj.Result.TableInfo;
						                 this.$store.state.tableallCode=[];
						                 this.$store.state.tableselectCode=[];
						                 for(var i=0;i<this.tr.length;i++){
						                 	this.$store.state.tableallCode.push(this.tr[i].ID);
						                 }
						                 	this.totalNum=obj.Result.RCount;
						                 	this.totalPage=obj.Result.PCount;
										
						        }, response => {
						            console.log("error");
						        });
		    		},
		    		updateServer(){
		    			this.submitType ="update";
		    			this.SettingInfo=this.updateMsg;
		    			console.log(this.SettingInfo);
		    			this.modalTotal=true;
		    		},
		    		addServer(){
		    			this.submitType ="add";
		    			this.modalTotal=true;
		    			this.SettingInfo={
		    				 STA:null,
				             SETTING_GROUP:null,
				             SETTING_KEY:null,
				             MIAOSHU:null,
				             SETTING_VALUE:null,}
		    		},
		    		handleSubmit(name) {
		                this.$refs[name].validate((valid) => {
		                    if (valid) {
		                    	let jsons=this.SettingInfo;
		                    	jsons.SYS_ID=this.$store.state.placeId;
		                    	jsons=JSON.stringify(jsons);
		                    	console.log(jsons);
		                    	
		                    	if(this.submitType =="add"){   
		                    		this.$http.get(config.content+'/asmx/SysSettingService.asmx/AddSysSetting',{params:{
		                    			json:jsons
			                    	}}).then(response => {
											this.$Message.success('提交成功!');
			                        		this.reloadTable();
			                        		this.$Notice.success({
							                    title: '已成功添加一条数据。',
							               	});
							               this.modalTotal = false;
							        }, response => {
							            console.log("error");
							        });
		                    	}else{
		                    		this.$http.get(config.content+'/asmx/SysSettingService.asmx/UpdateSysSetting',{params:{
		                    			json:jsons
			                    	}}).then(response => {
											this.$Message.success('提交成功!');
			                        		this.reloadTable();
			                        		this.$Notice.success({
							                    title: '已成功修改一条数据。',
							               	});
							               this.modalTotal = false;
							        }, response => {
							            console.log("error");
							        });
		                    	}
		                    	
		                    	
		                    } else {
		                        this.$Message.error('表单验证失败!');
		                    }
		                })
		            },
		    		//下一页
		    		nextPage(){
		    			if( this.pageIndex>this.totalPage-1){
		    				this.$Message.error('对不起，没有该页');
		    				this.pageIndex=this.totalPage;
		    			}else{
		    				this.pageIndex++;
		    				this.reloadTable();
		    			}
		    		},
		    		prevPage(){
		    			
		    			if( this.pageIndex<2){
		    				this.$Message.error('对不起，没有该页');
		    				this.pageIndex=1;
		    			}else{
		    				this.pageIndex--;
		    				this.reloadTable();
		    			}
		    		},
		    		firstPage(){
		    			this.pageIndex=1;
		    			this.reloadTable();
		    		},
		    		lastPage(){
		    			this.pageIndex=this.totalPage;
		    			this.reloadTable();
		    		},
		    		GOPage(){
		    			this.reloadTable();
		    		}
		    	},
}
</script>

<style  scoped="scoped">
/**********当前位置**********/
.main .table{
	margin-bottom:0px;
}
.main div.search{
	color:#fff;
	height:2.5em;
	padding-right:0.5em;
}
.main div.search>div{
	color:#fff;
	float:right;
	width:4.5em;
	height:2em;
	border-radius: 5px;
	background-color: rgba(205,210,234,0.2);
	margin-left:10px;
	line-height: 2em;
	cursor: pointer;
	border:1px solid #8a92a8;
}
.main div.search>div.input{
	width:18em;
	position:relative;
	border:none;
	background: none;
	margin-top:-2px;
}
.main div.search>div.input>span{
	width:5em;
	display: inline-block;
}
.main div.search .ivu-select-selection{
	background: none !important;
	box-shadow: none !important;
}
/*.main div.search input{
	width:22.6em;
	outline: none;
	background: none;
	border:none;
	color:#fff;
	padding-left:1em;
}
.main div.search div#icon{
	position:absolute;
	height:2em;
	width:2em;
	background-image: url(../assets/Manage/search.png);
	background-size: contain;
	top:0px;
	right:0px;
}
.main div.search div#icon:hover{
	top:2px;
}*/

.main div.search input::-webkit-input-placeholder {
  color: #fff;
}
.main div.search input:-moz-placeholder {/* Firefox 18- */
  color: #fff;
}
.main div.search input::-moz-placeholder{/* Firefox 19+ */
 color: #fff;
}
.main div.search input:-ms-input-placeholder {
  color: #fff;
}
.main div.search input:-o-input-placeholder {
  color: #fff;
}
.main div.search div>span{
	display: block;
	float:left;
	height:22px;
	width:22px;
	margin-top:5px;
	margin-left:5px;
}
.main div.search div.del:hover{
	padding-top:2px;
}
.main div.search div.add:hover{
	padding-top:2px;
}
.main div.search div.update:hover{
	padding-top:2px;
}
.main div.search div.del>span{
	background-image: url(../assets/Manage/del.png);
}
.main div.search div.add>span{
	background-image: url(../assets/Manage/add.png);
}
.main div.search div.update>span{
	background-image: url(../assets/Manage/update.png);
}


</style>
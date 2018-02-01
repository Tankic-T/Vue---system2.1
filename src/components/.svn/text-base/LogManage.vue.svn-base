<template>
	<div class="main">
		<div class="local">
		    当前位置：<span class="pos1">{{Local}}</span> > <span class="pos2">{{ $route.name}}</span>
		</div>
	<div class="search">
		    <div class="del" @click="modaldel = true"><span></span>删除</div>
		    <div class="input">
			    <span>选择用户</span>
				<Select class="input"  v-model="userID" @change="searchMsg" style="width:200px;background:none">
					<Option value="">所有</Option>
					
					<Option v-for="i in userList" :value="i.id">{{i.lable}}</Option>
	    		</Select>
			</div>
	</div>
	<Modal
        v-model="modaldel">
         <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <p>是否删除选中内容？</p>
        <div slot="footer">
        	<Button type="primary"  @click="closeModal">取消</Button>
            <Button type="error"  @click="delLog">删除</Button>
        </div>
   </Modal>
	<div class="page_list">
		<div class="table">
			<table class="msg_table">
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
			            					<ttboady  class="Log_msg" v-on:change_AC="change_fAC" v-bind:isActive="isfA"  v-for="(item,index) in tr" v-bind:todo="item" v-bind:index="index" v-bind:key="item.id"></ttboady>
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
		    					thead:["用户名","操作类型","操作内容","操作时间","操作地点"],
		    					tr:[
									
									],
		    					isA:false,
		    					isfA:false,
		    					modaldel:false,
		    					pageIndex:1,
		    					pageSize:12,
		    					totalPage:null,
		    					totalNum:null,
		    					userID:null,
		    					userList:null,
		    					submitType:null,
		    					serverImg: {
				                    MAC_IP:null,
				                    MAC_MC: 'Windows xp',
				                    XIANKA:null,
				                    MAC_USER:null,
				                    MIAOSHU:null,
				                    MAC_ID:null,
				                    MAC_PWD:null,
				               },
				                ruleInline: {
					                    MAC_IP: [
					                        { required: true, message: '请填写服务器IP', trigger: 'blur' }
					                    ],
					                    MAC_ID: [
					                        { required: true, message: '请填写服务器编号', trigger: 'blur' }
					                    ],
					                    MAC_MC: [
					                        { required: true, message: '请选择服务器操作系统', trigger: 'blur' },
					                    ]
				                	}
		    					
								}
		    },
		    	computed:{
		    		changeP:function(){
		    		
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
		    		this.reloadUser();
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
		    					this.$http.get(config.content+'/asmx/LogService.asmx/DeleteLogData',{params:{key:this.$store.state.tableselectCode.join(",")}}).then(response => {
										this.$Notice.success({
						                    title: '已成功删除选中数据。',
						               });
										this.reloadTable();
						        }, response => {
						            console.log("error");
						        });
		    			}
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
		    			console.log(this.userID);
		    			let Index=this.pageIndex-1;
		    			this.$http.get(config.content+'/asmx/LogService.asmx/GetLogDataByPage',{params:{SYS_ID:this.$store.state.placeId,pageSize:this.pageSize,pageIndex:Index,userID:this.userID}}).then(response => {
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
		    		reloadUser(){ 
		    			let Index=this.pageIndex-1;
		    			this.$http.get(config.content+'/asmx/OrganizationService.asmx/GetOrgInfoByParentId',{params:{sjId:this.$store.state.placeId}}).then(response => {
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                 console.log(obj);
						                 this.userList=[];
						                 
						                 for(let i=0;i<obj.Result.length;i++){
						                 	for(let c=0;c<obj.Result[i].children.length;c++){
						                 		this.userList.push(obj.Result[i].children[c]);
						                 	}
						                 }
						                 console.log(this.userList);
										
						        }, response => {
						            console.log("error");
						        });
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

<style scoped="scoped">
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
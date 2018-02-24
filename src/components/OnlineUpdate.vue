<template>
	<div class="main">
		<div class="local">
		    当前位置：<span class="pos1">{{Local}}</span> > <span class="pos2">{{ $route.name}}</span>
		</div>
	<div class="search">
		    <div class="del" @click="openDel"><span></span>删除</div>
		    <div class="update" @click="updateMap"><span></span>修改</div>
		    <div class="add" @click="addMap"><span></span>增加</div>
		    <div class="input">
			    <span>系统类型</span>
				<Select class="input" v-model="keyword" @on-change="searchMsg" style="width:200px;background:none">
					  <Option value="">所有</Option>
					 <Option value="B">B/S</Option>
                      <Option value="C">C/S</Option>
                      <Option value="A">Android</Option>
	    		</Select>
			</div>
	</div>
	<Modal v-model="modaldel" >
         <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <p>是否删除选中内容？</p>
        <div slot="footer">
        	<Button type="primary"  @click="closeModal">取消</Button>
            <Button type="error"  @click="delMap">删除</Button>
        </div>
    </Modal>
    <Modal
        v-model="modalTotal" @on-cancel="closeModal">
        <div slot="header" style="color:#57a3f3;text-align:left;font-size:20px;">
		            <span>编辑数据</span>
		 </div>
         <Form ref="formInline" :model="OnlineUpdateMsg" :rules="ruleInline" :label-width="80">
         	 <FormItem prop="GENGXIN_NR" label="更新内容">
	            <Input type="text" v-model="OnlineUpdateMsg.GENGXIN_NR" placeholder="请输入">
	            </Input>
	        </FormItem>
	        <FormItem label="系统类型" prop="SYS_LX">
	        	<Select v-model="OnlineUpdateMsg.SYS_LX" placeholder="请选择">
	                  <Option value="B">B/S</Option>
                      <Option value="C">C/S</Option>
                      <Option value="A">Android</Option>
                </Select>
	        </FormItem>
	        <FormItem prop="BANBEN" label="版本">
	            <Input type="text" disabled="disabled" v-model="OnlineUpdateMsg.BANBEN" placeholder="请输入">
	            </Input>
	        </FormItem>
	        <FormItem prop="LUJING" label="更新途径">
	            <Input type="text" v-model="OnlineUpdateMsg.LUJING" disabled="disabled" placeholder="请输入">
	            </Input>
	        </FormItem>
	  <!--    	<FormItem prop="TIJIAO_RY" label="添加人">
	            <Input type="text" v-model="OnlineUpdateMsg.TIJIAO_RY" placeholder="请输入">
	            </Input>
	        </FormItem>
	       <FormItem prop="GENGXIN_SJ" label="更新时间">
	       		<el-date-picker
					      v-model="OnlineUpdateMsg.GENGXIN_SJ"
					      type="datetime"
					      style="width:348px"
					      placeholder="选择日期时间">
				</el-date-picker>
	       </FormItem>-->
	       <FormItem prop="Upload">
                <Upload 
                	action="http://101.200.232.210:8020/asmx/OnlineUpdateService.asmx/UploadFile"
              
                	:format="['apk']"
                	:on-format-error="handleFormatError"
               		:max-size = "1024000"
                	:on-success="Uploadsuccess"
                	:show-upload-list= "true"
                	:on-error="Uploaderror">
        			<Button type="ghost" style="color:#57a3f3" icon="ios-cloud-upload-outline">选择要上传文件的文件</Button>
    			</Upload>
				<div v-if="file !== null" >待上传文件：{{ file.name }} <Button type="text" @click="uploadA" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button></div>
	        </FormItem>
	      
	       
   		 </Form>
   		  <div slot="footer">
	        	<Button type="text" @click="closeModal">取消</Button>
	        	<Button type="primary" @click="handleSubmit('formInline')">提交</Button>
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
			            					<ttboady @sendTodo="getTodo" class="OnlineUpdate" v-on:change_AC="change_fAC" v-bind:isActive="isfA"  v-for="(item,index) in tr" v-bind:todo="item" v-bind:index="index" v-bind:key="item.id"></ttboady>
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
		    					thead:["更新版本号","更新途径","更新内容","系统类型","添加人","更新时间",],
		    					tr:[
									
									],         
		    					isA:false,
		    					isfA:false,
		    					modaldel:false,
		    					modalTotal:false,
		    					pageIndex:1,
		    					pageSize:12,
		    					totalPage:null,
		    					totalNum:null,
		    					keyword:null,
		    					submitType:null,
		    					file:null,
		    					loadingStatus:false,
		    					OnlineUpdateMsg: {
				                    BANBEN:null,
				                    GENGXIN_NR:null,
				                    LUJING:null,
				                    SYS_LX:null,
				                },
				                /*SYS_LX:{
				                	B:"B/S",
				                	C:"C/S",
				                	A:"Android"
				                },*/
				                updateMsg:{},
				                ruleInline: {
					                    BANBEN: [
					                        { required: true, message: '请填写版本号', trigger: 'blur' }
					                    ],
					                    GENGXIN_NR: [
					                        { required: true, message: '请填写更新内容', trigger: 'blur' }
					                    ],
					                    SYS_LX: [
					                        { required: true, message: '请选择系统类型', trigger: 'blur' },
					                    ],
					                    LUJING: [
					                        { required: true, message: '请上传对应文件', trigger: 'blur' },
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

		    		},
		    		handleUpload (file) {
		                this.file = file;
		                return false;
		            },
		            uploadA () {
		                this.loadingStatus = true;
		                if( this.file.length<1){
        					this.$Message.error('您未选择任何文件');
        				}else{
        					 this.loadingStatus = false;
        					 this.hanleUpload();
        					}
		            },
		    		Upload(){
		    			 var fd = new FormData();
        				fd.append("fileToUpload", document.getElementById('UploadFile').files[0]);
        				
        				if( document.getElementById('UploadFile').files.length<1){
        					this.$Message.error('您未选择任何文件');
        				}else{
        						$.ajax({
				                    url: config.content+'/asmx/OnlineUpdateService.asmx/UploadFile',
				                    type: 'POST',
				                    data: fd,
				                    async: false,
				                    cache: false,
				                    contentType: false,
				                    processData: false,
		        					success: function (returndata) {
		        					 	
								          var  obj;
								          $(returndata).find("string").each(function(i){                     
								             obj=$(this).text();                      
								           })
		        					 	if(obj=="error"){
		        					 		swal({
				                            title: "提示",
				                            text: "文件上传失败!",
				                            type: "error",
				                            confirmButtonText: "确定",
				                        	});
		        					 	}else{
		        					 		 swal({
					                            title: "提示",
					                            text: "文件上传成功",
					                            type: "success",
					                            confirmButtonText: "确定",
				                        	});
		        					 	}
				                       
				                    },
				                    error: function (returndata) {
				                        swal({
				                            title: "提示",
				                            text: "文件上传失败!",
				                            type: "error",
				                            confirmButtonText: "确定",
				                        });
				                    }
		        				})
        			
        					}
        			
		    		},
		    		Uploadsuccess( response, file, fileList){
		    			let res=$.parseXML(response);
		    			let obj;
		    			$(res).find("string").each(function(i){                     
							obj=$(this).text();                      
						})
		    			if(obj=="error"){
		        					 	swal({
				                            title: "提示",
				                            text: "文件上传失败!",
				                            type: "error",
				                            confirmButtonText: "确定",
				                        	});
		        					 	}else{
		        					 		let str=obj;
		        					 		str=str.slice(str.indexOf("_v")+2).slice(0,-4);
		        					
		        					 		this.OnlineUpdateMsg.LUJING=obj;
		        					 		this.OnlineUpdateMsg.BANBEN=str;
		        					 		this.OnlineUpdateMsg.TIJIAO_RY = this.$store.state.USER_MC;
		    								this.handleSubmit('formInline')
		        					 		this.$Message.success('上传成功');
		        					 	}
		    		},
		    		Uploaderror(response, file, fileList){
		    			swal({
				                            title: "提示",
				                            text: "文件上传失败!",
				                            type: "error",
				                            confirmButtonText: "确定",
				                        	});
		    		},
		    		handleFormatError(file){
		    			
		    			this.$Message.error('上传失败');
		    			
		    			this.$Notice.warning({
		                    title: '文件格式不正确',
		                    desc: '文件 ' + file.name + ' 格式不正确，请上传apk格式的文件。'
		                });
		    		},
		    		searchMsg(){
		    			this.pageIndex = 1;
		    			this.reloadTable();
		    		},
		    		openDel(){
		    			if(this.$store.state.tableselectCode.length<1){
		    				this.$Message.warning('您未选择数据');
		    			}else{
		    				this.modaldel = true;
		    			}
		    		},
		    		delMap(){
						this.modaldel = false;
		    			this.$http.get(config.content+'/asmx/OnlineUpdateService.asmx/DelOnlineUpdate',{params:{key:this.$store.state.tableselectCode.join(",")}}).then(response => {				
										this.$Notice.success({
						                    title: '已成功删除选中数据。',
						               });
										this.reloadTable();
						        }, response => {
						             swal("失败", "删除失败", "error");
						        });
		    		},
		    		 handleSubmit(name) {
		                this.$refs[name].validate((valid) => {
		                    if (valid) {
		                    	let jsons=this.OnlineUpdateMsg;
		                    	jsons.SYS_ID = this.$store.state.placeId;
		                    //	jsons.SYS_LX=this.SYS_LX[jsons.SYS_LX];
		                    	jsons.TIJIAO_RY = this.$store.state.USER_MC;
		                    	jsons=JSON.stringify(jsons);
		                    
		                    
		                    	if(this.submitType =="add"){
		                    		this.$http.get(config.content+'/asmx/OnlineUpdateService.asmx/AddOnlineUpdate',{params:{
		                    			json:jsons
			                    	}}).then(response => {
										
										this.$Message.success('提交成功');
			                        	this.reloadTable();
							               this.modalTotal = false;
							               this.$Notice.success({
							                    title: '已成功添加一条数据。',
							               	});
							        }, response => {
							             swal("失败", "添加失败", "error");
							        });
		                    	}else{
		                    		this.$http.get(config.content+'/asmx/OnlineUpdateService.asmx/UpdateOnlineUpdate',{params:{
		                    			json:jsons
			                    	}}).then(response => {
										   this.$Message.success('提交成功');
			                        	   this.reloadTable();
							               this.modalTotal = false;
							               this.$Notice.success({
							                    title: '已成功修改一条数据。',
							               	});
							        }, response => {
							    
							            swal("失败", "修改失败", "error");
							        });
		                    	}
		                    	
		                    	
		                    } else {
		                        this.$Message.error('表单验证失败');
		                    }
		                })
		            },
		    		closeModal(){
		    			this.modalTotal = false;
		    				this.modaldel = false;
		    				
		    				this.$Message.info('已取消');
		    				this.reloadTable();
		    		},
		    		getTodo(data){
		    			this.updateMsg=data;
		    		},
		    		addMap(){
		    			this.submitType ="add";
		    			this.OnlineUpdateMsg=
		    			{
				                    BANBEN:null,
				                    GENGXIN_NR:null,
				                    LUJING:null,
				                    SYS_LX:null,
				               };
		    			
		    			this.modalTotal=true;
		    		},
		    		updateMap(){
		    			if(this.$store.state.tableselectCode.length<1){
		    				this.$Message.warning('您未选择数据');
		    				//swal("警告", "您未选择任何数据", "warning");
		    			}else{
		    				this.submitType ="update";
		    				this.updateMsg.SYS_LX=this.updateMsg.SYS_LX_E[0];
			    			this.OnlineUpdateMsg=this.updateMsg;
			    			this.modalTotal=true;
		    			}
		    			
		    		},
		    		change_fAC(data){
		    			this.isfA = data;
		    		},
		    		reloadTable(){
		    				
		    			let Index=this.pageIndex-1;
		    			this.$http.get(config.content+'/asmx/OnlineUpdateService.asmx/GetOnlineDataByPage',{params:{SYS_ID:this.$store.state.placeId,pageSize:this.pageSize,pageIndex:Index,keyword:this.keyword}}).then(response => {
						 								
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })

						                 for(var i=0;i<obj.Result.TableInfo.length;i++){
						                 	obj.Result.TableInfo[i].SYS_LX_E=$.trim(obj.Result.TableInfo[i].SYS_LX);
						                 	obj.Result.TableInfo[i].SYS_LX=$.trim(obj.Result.TableInfo[i].SYS_LX);
						                 }
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
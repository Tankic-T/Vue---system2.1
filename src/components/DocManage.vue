<template>
	<div class="main">
		<div class="local">
		    当前位置：<span class="pos1">{{Local}}</span> > <span class="pos2">{{ $route.name}}</span>
		</div>
	<div class="search">
<!--		    <div class="del" @click="modaldel = true"><span></span>删除</div>
		    <div class="update" @click="updateServer"><span></span>修改</div>-->
		    <div class="add" @click="addServer"><span></span>增加</div>
		    <div class="input">
			    <span>字典名称：</span>
			     <Input type="text" @on-change="searchMsg" v-model="keyword" placeholder="请输入" style="width:200px">
		           </Input>
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
            <Button type="error"  @click="delServer">删除</Button>
        </div>
    </Modal>
    <Modal
        v-model="modalele">
         <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <p>是否删除该字典选项？</p>
        <div slot="footer">
        	<Button type="primary"  @click="modalele=false">取消</Button>
            <Button type="error"  @click="delELe">删除</Button>
        </div>
    </Modal> 
    <Modal
        v-model="modalTotal">
        <div slot="header" style="color:#57a3f3;text-align:left;font-size:20px;">
		            <span>{{modelTitle}}字典</span>
		  </div>
		  <div class="title">字典名称</div>
		            
         <Form ref="docMsg" :model="docMsg" :rules="ruleInline" :label-width="0">
	        
	        <FormItem prop="LEIXING_MC">
	            <Input type="text" v-model="docMsg.LEIXING_MC" placeholder="请输入">
	            </Input>
	        </FormItem>
	        <div class="title">字典类型</div>
	        <FormItem prop="LEIXING">
	            <Input type="text" v-model="docMsg.LEIXING" placeholder="请输入">
	            </Input>
	        </FormItem>
	        
   		 </Form>
   		 <div class="title">字典选项</div>
   		 
   		 
   		 <Form ref="treeEle" :model="treeEle" :rules="ruleInline2" :label-width="0" inline>
	        
	        
	        <Row>
                <Col span="17">
                	
                	<FormItem prop="NAME" style="width:100%">
	      				<Input id="inputEle" type="text" v-model="treeEle.NAME" placeholder="请输入选项名称">
						            </Input>  
	       			 </FormItem>
                	   
                </Col>
                <Col span="4" offset="1">
                	<Button type="primary" @click="addDicEle('treeEle')"><Icon size="16" type="ios-plus-outline"></Icon>&#160;添加字典选项</Button>
                </Col>
            </Row>
	
   		 </Form>
			<el-tree
				:data="tableList"
				node-key="CODE"
				default-expand-all
				ref="tree"
				:indent = 0
				show-checkbox
				highlight-current
				:props="defaultProps"
				:expand-on-click-node="false"
				@check-change="selectTree"
				:render-content="renderContent">
			</el-tree>
   		  <div slot="footer">
	        	<Button type="text" @click="closeModal">取消</Button>
	            <Button type="primary" @click="SubmitDoc('docMsg')">提交</Button>
        	</div>
    </Modal>
	<div class="page_list">
		<div class="table">
			<table class="msg_table">
			            				<thead>
			            					<tr>
			            						<td>
			            							<div class="check_box" v-bind:class='{ "active" : this.isA, "": !this.isA }' v-on:click="DIC_DW_box()">
			            							</div>
			            						</td>
			            						<td v-for="i in thead">{{i}}</td>
			            					</tr>
			            				</thead>
			            				<tbody :view-id="changeP">
			            					<ttboady @delDoc="delDocF" @editDoc="editDocF" class="doc_Msg" @sendTodo="getTodo"  v-on:change_AC="change_fAC" v-bind:isActive="isfA"  v-for="(item,index) in tr" v-bind:todo="item" v-bind:index="index" v-bind:key="item.id"></ttboady>
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
		    					thead:["字典名称","字典选项","操作"],
		    					tr:[],
		    					isA:false,
		    					isfA:false,
		    					modaldel:false,
		    					modelTitle:"添加",
		    					modalTotal:false,
		    					pageIndex:1,
		    					pageSize:12,
		    					totalPage:null,
		    					totalNum:null,
		    					keyword:null,
		    					submitType:null,
		    					modalele:false,
		    					ZDDATA:null,
		    					docMsg: {
				                    LEIXING_MC:null,
				                    LEIXING:null,
				                },
				                updateMsg:{},
				                ruleInline: {
					                    LEIXING_MC: [
					                        { required: true, message: '请填写字典名称', trigger: 'blur' }
					                    ],
					                    LEIXING: [
					                        { required: true, message: '请填写字典类型', trigger: 'blur' }
					                    ],
					                   
				                	},
				                ruleInline2:{ NAME: [
					                        { required: true, message: '请填写字典选项名', trigger: 'blur' }
					                    ],},
					            tableList:[{
					                	/*CODE:"father",
					                	NAME:"字典选项",
					                	children:[],*/
					                }
				                ],  //字典选项树集合
				                MaxCode:0,  //列表排序
				                treeID:[],
				                treeEle:{}, //单个字典选项
		    					defaultProps:{
		    						label:"NAME",
		    						children:'children'
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
		    		searchMsg(){
		    			
			    			this.pageIndex = 1;
			    			this.reloadTable();
		    			
		    		},
		    		delServer(){
		    			
		    			console.log(this.ZDDATA);
		    			this.$http.get(config.content+'/asmx/SourceDicService.asmx/DeleteAllDicData',{params:{LEIXING:this.ZDDATA.LEIXING,sysID:this.$store.state.placeId}}).then(response => {
										this.$Notice.success({
						                    title: '已成功删除选中数据。',
						               });
										this.reloadTable();
						        }, response => {
						            console.log("error");
						        });
						        this.modaldel = false;
		    		},
		    		 SubmitDoc(name) {
		                this.$refs[name].validate((valid) => {
		                    if (valid) {
		                    	let jsons="";
		                    		jsons=this.tableList;
		                    	
		                    	console.log(jsons.length);
		                    
		                    	
		                    	
			                    let SYS_ID=this.$store.state.placeId;
		                    	if(this.modelTitle=="添加"){
		                    		
		                    		if(jsons.length>0){
		                    			
		                    			
		                    		jsons=JSON.stringify(jsons);
		                    		console.log(jsons);
			                    	this.$http.get(config.content+'/asmx/SourceDicService.asmx/AddDicData',{params:{json:jsons,SYS_ID:SYS_ID}}).then(response => {
											let result = response.body;
							                 result = $.parseXML(result);
							                 let obj;
							                 $(result).find("string").each(function(i){                     
							                 	obj=$.parseJSON($(this).text());                      
							                })
							                 
							                 this.$Message.success('字典添加成功!');
							                 	this.reloadTable();
							        }, response => {
							            console.log("error");
							        });
		                    		
		                    		this.modalTotal = false;
		                    			
		                    		}
		                    		else{
		                    			
		                    		 swal("错误", "你请填写字典项", "error"); 
		                    		 
		                    		};
		                    	 
		                    	
		                    	}else if(this.modelTitle=="编辑"){
		                    		
		                    		for(let a of jsons){
		                    			a.LEIXING_MC=this.docMsg.LEIXING_MC;
		                    			a.LEIXING=this.docMsg.LEIXING;
		                    		}
		                    		jsons=JSON.stringify(jsons);
		                    		this.$http.get(config.content+'/asmx/SourceDicService.asmx/UpdateDicData',{params:{json:jsons,}}).then(response => {
											let result = response.body;
							                 result = $.parseXML(result);
							                 let obj;
							                 $(result).find("string").each(function(i){                     
							                 	obj=$.parseJSON($(this).text());                      
							                })
							                this.$Message.success('字典修改成功!');
							                
												this.reloadTable();
							        }, response => {
							            console.log("error");
							        });
		                    		 this.modalTotal = false;
		                    	}
		                    } else{
		                        this.$Message.error('表单验证失败!');
		                    }
		                });
		                
		            },
		            delDocF:function(data){
		            	this.modaldel = true;
		            	this.ZDDATA=data;
		            },
		            editDocF:function(data){
		            	
		            	this.modelTitle="编辑";
		            	this.docMsg.LEIXING_MC=data.LEIXING_MC;
		            	this.docMsg.LEIXING = data.LEIXING;
		            	this.docMsg.ZD_ID = data.ZD_ID;
		            	
		            	console.log(this.docMsg);
		            	
		            	this.modalTotal=true;
		    			this.$http.get(config.content+'/asmx/SourceDicService.asmx/GetDicDetailByParentID',{params:{
							LEIXING:data.LEIXING}}).then(response => {
										let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                if(obj.Result){
						                	this.tableList=obj.Result;
						                	this.MaxCode=this.tableList[0].code;
						                }else{
						                	this.MaxCode=0;
						                }
						                
						        }, response => {
						            this.$Message.warn('系统繁忙！');
						        }); 
						        //点亮
		            	this.$http.get(config.content+'/asmx/SourceDicService.asmx/GetCheckDicData',{params:{
						SYS_ID:this.$store.state.placeId,LEIXING:data.LEIXING}}).then(response => {
										
										let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
										this.treeID=[];
										for(let o of obj.Result){
						                	o.CODE ? this.treeID.push(o.CODE):null;		
						                }
										console.log(this.treeID);
										this.$refs.tree.setCheckedKeys(this.treeID);
										
						        }, response => {
						            console.log("error");
						        });
						        
						        
		            },
		    		closeModal(){
		    			this.modalTotal = false;
		    				this.modaldel = false;
		    				this.$Message.info('已取消。');
		    		},
		    		getTodo(data){
		    			this.updateMsg=data;
		    			console.log(data);
		    		},
		    		addServer(){
		    			this.modelTitle="添加";
		    			this.modalTotal=true;
		    			this.treeEle={};
		    			this.docMsg={};
		    			this.tableList=[];
		    		},
		    		addDicEle(name){
		    			
		    			this.$refs[name].validate((valid) => {
		                    if (valid) {
		                    	this.MaxCode=this.MaxCode+1;
		                    	let ele={
				    				NAME:this.treeEle.NAME,
				    				LEIXING_MC:this.docMsg.LEIXING_MC,
				    				LEIXING:this.docMsg.LEIXING,
				    				CODE:this.MaxCode,
				    				DIC_DW:0,
				    			};
			                    if(this.modelTitle=="编辑"){
			                    	ele.ZD_ID=this.tableList[this.tableList.length-1].ZD_ID+1;
			                    	
			                    		let jsons=JSON.stringify(ele);
			                    		console.log(jsons);
			                    		this.$http.get(config.content+'/asmx/SourceDicService.asmx/AddSingleDic',{params:{json:jsons}}).then(response => {
											let result = response.body;
							                 result = $.parseXML(result);
							                 let obj;
							                 $(result).find("string").each(function(i){                     
							                 	obj=$.parseJSON($(this).text());                      
							                })
							                 
							                 this.$Message.success('字典项添加成功!');
							                 
							                 
							                this.reloadTable();
											
							        }, response => {
							            console.log("error");
							        });
							        
							        /*this.$http.get(config.content+'/asmx/SourceDicService.asmx/GetCheckDicData',{params:{
									SYS_ID:this.$store.state.placeId,LEIXING:ele.LEIXING}}).then(response => {
													let result = response.body;
									                 result = $.parseXML(result);
									                 let obj;
									                 $(result).find("string").each(function(i){                     
									                 	obj=$.parseJSON($(this).text());                      
									                })
													this.treeID=[];
													for(let o of obj.Result){
									                	o.CODE ? this.treeID.push(o.CODE):null;
									                			
									                }
													console.log(this.treeID);
													this.$refs.tree.setCheckedKeys(this.treeID);
													
									        }, response => {
									            console.log("error");
									        });*/
							        
							        
		                    	}
				    			this.tableList.push(ele);
				    			this.treeEle.NAME = null;
				    			$("#inputEle>input").val("");
		                    } else {
		                        this.$Message.error('必填项不能为空！');
		                    }
		                })
		    		},
		    		change_fAC(data){
		    			
		    			this.isfA = data;
		    		},
		    		reloadTable(){
		    			
		    			let Index=this.pageIndex-1;
		    			this.$http.get(config.content+'/asmx/SourceDicService.asmx/GetDicDataByPage',{params:{pageSize:this.pageSize,pageIndex:Index,keyword:this.keyword}}).then(response => {
						 								
										let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						               // console.log(obj);
						                 this.$store.state.tableallCode=[];
						                 this.$store.state.tableselectCode=[];
						                 for(var i=0;i<obj.Result.TableInfo.length;i++){
						                 	//this.$store.state.tableallCode.push(this.tr[i].ID);
						                 	obj.Result.TableInfo[i].cancel="doc";
						                 }
						                 this.tr=obj.Result.TableInfo;
						                 console.log(this.tr);
						                 this.totalNum=obj.Result.PCount;
						                 this.totalPage=obj.Result.RCount;
										
						        }, response => {
						            console.log("error");
						        });
						        
		    		},
		    		selectTree(a,b,c){
		    			if((b && this.treeID.indexOf(a.CODE)==-1) || !b){
		    				let type;
			    			b ? type =0:type=1;
		
			    			this.$http.get(config.content+'/asmx/SourceDicService.asmx/UpdateSysDicSta',{params:{sysID:this.$store.state.placeId,dicID:a.ZD_ID,type:type}}).then(response => {
							 								
											let result = response.body;
							                 result = $.parseXML(result);
							                 let obj;
							                 $(result).find("string").each(function(i){                     
							                 	obj=$.parseJSON($(this).text());                      
							                })
							                 console.log(obj);
							        }, response => {
							            console.log("error");
							        });
		    			}
		    		},
		    		delELe(){
		    		
		    		
		    		},
		    		Delel(node,data){
		    			

		    			 this.$confirm('是否删除该字典选项?', '提示', {
							          confirmButtonText: '确定',
							          cancelButtonText: '取消',
							          type: 'warning'
							       }).then(() => {
									//前端展示
					    			const parent = node.parent;
								    const children = parent.data.children || parent.data;
								    const index = children.findIndex(d => d.CODE === data.CODE);
								    children.splice(index, 1);
					    			
					    			//后端数据处理
					    			//console.log(this.$store.state.placeId);
					    			
					    			this.$http.get(config.content+'/asmx/SourceDicService.asmx/DeleteDicByParentID',{params:{sysID:this.$store.state.placeId,ZD_ID:data.ZD_ID}}).then(response => {
										 								
														let result = response.body;
										                 result = $.parseXML(result);
										                 let obj;
										                 $(result).find("string").each(function(i){                     
										                 	obj=$.parseJSON($(this).text());                      
										                })
										                 
										                this.reloadTable();
										                 this.$Notice.success({
											                    title: '已成功删除选中数据。',
											               });
														
										        }, response => {
										            console.log("error");
										        });
							            
							        }).catch(() => {
							        	
							          this.$message({
							            type: 'info',
							            message: '已取消'
							          });  
							          
							          this.$Message.info('已取消');
							        });
		    		
		    		},
		    		renderContent(h, { node, data, store }) {
						let span=<span>
					              <span>
					                <i class="ivu-icon ivu-icon-ios-home" size="30px"></i>  {node.label} </span>
					                <span style="float:right;margin-right:10px;">
					           	 		<i  on-click={ () => this.Delel(node, data) } class="el-icon-delete el-icon--center"></i>
					           		</span>
					            </span>;

					        return (
					          <span style="font-size: 14px; padding-right: 8px;">
					           {span}
					          </span>);
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

div.title{
	font-weight: 600;
}

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
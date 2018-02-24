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
				    <span>角色名称：</span>
					 <Input type="text" @on-change="searchMsg" v-model="keyword" placeholder="请输入" style="width:180px">
		            </Input>
				</div>
		</div>
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
					            					<ttboady @mapService="mapS" @menuManage="menuM" @sendTodo="getTodo" class="ManageRole" v-on:change_AC="change_fAC" v-bind:isActive="isfA"  v-for="(item,index) in tr" v-bind:todo="item" v-bind:index="index" v-bind:key="item.id"></ttboady>
					            				</tbody>
					            		</table>
				</div>
		
			        <ul class="page">
			            <li>共<span class="total_page">{{totalPage}}</span>页，
			            	每页<span class="page_num">{{pageSize}}</span>条，
			            	共<span class="total_num">{{totalNum}}</span>条</li>
			            <li><div class="top" @click="firstPage"></div></li>
			            <li><div class="prev" @click="prevPage"></div></li>
			            <li><input type="text" v-model="pageIndex" class="local_page"/></li>
			           	<li><div class="next" @click="nextPage"></div></li>
			            <li><div class="bottom" @click="lastPage"></div></li>
			            <li><div class="gon" @click="GOPage">GO</div></li>
			        </ul>
			</div>
			<!--modal-->
			<Modal v-model="rolemodal">
		        <div slot="header" style="color:#57a3f3;text-align:left;font-size:20px;">
		            <span>菜单管理</span>
		        </div>
					<div class="eltree">
						<el-tree
						  :data="roleM"
						  show-checkbox
						  node-key="MENU_ID"
						  :default-checked-keys="defaultChecked"
						   ref="tree"
						  @check-change="checkTree"
						  :props="defaultProps">
						</el-tree>
					</div>
		   		  <div slot="footer">
			        	<Button type="text"  @click="rolemodal = false">取消</Button>
			            <Button type="primary"  @click="rolemodal = false">确定</Button>
		        	</div>
		   </Modal>
		   
		   
		    <Modal v-model="mapService" width="800">
		    	<div slot="header" style="color:#57a3f3;text-align:left;font-size:20px;">
		            <span>地图服务</span>
		        </div>
		    	
		    	
		    	 <el-table
				    ref="multipleTable"
				    :data="mapTable"
				    tooltip-effect="dark"
				    style="width: 100%"
				    @select="selectS"
				    @select-all="selectA"
				   >
				    <el-table-column
				      type="selection"
				      align="center"
				      width="55">
				    </el-table-column>
				     <el-table-column
				      prop="SERVICE_LX"
				      label="类型"
				      align="center"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      prop="SERVICE_URL"
				      label="地址"
				      align="center"
				      width="420">
				    </el-table-column>
				    <el-table-column
				      prop="MIAOSHU"
				      label="描述"
				      align="center"
				      show-overflow-tooltip>
				    </el-table-column>
				  </el-table>

		    	
				<div slot="footer">
			        	<Button type="text"  @click="mapService = false">取消</Button>
			            <Button type="primary"  @click="mapService = false">确定</Button>
		        	</div>
		    </Modal>

			<Modal v-model="modaldel" >
		        
		        <div slot="header" style="color:#f60;text-align:left;font-size:20px;
		         	font-weight:600">
		            <span>删除确认</span>
		        </div>
		        <p>是否删除选中内容？</p>
		        <div slot="footer">
		        	<Button type="primary"  @click="closeModal">取消</Button>
		            <Button type="error"  @click="delMap">删除</Button>
		        </div>
		    </Modal>
		    <Modal
		        v-model="modalTotal" @on-cancel="closeModal">
		         <div slot="header" style="color:#57a3f3;text-align:left;font-size:20px;
		         	font-weight:600">
		            <span>{{modalTitle}}用户</span>
		        </div>
		         <Form ref="formInline" :model="roleMsg" :rules="ruleInline" :label-width="80">
		         	<FormItem prop="ROLE_MC" label="角色名称">
			            <Input type="text" v-model="roleMsg.ROLE_MC" placeholder="请输入">
			            </Input>
			        </FormItem>
			        <FormItem prop="MIAOSHU" label="角色描述">
			            <Input type="text" v-model="roleMsg.MIAOSHU" placeholder="请输入">
			            </Input>
			        </FormItem>
		         	 <!--<FormItem prop="CHUANGJIAN_DATE" label="创建时间">
						 
						<el-date-picker
					      v-model="roleMsg.CHUANGJIAN_DATE"
					      type="datetime"
					      style="width:350px"
					      placeholder="选择日期时间">
					   </el-date-picker>
			        </FormItem>-->
		   		 </Form>
		   		  <div slot="footer">
			        	<Button type="text" @click="closeModal">取消</Button>
			            <Button type="primary" @click="handleSubmit('formInline')">提交</Button>
		        	</div>
		    </Modal>
			
	</div>

</template>

<script>
 import ttboady from './page/comments/table-tbody'
 import config from '../config/config.js'
	export default{
  components:{ttboady},
	data (){
		    			return {
		    					thead:["角色名称","角色描述","创建时间","操作"],
		    					tr:[], 
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
		    					roleMsg: {
				                    MIAOSHU:null,
				                    ROLE_MC:null,
				              },
				                modalTitle:"",
				                rolemodal:false,
				                mapService:false,
				                canEdit:true,
				                treeCheck:{
				                	id:null,
				                	sta:null,
				                },
				                roleID:null,
				                updateMsg:{},
				                ruleInline: {
					                    MIAOSHU: [
					                        { required: true, message: '请填写角色描述', trigger: 'blur' }
					                    ],
					                    ROLE_MC: [
					                        { required: true, message: '请填写角色名称', trigger: 'blur' },
					                    ],
				                },
				                roleM: [],
								defaultProps: {
								          children: 'MenuRoleTreeTwo',
								          label: 'MENU_MC',
								        },
								defaultChecked:[],
		    					//地图服务
		    					mapTable:[],
		    					mapTableId:[],
		    					roleSelected:0,
		    					selectedId:[],  	//已添加的角色的ID
		    					multipleSelection: [],
		    					checkJson:[],  //check-Json数组
		    					childs:0,     //删除权限用的子节点数

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
		    		
		    		this.allRoleTree();  //默认加载全部树节点
		    		
		    		this.reloadMapList();
		    	},
		    	methods:{
		    		mapS:function(data){
		    			if(this.roleID!=data){
		    				this.roleID=data;
		    			//	data=2016924;
		    				this.$http.get(config.content+'/asmx/RoleService.asmx/GetMapDataByRoleID ',{params:{sysID:this.$store.state.placeId,roleID:data}}).then(response => {
										let result = response.body;
						                this.roleSelected=0;
						                this.selectedId=[];
						                result = $.parseXML(result);
						                let obj;
						                $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                });
						                this.$refs.multipleTable.clearSelection();
										let index;	
						                for(let i=0;i<obj.Result.length;i++){
						                	this.roleSelected++;
						                	index=this.mapTableId.indexOf(obj.Result[i].ID);
						                	this.selectedId.push(obj.Result[i].ID);
						                	this.$refs.multipleTable.toggleRowSelection(this.mapTable[index],true); //点亮对应的选择项
						                }
						        }, response => {
						            console.log("error");
						        });
		    			}
		    			this.mapService=true;
		    			
		    		},
		    		menuM:function(data){
		    			
		    			//已有权限
		    		    //data=2016924;
		    			
		    			if(this.roleID!=data){
		    				this.treeCheck.id=null;
		    				this.treeCheck.sta=null;
		    				this.roleID=data;
		    				this.$http.get(config.content+'/asmx/RoleService.asmx/GetMenuDataByRoleID',{params:{sysID:this.$store.state.placeId,roleID:data}}).then(response => {
						 								
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                 this.defaultChecked=[];
						                for(let i=0;i<obj.Result.length;i++){
						                	this.defaultChecked[i]=obj.Result[i].MENU_ID;
						                }
										
										console.log(this.defaultChecked);
										
						      			this.defaultChecked.length<1?
						      			this.$refs.tree.setCheckedKeys([]):
						      			this.$refs.tree.setCheckedKeys(this.defaultChecked);
						                 
						        }, response => {
						            console.log("error");
						        });
		    				
		    			}

		    			this.rolemodal=true;
		    			
		    		},
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
		    		openDel(){
		    			if(this.$store.state.tableselectCode.length<1){
		    				this.$Message.warning('您未选择数据');
		    			}else{
		    				this.modaldel = true;
		    			}
		    		},
		    		delMap(){
						this.modaldel = false;
						console.log(this.$store.state.tableselectCode.join(","));
		    			this.$http.get(config.content+'/asmx/RoleService.asmx/DeleteRoleByID',{params:{key:this.$store.state.tableselectCode.join(",")}}).then(response => {
		    				
		    							let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
		    				
										this.$Notice.success({
						                    title: '已成功删除选中数据。',
						               });
										this.reloadTable();
						        }, response => {
						             swal("失败", "删除失败", "error");
						        });
		    		},
		    		reizeDate(data){
		    			const d=new Date(data);
		    			let h= d.getHours()<10? "0"+d.getHours() : d.getHours();
		    			let m= d.getMinutes()<10? "0"+d.getMinutes() : d.getMinutes();
		    			let s= d.getSeconds()<10? "0"+d.getSeconds() : d.getSeconds();
		    			return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + h + ':' + m + ':' + s;  
		    		},
		    		 handleSubmit(name) {
		                this.$refs[name].validate((valid) => {
		                    if (valid) {
		                    	let jsons=this.roleMsg;
		                    	jsons.SYS_ID=this.$store.state.placeId;
		          //          	jsons.XIUGAI_DATE=this.reizeDate(jsons.XIUGAI_DATE)
		          //          	jsons.CHUANGJIAN_DATE=this.reizeDate(jsons.CHUANGJIAN_DATE)
		                    	jsons=JSON.stringify(jsons);
		                    	console.log(jsons);
		                    	if(this.submitType =="add"){
		                    		this.$http.get(config.content+'/asmx/RoleService.asmx/AddRole',{params:{
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
		                    		this.$http.get(config.content+'/asmx/RoleService.asmx/UpdateRole',{params:{
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
		    			this.modalTitle = "添加";
		    			this.roleMsg={
				              //      CHUANGJIAN_DATE:'',
				                    MIAOSHU:null,
				                    ROLE_MC:null,
				                },
		    			this.modalTotal=true;
		    		},
		    		updateMap(){
		    			if(this.$store.state.tableselectCode.length<1){
		    				this.$Message.warning('您未选择数据');
		    				//swal("警告", "您未选择任何数据", "warning");
		    			}else{
		    				this.modalTitle = "修改";
		    				this.submitType ="update";
			    			this.roleMsg=this.updateMsg;
			    			this.modalTotal=true;
		    			}
		    		},
		    		change_fAC(data){
		    			this.isfA = data;
		    		},
		    		
		    		reloadTable(){
		 
		    			let Index=this.pageIndex-1;
		    			this.$http.get(config.content+'/asmx/RoleService.asmx/GetRoleDatataByPage',{params:{SYS_ID:this.$store.state.placeId,pageSize:this.pageSize,pageIndex:Index,keyword:this.keyword}}).then(response => {
						 								
										let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                 
						                 this.tr=obj.Result.TableInfo;
						                 this.$store.state.tableallCode=[];
						                 this.$store.state.tableselectCode=[];
						                 for(var i=0;i<this.tr.length;i++){
						                 	this.$store.state.tableallCode.push(this.tr[i].ID);
						            		this.tr[i].cancel="0";
						                 }
						                 this.totalNum=obj.Result.RCount;
						                 this.totalPage=obj.Result.PCount;
										
						        }, response => {
						            console.log("error");
						        });
		    		},
		    		//checktree
		    		checkTree(a,b,c){ 
		    			
		    			let del=false;   
		    			let bool =false;
		    			!del ? bool=this.defaultChecked.indexOf(parseInt(a.MENU_ID))==-1:
		    			       bool=true;
		    			
		    			this.defaultChecked.indexOf(parseInt(a.MENU_ID))==-1? bool=true:bool=false;
		    		//	this.defaultChecked.indexOf(parseInt(a.MENU_ID))==-1    删除后不应加此判断
		    		//	debugger;
		 		
		 			
		    			if(b  && this.defaultChecked.indexOf(parseInt(a.MENU_ID))==-1){ //选择  并且 不是默认选择的
		    				//子节点总数checkCount+子 节点个数
		    				
		    				if(a.MenuRoleTreeTwo.length==0 ){ //加节点本身--单个添加
								
								let jsons=[];
								
								if(this.checkJson.length<1){  // 没有父节点
									
										let o={};
										o.MENU_ID=a.MENU_ID;
				    					o.ROLE_ID=this.roleID;
				    					jsons.push(o);
			    					
									}else{
										
										let oj={};
										oj.MENU_ID=a.MENU_ID;
										oj.ROLE_ID=this.roleID;
										this.checkJson.push(oj);
										this.checkJson[0].children ? delete this.checkJson[0].children:null;
										jsons = this.checkJson;
										
								}
		    					jsons=JSON.stringify(jsons);
		    					
		    					
		    					this.$http.get(config.content+'/asmx/MenuService.asmx/AddRoleMenuList',{params:{json:jsons}}).then(response => {
						 								
										let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						        }, response => {
						            console.log("error");
						   		 });
						   		  this.checkJson=[];
		    				}else{
		    					
		    					let ob={};
		    					ob.MENU_ID=a.MENU_ID;
		    					ob.ROLE_ID=this.roleID;
		    					this.checkJson.push(ob);
		    				}
		    				
		    			}

		    			else if(!b){ //delete

		    				console.log(a);
		    				console.log(b);
		    				
		    				/*	//单个删除
		    				let ob={
		    					MENU_ID:a.MENU_ID,
		    					ROLE_ID:this.roleID,
		    				}
		    					
		    				if(a.MenuRoleTreeTwo.length==0){
		    					let father;
		    					let child=[];
		    					if(this.checkJson.length>0){
		    						
		    						
		    						
		    						child.push(this.checkJson[0]);
		    						child=JSON.stringify(child).replace(/\"/g,"'");
		    						this.checkJson=this.checkJson.slice(1);
		    						this.checkJson.length<1?father=null:father=JSON.stringify(this.checkJson).replace(/\"/g,"'" );
		    						

		    					}else{
		    						father=null;
		    						child=null;
		    					}
		    					
		    					
		    					console.log(this.checkJson);
		    					
		    					this.$http.get(config.content+'/asmx/MenuService.asmx/DeleteRoleMenu',{params:{parentJson:father,chilDrenJson:child,roleID:this.roleID,thisMenuID:a.MENU_ID}}).then(response => {
										let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
							        }, response => {
							            console.log("error");
							   	});
		    				}else{
		    					this.checkJson.push(ob);;
		    				}*/
		    				
		    				//取消选择对应节点  -- 所有匹配的
		    				this.$http.get(config.content+'/asmx/MenuService.asmx/DeleteRoleMenu',{params:{parentJson:null,chilDrenJson:null,roleID:this.roleID,thisMenuID:a.MENU_ID}}).then(response => {
										let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
							        }, response => {
							            console.log("error");
							   	});
		    				
		    				
		    			}
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
		    		},
		    		
		    		//权限管理--所有权限
		    		allRoleTree(){
		    			this.$http.get(config.content+'/asmx/RoleService.asmx/GetMenuRole',{params:{}}).then(response => {				
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                 this.roleM=obj.Result;
						        }, response => {
						            console.log("error");
						        });
		    		},
		    		reloadMapList(){
		    			
		    			this.$http.get(config.content+'/asmx/MapService.asmx/GetMapServiceData',{params:{SYS_ID:this.$store.state.placeId,pageSize:104,pageIndex:0,keyword:null}}).then(response => {
						 								
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                 
						                this.mapTableId=[];
						                 for(let i=0;i<obj.Result.TableInfo.length;i++){
						                 	this.mapTableId.push(obj.Result.TableInfo[i].ID)
						                 }
						                 
						                 this.mapTable=obj.Result.TableInfo;

						        }, response => {
						            console.log("error");
						        });
		    		},
		    		selectS(a,b){
		    			
		    			let sta;
		    			//a>roleSelected 则为添加  反之为删除 b是当前对象
		    			if(a.length>this.roleSelected){
		    				sta="0";
		    				this.selectedId.push(b.ID),
		    				this.roleSelected++;
		    			}else{
		    				
		    				sta="1";
							for(var i=0; i<this.selectedId.length; i++) {
							    if(this.selectedId[i].ID == b.ID) {
							      this.selectedId.splice(i, 1);
							      break;
							    }
							}
		    				this.roleSelected-=1;
		    				
		    			}
		    			this.$http.get(config.content+'/asmx/RoleService.asmx/GetAddRoleMap',{params:{sysID:this.$store.state.placeId,roleID:this.roleID,mapID:b.ID,statues:sta}}).then(response => {			
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
										//this.reloadMapList();
						        }, response => {
						            console.log("error");
						        });
		    		},
		    		selectA(a){
		    			let state="";
		    			let ID=null;
		    			let act=[];
		    			if(a.length<1){ //全删
		    				state="1";
		    				act=this.selectedId;
		    			}else{
		    				state="0";
		    				act=a;
		    			}
		    			for(let i=0;i<act.length;i++){
			    			if(state=="0"){
			    				this.selectedId.indexOf(act[i].ID)==-1;
			    				
			    				this.$http.get(config.content+'/asmx/RoleService.asmx/GetAddRoleMap',{params:{sysID:this.$store.state.placeId,roleID:this.roleID,mapID:act[i].ID,statues:state}}).then(response => {			
										let result = response.body;
						                let father=[];
						                result = $.parseXML(result);
						                let obj;
						                $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						            })
						        }, response => {
						            console.log("error");
						        });
			    				
			    			}else{
			    					this.$http.get(config.content+'/asmx/RoleService.asmx/GetAddRoleMap',{params:{sysID:this.$store.state.placeId,roleID:this.roleID,mapID:act[i],statues:state}}).then(response => {			
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
										
						        }, response => {
						            console.log("error");
						        });
			    			}
		    			}
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
/***********表格样式*************/

.main table.msg_table tr td:nth-child(9){
	display:none;
}
</style>
<template>
	<div class="main">
		            		<div class="local">
		            					当前位置：<span class="pos1">{{Local}}</span> > <span class="pos2">{{ $route.name}}</span>
		            		</div>
		            		<div class="table col-lg-12 col-sm-12 col-md-12 col-xs-12 nopadding" style="margin-left:10px;overflow: hidden;">
		            			
		            			<div class="col-lg-2 col-sm-2 col-md-2 col-xs-12 nopadding"style="padding-left:10px;max-height:calc(100% - 20px);">
										<Button style="font-size:16px;margin-top:10px;margin-top:20px;margin-bottom:10px;background-color:#2a404e;border:none;color:#b9cdd7" @click="orgModel = true" long><Icon size="20" type="ios-plus-outline"></Icon>&#160;添加管理站</Button>
										<div class="manageTree org" :view-id="changeP">
											<el-tree
											  :data="orgList"
											  :props="defaultProps"
											  node-key="id"
											  highlight-current
											  accordion
											  :expand-on-click-node="false"
											  @node-click="selectTree"
											  :render-content="renderContent">
											</el-tree>
										</div>	
								</div>
								<div class="col-lg-10 col-sm-10 col-md-10 col-xs-12 nopadding" >
									<div class="manageTree page_list">
										<el-tabs type="border-card" style="height:100%">
										  <el-tab-pane style="height:100%">
										    <span slot="label"><i class="el-icon-date"></i>&#160;{{titleMsg}}信息</span>
									  <div class="detail" style="padding:20px;margin:0px auto;">
										  		  <div class="userDetail" v-show="showForm == 'user'" style="width:780px;height:560px;margin:0px auto;">
										  		  	<div class="showIcon" style="float:left;height:200px;width:200px;color:#b9cdd7;">
										  		  		
										  		  		 <Upload 
											                	:action="uploadUrl"
											                	:format="['jpg','jpeg','gif','png']"
											                	:on-format-error="handleFormatError"
											               		:max-size = "1024000"
											                	:on-success="UploadDetail"
											                	:show-upload-list= "false"
											                	:on-error="Uploaderror">
											                	<img :src="detailUserMsg.TOUXIANG" style="cursor:pointer;display:block;border:3px solid rgb(185, 205, 215);height:160px;width:160px;margin-bottom:20px;"/>
											    			</Upload>
										  		  		
											  		  	
											  		  	<div> <span style="font-weight:600;">登录账号：</span> {{detailUserMsg.LOGNAME}} </div>
											  		  	<div><span style="font-weight:600;">用户名称：</span> {{detailUserMsg.USER_MC}} </div>
										  		  	</div>
										  		  	<div class="userForm" style="width:560px;float:left;border-left:1px dashed #ddd;margin-left:20px">
										  		  		
										  		  		 	
										  		  		<Form  ref="detailUserMsg"  :rules="formInlineT" :model="detailUserMsg" :label-width="100">
												        <FormItem prop="USER_MC" label="用户名">
												            <Input type="text" v-model="detailUserMsg.USER_MC" placeholder="请输入">
												            </Input>
												        </FormItem>
												        <FormItem label="登录账号" >
												            <Input title="登录账号不能修改" disabled="disabled"  type="text" v-model="detailUserMsg.LOGNAME" placeholder="请输入">
												            </Input>
												        </FormItem>
												        <FormItem prop="PASSWORD" label="密码">
												            <Input type="password" v-model="detailUserMsg.PASSWORD" placeholder="请输入">
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
												            <Input  v-model="detailUserMsg.DATE_YQ" placeholder="请输入">
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
												        <FormItem prop="BEIZHU" label="用户描述">
												            <Input type="textarea" :autosize="{minRows: 2,maxRows: 2}" v-model="detailUserMsg.BEIZHU" placeholder="请输入">
												            </Input>
												        </FormItem>
												        <Button type="primary" style="float:right;" @click="saveUser('detailUserMsg')">保存</Button>
											   		 </Form>
										  		  	</div>
											  		  	
										  		  </div>
										  		  <div class="orgDetail" v-show="showForm == 'org'" style="width:520px;height:560px;margin:0px auto;">
										  		  	 <Form  :rules="formInline2" ref="formInline2"  :model="detailOrgMsg" :label-width="100" >
											         	<FormItem prop="JIGOU_MC" label="名称" >
												            <Input type="text" v-model="detailOrgMsg.JIGOU_MC" placeholder="请输入">
												            </Input>
												        </FormItem>
												        <!--<FormItem prop="MIAOSHU" label="所属系统">
												            <Input type="text" v-model="detailOrgMsg.system" placeholder="请输入">
												            </Input>
												        </FormItem>-->
												        <FormItem prop="MIAOSHU" label="地址">
												            <Input type="text" v-model="detailOrgMsg.DIZHI" placeholder="请输入">
												            </Input>
												        </FormItem>
												         <FormItem prop="MIAOSHU" label="组织机构代码">
												            <Input type="text" v-model="detailOrgMsg.JIGOU_MC" placeholder="请输入">
												            </Input>
												        </FormItem>
												        <FormItem prop="MIAOSHU" label="负责人">
												            <Input type="text" v-model="detailOrgMsg.FUZEREN" placeholder="请输入">
												            </Input>
												        </FormItem>
												        <FormItem prop="MIAOSHU" label="电话">
												            <Input type="text" v-model="detailOrgMsg.DIANHUA" placeholder="请输入">
												            </Input>
												        </FormItem>
												        <FormItem prop="MIAOSHU" label="级别">
												            <Input type="text" v-model="detailOrgMsg.L_ID" placeholder="请输入">
												            </Input>
												        </FormItem>
												        <FormItem prop="MIAOSHU" label="负责人电话">
												            <Input type="text" v-model="detailOrgMsg.FUZEREN_DH" placeholder="运维管理平台">
												            </Input>
												        </FormItem>
												        <FormItem prop="desc" label="组织机构介绍" style="width:520px;height:30px;" >
												            <Input v-model="detailOrgMsg.MIAOSHU" type="textarea" :autosize="{minRows: 2,maxRows: 2}" placeholder="请输入..."></Input>
												        </FormItem>
											   		 </Form>
											   		  <Button type="primary" style="float:right;margin-top:20px;" @click="saveOrg('formInline2')">保存</Button>
										  		  </div>
										  		  
										  </div>
										  </el-tab-pane>
										  <el-tab-pane>
										  	<span slot="label"><i class="ivu-icon ivu-icon-person-stalker" size="30px"></i>&#160;角色信息</span>
										   <el-table
												    ref="singleTable"
												    :data="roleTable"
												    tooltip-effect="dark"
												    highlight-current-row
												    @current-change="changeSelect"
												    :border="tborder"
												    style="width: 100%"
												   >
												    
												     <el-table-column
												      prop="ROLE_MC"
												      label="角色名称"
												      align="center"
												      width="120">
												    </el-table-column>
												    <el-table-column
												      prop="MIAOSHU"
												      label="描述"
												      align="center"
												      show-overflow-tooltip>
												    </el-table-column>
												    <el-table-column
												      prop="CHUANGJIAN_DATE"
												      label="创建时间"
												      align="center"
												      width="300">
												    </el-table-column>
												    
												 </el-table>
										  </el-tab-pane>
										</el-tabs>
									</div>
								</div>
		            		</div>
		            		
		            		<!--//对话框-->
		            		<Modal
						        v-model="orgModel" @on-cancel="closeModal" width="600">
						         <div slot="header" style="color:#57a3f3;text-align:left;font-size:20px;">
						            <span>添加机构</span>
						        </div>
						         <Form  :rules="formInline2" ref="addOrgMsg"  :model="addOrgMsg" :label-width="100" >
						         	<FormItem prop="JIGOU_MC" label="名称" >
							            <Input type="text" v-model="addOrgMsg.JIGOU_MC" placeholder="请输入">
							            </Input>
							        </FormItem>
							        <FormItem prop="MIAOSHU" label="所属系统">
							            <Input type="text" v-model="addOrgMsg.system" placeholder="请输入">
							            </Input>
							        </FormItem>
							        <FormItem prop="MIAOSHU" label="地址">
							            <Input type="text" v-model="addOrgMsg.DIZHI" placeholder="请输入">
							            </Input>
							        </FormItem>
							        <FormItem prop="MIAOSHU" label="负责人">
							            <Input type="text" v-model="addOrgMsg.FUZEREN" placeholder="请输入">
							            </Input>
							        </FormItem>
							        <FormItem prop="MIAOSHU" label="电话">
							            <Input type="text" v-model="addOrgMsg.DIANHUA" placeholder="请输入">
							            </Input>
							        </FormItem>
							        <FormItem prop="MIAOSHU" label="负责人电话">
							            <Input type="text" v-model="addOrgMsg.FUZEREN_DH" placeholder="运维管理平台">
							            </Input>
							        </FormItem>
							         <FormItem prop="desc" label="组织机构介绍" style="width:500px;height:30px;" >
							            <Input v-model="addOrgMsg.MIAOSHU" type="textarea" :autosize="{minRows: 2,maxRows: 2}" placeholder="请输入..."></Input>
							        </FormItem>
						   		 </Form>
						   		  <div slot="footer">
							        	<Button type="text" @click="closeModal">取消</Button>
							            <Button type="primary" @click="handleSubmitOrg('addOrgMsg')">提交</Button>
						        	</div>
						    </Modal>
						    
						    <Modal
						        v-model="userModel" @on-cancel="closeModal" width="680">
						         <div slot="header" style="color:#57a3f3;text-align:left;font-size:20px;">
						            <span>添加用户</span>
						        </div>
						         <Form   :rules="formInline" ref="addUserMsg" :model="addUserMsg" :label-width="90" >
						         	
							        <FormItem prop="USER_MC" label="用户名称" >
							            <Input type="text" v-model="addUserMsg.USER_MC" placeholder="请输入">
							            </Input>
							        </FormItem>
							        <FormItem prop="LOGNAME" label="登录账号">
							            <Input type="text" v-model="addUserMsg.LOGNAME" placeholder="请输入">
							            </Input>
							        </FormItem>
							        <FormItem prop="PASSWORD" label="输入密码" >
							            <Input type="password" v-model="addUserMsg.PASSWORD" auto-complete="off" placeholder="请输入">
							            </Input>
							        </FormItem>
							        
							       	<FormItem prop="PASSWORDO" label="确认密码">
										<Input type="password" v-model="addUserMsg.PASSWORDO" auto-complete="off" placeholder="请输入">
										</Input>
									</FormItem>
									
							        <FormItem  prop="SHEBEI_BH"  label="手机号" >
							            <Input type="text" v-model="addUserMsg.SHEBEI_BH" placeholder="请输入">
							            </Input>
							        </FormItem>
							        <FormItem  prop="NEIBU_DH" label="内部短号" >
							            <Input type="text" v-model="addUserMsg.NEIBU_DH" placeholder="请输入">
							            </Input>
							        </FormItem>
							        <FormItem  prop="DATE_YQ"  label="时间要求" >
							            <Input type="text" v-model="addUserMsg.DATE_YQ" placeholder="请输入">
							            </Input>
							        </FormItem>
							        <FormItem prop="EMAIL" label="邮箱" >
							            <Input type="text" v-model="addUserMsg.EMAIL" placeholder="请输入">
							            </Input>
							        </FormItem>
							    <!--    <FormItem prop="MIAOSHU" label="所属部门">
							            <Input type="text" v-model="addUserMsg.JIGOU_MC" placeholder="请输入">
							            </Input>
							        </FormItem>-->
							        <FormItem prop="MIAOSHU" label="用户头像">
							            <Upload 
						                	:action="uploadUrl"
						                	:format="['jpg','jpeg','gif','png']"
						                	:on-format-error="handleFormatError"
						               		:max-size = "1024000"
						                	:on-success="UploadAdd"
						                	:show-upload-list= "false"
						                	:on-error="Uploaderror">
						        			<Button  style="color:#b9cdd7" type="ghost" icon="ios-cloud-upload-outline"><span  style="color:#b9cdd7">选择要上传文件的文件</span></Button>
						    			</Upload>
										<div v-if="file !== null" >待上传文件：{{ file.name }}
											<Button type="text" @click="UploadAdd" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button>
										</div>
							        </FormItem>
							        <FormItem prop="MIAOSHU" label="用户描述" style="width:645px;height:30px;">
							            <Input type="textarea" :autosize="{minRows: 2,maxRows: 2}" v-model="addUserMsg.BEIZHU" placeholder="请输入">
							            </Input>
							        </FormItem>
						   		 </Form>
						   		 <div slot="footer">
							        	<Button type="text" @click="closeModal">取消</Button>
							            <Button type="primary" @click="handleSubmitUser('addUserMsg')">提交</Button>
						        </div>
						    </Modal>
		            		<Modal v-model="treeDel">
						         <p slot="header" style="color:#f60;text-align:center">
						            <Icon type="information-circled"></Icon>
						            <span>删除确认</span>
						        </p>
						        <p>是否删除选中{{titleMsg}}？</p>
						        <div slot="footer">
						        	<Button type="primary"  @click="closeModal">取消</Button>
						            <Button type="error"  @click="delTree">删除</Button>
						        </div>
						    </Modal>    		
	</div>
</template>

<script>

 import config from '../config/config.js'
  let id = 1000;
	export default{
		  data (){
		  	
		  	let LogName=[];
		  	
		  			this.$http.get(config.content+'/asmx/OrganizationService.asmx/GetOrgInfoByParentId',{params:{sjId:this.$store.state.placeId}}).then(response => {			
										let result = response.body;
						                result = $.parseXML(result);
						                let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                if(obj.Result){
						                	for(let i=0;i<obj.Result.length;i++){
						                	
						                	for(let c=0;c<obj.Result[i].children.length;c++){
						                		LogName.push(obj.Result[i].children[c].loginName);
						                		this.LogName.push(obj.Result[i].children[c].loginName);
						                	}
						                	
						                }
						                }else{
						                	LogName = [];
						                }
						                
						              
						                
						        }, response => {
						            console.log("error");
						        });
		  	
		  	
		  	const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.addUserMsg.PASSWORDO !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.addUserMsg.validateField('PASSWORDO');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if ($.trim(value) !== $.trim(this.addUserMsg.PASSWORD)) {
                    callback(new Error('两次输入的密码不匹配'));
                } else if($.trim(value) == $.trim(this.addUserMsg.PASSWORD)) {
                    callback();
                } 
            };
            const validateLogName = (rule, value, callback)=>{
            	
            	let reg = new RegExp("^[A-Za-z0-9]{1,16}?$");  
            	let data = $.trim(value);
            	let log;		//是否可用

            	if(this.LogName){
            		
            		this.LogName.indexOf($.trim(value)) == -1?
            		log = true:
            		log = false;
            	}else{
            		
            		LogName.indexOf($.trim(value)) == -1 ?
            		log = true:
            		log = false;
            		
            	}
            	let test =function(){
            		if (log) {
	                    	
	                    	callback();
	                    	
	               		}else{
	               		 	callback(new Error('该昵称已有人使用请重新输入'));
	               		 }
            	}
            	if(reg.test(data)){
            		
            		if(this.userModel==true){
            			test();
            		}else{
            			if(data != this.detailUserMsg.LOGNAME){
	            			test();
	            		}
            		}
            	
            	}else{
            		 callback(new Error('请输入16位大小写英文字母或者数字'));
            	}
            	
            }
            return {
		    					
		    					local:"",
		    					tborder:false,
		    					pid:"",
		    					//defaultIcon:require("../../assets/save.png"),
		    					uploadUrl:config.content+"/asmx/UserManager.asmx/UploadFile",
		    					//可编辑树
		    					addOrgMsg:{
		    						id:null,
		    						label:null,
		    						data:null,
		    						node:null,
		    						JIGOU_MC:null, 
		    						DIZHI:null,
		    						FUZEREN:null,
		    						FUZEREN_DH:null,
		    						DIANHUA:null,
		    						MIAOSHU:null,
		    					},
		    					addUserMsg:{
		    						id:null,
		    						name:null,
		    						label:null,
		    						data:null,
		    						n:null,
		    						node:null,
		    						LOGNAME:null,
		    						USER_MC:null,
		    						PASSWORD:null,
		    						PASSWORDO:null,
		    						TOUXIANG:null,
		    						SHEBEI_BH:null,
		    						NEIBU_DH:null,
		    						DATE_YQ:null,
		    						JIGOU_ID:null,
		    						EMAIL:null,
		    						BEIZHU:null,
		    					},
		    					orgModel:false,
		    					treeDel:false,
		    					titleMsg:"机构",
		    					showForm:"org",
		    					LogName:[],
		    					detailOrgMsg:{
		    						JIGOU_MC:null, 
		    						DIZHI:null,
		    						FUZEREN:null,
		    						FUZEREN_DH:null,
		    						DIANHUA:null,
		    						MIAOSHU:null,
		    					},
		    					detailUserMsg:{
		    						LOGNAME:null,
		    						USER_MC:null,
		    						PASSWORD:null,
		    						TOUXIANG:null,
		    						SHEBEI_BH:null,
		    						NEIBU_DH:null,
		    						DATE_YQ:null,
		    						JIGOU_ID:null,
		    						EMAIL:null,
		    						BEIZHU:null,
		    					},
		    					orgList: [],
		    					formInline:{
		    						 PASSWORD: [
						                        { required: true, message: '请输入密码',   trigger: 'blur' }
						                    ],
						            PASSWORDO: [
						                        {required: true,  validator: validatePassCheck, trigger: 'blur' }
						                    ],
									EMAIL: [
					                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
					                        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                    							],
									
									 DATE_YQ:[
									 	 {required: true, message: '请输入时间要求', trigger: 'blur' }
									 ],
									 LOGNAME:[
									 	 {required: true,  validator: validateLogName, trigger: 'blur' }
									 ],
									
									 USER_MC: [
							            { required: true, message: '请输入用户名称', trigger: 'blur'},
							          ],
							          SHEBEI_BH:[
							            { required: true, message: '请输入电话号码', trigger: 'blur'},
							          ],
		    					},
		    					formInlineT:{
		    						LOGNAME:[
									 	 {required: true,  validator: validateLogName, trigger: 'blur' }
									 ],
		    						 PASSWORD: [
						                        { required: true, message: '请输入密码',   trigger: 'blur' }
						                    ],
						      
									EMAIL: [
					                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
					                        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                    							],
			
									 DATE_YQ:[
									 	 {required: true, message: '请输入时间要求', trigger: 'blur' }
									 ],
									
									 USER_MC: [
							            { required: true, message: '请输入用户名称', trigger: 'blur'},
							          ],
							          SHEBEI_BH:[
							            { required: true, message: '请输入电话号码', trigger: 'blur'},
							          ],
		    					},
		    					formInline2:{
		    						 JIGOU_MC: [
						                        { required: true, message: '请输入机构名称',   trigger: 'blur' }
						                    ],
		    					},
								defaultProps: {
								          children: 'children',
								          label: 'lable',
								          id:"ID",
								        },
								roleTableId:[],
							    roleTable:[],
								userModel:false,
								SHANGJI_ID:null,
								level:null,
								roleHas:0,     //已有权限数，，判断是增加还是删除
								mapTableId:[], //所有的角色id集合，以便点亮对应的角色栏
								selectedId:[],   //已选中的角色id
								//文件上传
								file: null,    
                				loadingStatus: false,
                				defalutAdd:true,  //是否添加默认
								}
		    	},
		    	computed:{
		    		/*USER_MC:function(){
						this.reloadTree();	
		    			return this.$store.state.USER_MC;
		    		},*/
		    		changeP:function(){
		    		
		    			return this.$store.state.placeId;
		    		},
		    		Local:function(){
		    			return this.$store.state.LOCAL_MC;
		    		}
		    	},
		    	
		    	mounted(){
		    		$("table.msg_table tr:odd").addClass("odd");
					this.reloadTree();
					this.reloadMapList();
		    	},
		    	methods:{
		    		closeModal:function(){
		    			this.orgModel=false;
		    			this.treeDel=false;
		    			this.userModel=false;
						this.addOrgMsg={};
		    			this.$Message.info('已取消');
		    		},
		    		changeSelect:function(n,o){
		    			if(this.titleMsg=="机构"){
			    			
			    			swal("错误", "请选择用户再添加角色", "error");
			    			this.$refs.singleTable.setCurrentRow();
			    		}else{
			    			if(n){
			    				if(o){
				    				//删除
					    			this.$http.get(config.content+'/asmx/UserRole.asmx/DeleteUserRoleByID',{params:{userID:this.SHANGJI_ID,roleID:o.ID}}).then(response => {			
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
			    				
			    				if(this.defalutAdd){  //避免重复添加
			    					//添加
				    				let jsonn={}; 
					    			jsonn.ROLE_ID=n.ID;
									jsonn.USER_ID=this.SHANGJI_ID;
				    				jsonn=JSON.stringify(jsonn);
					    			this.$http.get(config.content+'/asmx/UserRole.asmx/AddUserRoleData',{params:{json:jsonn}}).then(response => {			
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
			    				this.defalutAdd=true;
				    			
				    			
				    			}
			    			}
			    			
		    			
		    		},
		    		selectS:function(a,b){
			    		if(this.titleMsg=="机构"){
			    			
			    			swal("错误", "请选择用户再添加角色", "error");
			    			this.$refs.singleTable.setCurrentRow();  //取消高亮
			    			
			    		}else{
			    			let url;
			    			let jsons={}; 
			    			jsons.ROLE_ID=b.ID;
							jsons.USER_ID=this.SHANGJI_ID;
			    			//a>roleHas.length 则为添加  反之为删除 b是当前对象  
			    			if(a.length>this.roleHas){  //添加
			    				url="AddUserRoleData";
			    				this.selectedId.push(b.ID);
			    				this.roleHas++;
			    				jsons=JSON.stringify(jsons);
				    			this.$http.get(config.content+'/asmx/UserRole.asmx/'+url,{params:{json:jsons}}).then(response => {			
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
			    			}else{                    //删除
			    				url="DeleteUserRoleByID";
			    				for(var i=0; i<this.selectedId.length; i++) {
								    if(this.selectedId[i].ID == b.ID) {
								      this.selectedId.splice(i, 1);
								      break;
								    }
								}
			    			this.$http.get(config.content+'/asmx/UserRole.asmx/'+url,{params:{userID:jsons.USER_ID,roleID:jsons.ROLE_ID}}).then(response => {			
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
			    				
			    				this.roleHas-=1;
			    			}
			    			
			    		}
		    		
		    			
		    		},
		    		selectA:function(a,b){
		    			
		    			if(this.titleMsg=="机构"){
			    			swal("错误", "请选择用户再添加角色", "error");
							this.$refs.singleTable.clearSelection();
		    			}else{
		    				for(let i=0; i<a.length; i++) { //除去问题项
							    if(!a[i]) {
							      a.splice(i, 1);
							    }
							}
			    		//	console.log(a);
			    		//	console.log(this.selectedId);
			    			let url;
			    			let arr=[];
			    			let jsons;
			    			if(a.length>1){    //全选
			    				url="AddUserRoleData";
			    				for(let i=1;i<a.length;i++){
			    					this.selectedId.indexOf(a[i].ID)==-1?arr.push(a[i].ID):null;
			    				}
			    			}else{           //全删
			    				url="DeleteUserRoleByID";
			    				arr=this.mapTableId;
			    			}
			    			for(let i=0;i<arr.length;i++){
			    				jsons={};
			    				url=="DeleteUserRoleByID"?jsons.ROLE_ID=arr[i].ID:jsons.ROLE_ID=arr[i];
								jsons.USER_ID=this.SHANGJI_ID;
			    				jsons=JSON.stringify(jsons);
			    			//	console.log(jsons);
			    				this.$http.get(config.content+'/asmx/UserRole.asmx/'+url,{params:{json:jsons}}).then(response => {			
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
		    		},
		    		saveOrg:function(name){
						this.$refs[name].validate((valid) => {
				          if (valid) {
				          	let jsons=this.detailOrgMsg;
		    			jsons.JIGOU_ID=this.SHANGJI_ID;
		    			jsons=JSON.stringify(jsons);
		    		//	console.log(jsons);
		                this.$http.get(config.content+'/asmx/OrganizationService.asmx/UpdateOrgInfoData',{params:{
		                    json:jsons
			                    	}}).then(response => {
										this.$Message.success('提交成功');
							               this.modalTotal = false;
							               this.$Notice.success({
							                    title: '已成功更新该机构信息',
							               });
							            this.userModel=false;
										this.reloadTree();
							        }, response => {
							             swal("失败", "更新失败", "error");
							        });

				          }else{
				          	this.$Message.error('验证失败');
				            return false;
				          }
				          
		    			});	        
							        
		    		},
		    		saveUser:function(name){
		    			
		    			
		    			console.log(this.detailUserMsg);
		    			this.$refs[name].validate((valid) => {
				          if (valid) {
				          	let jsons=this.detailUserMsg;
			    			jsons.PASSWORD=$.trim(this.detailUserMsg.PASSWORD);
			    			
			    			delete jsons.JIGOU_ID_NAME;
			    			jsons=JSON.stringify(jsons);
			    			
			                this.$http.get(config.content+'/asmx/UserManager.asmx/UpdateUserData',{params:{
			                    json:jsons
				                    	}}).then(response => {
				                    		
											this.$Message.success('提交成功');
								               this.modalTotal = false;
								               this.$Notice.success({
								                    title: '已成功更新该人员信息',
								               });
								            this.userModel=false;
											this.reloadTree();
								        }, response => {
								             swal("失败", "更新失败", "error");
								        });
				          }else{
				          	this.$Message.error('验证失败');
				            return false;
				          }
				          
		    			});
		    		},
		    		handleSubmitUser(name){
		    			this.$refs[name].validate((valid) => {
				          if (valid) {
				            
		    			/*//前端展示
		    			const parent = this.addUserMsg.node.parent;

		    			const newChild = { id:this.addUserMsg.id, lable: this.addUserMsg.USER_MC, children: [] };
					    if (!this.addUserMsg.data.children) {
					        this.$set(this.addUserMsg.data, 'children', []);
					    }
					    
					    
					    this.addUserMsg.data.children.push(newChild);*/
		    			//后端数据
		    			delete this.addUserMsg.data;
		    			delete this.addUserMsg.node;
		    			delete this.addUserMsg.JIGOU_MC;
		    			delete this.addUserMsg.PASSWORDO;
		    			let jsons=this.addUserMsg;
		    			jsons.PASSWORD = $.trim(jsons.PASSWORD );
		    			jsons=JSON.stringify(jsons);
		    			
		    			
		                this.$http.get(config.content+'/asmx/UserManager.asmx/AddUserData',{params:{
		                    json:jsons
			                    	}}).then(response => {
			                    		
			                    		let result = response.body;
			                    		let obj;
						                 result = $.parseXML(result);
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                });
						                
						            this.LogName.push(this.addUserMsg.LOGNAME);
			                    		
										this.$Message.success('提交成功');
							               this.modalTotal = false;
							               this.$Notice.success({
							                    title: '已成功添加一条数据。',
							               });
							            this.userModel=false;
										this.reloadTree();
							        }, response => {
							             swal("失败", "添加失败", "error");
							        });
				          } else {
				            this.$Message.error('验证失败');
				            return false;
				          }
				        });
		    			
		    			
		    		},
		    		handleSubmitOrg:function(name){
		    		
						
					this.$refs[name].validate((valid) => {
				          if (valid) {
				            
		    				/*//前端展示
		    			const parent = this.addOrgMsg.node.parent;
		    			const newChild = { id:this.addOrgMsg.id, lable: this.addOrgMsg.JIGOU_MC, children: [] };
					    if (!this.addOrgMsg.data.children) {
					        this.$set(this.addOrgMsg.data, 'children', []);
					    }
					    this.addOrgMsg.data.children.push(newChild);*/
		    			//后端数据
		    			delete this.addOrgMsg.data;
		    			delete this.addOrgMsg.node;
		    			//delete this.addOrgMsg.JIGOU_MC;
		    			
		    			let jsons=this.addOrgMsg;
		    			jsons.L_ID       = 1;
		    			jsons.SHANGJI_ID = this.$store.state.placeId;
		    			jsons=JSON.stringify(jsons);
		                this.$http.get(config.content+'/asmx/OrganizationService.asmx/AddOrgInfoData',{params:{
		                    json:jsons
			                    	}}).then(response => {
										this.$Message.success('提交成功');
							               this.modalTotal = false;
							               this.$Notice.success({
							                    title: '已成功添加一条数据。',
							               });
							            this.orgModel=false;
										this.reloadTree();
							        }, response => {
							             swal("失败", "添加失败", "error");
							        });
				          } else {
				            this.$Message.error('验证失败');
				            return false;
				          }
				        });		        
							        
		    		},
		    		appendOrg(node,data) {
		    		 		this.addOrgMsg={};
		    		 		this.orgModel=true;
		    		 		this.addOrgMsg.data=data;
		    		 		this.addOrgMsg.node=node;
					},
					appendUser(node,data) {
		    		 		this.addUserMsg={
		    					},
		    				this.addUserMsg.PASSWORDO= null;
		    				this.$refs['addUserMsg'].resetFields();
		    		 		this.userModel=true;
		    		 		this.addUserMsg.data=data;
		    		 		this.addUserMsg.node=node;
		    		 		
		    		 		
		    		 		
					},
					delTree(){
							if(this.level<2){
								const parent = this.addOrgMsg.node.parent;
						        const children = parent.data.children || parent.data;
						        const index = children.findIndex(d => d.id ===this.addOrgMsg.data.id);
						        children.splice(index, 1);
						        this.$http.get(config.content+'/asmx/OrganizationService.asmx/DeleteOrgInfoByID',{params:{id:this.addOrgMsg.data.id,}}).then(response => {			
										let result = response.body;
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                });
						                this.$Message.success('删除成功');
						                this.$Notice.success({
						                    title: '已成功删除该机构',
						               });
						        }, response => {
						            console.log("error");
						        });
						        
							}else{
								const parent = this.addUserMsg.node.parent;
						        const children = parent.data.children || parent.data;
						        const index = children.findIndex(d => d.id ===this.addUserMsg.data.id);
						        children.splice(index, 1);
						        
						        
						        let removeLog = function(a,val) {
														let index = a.indexOf(val);
														if (index > -1) {
														a.splice(index, 1);
														}
										};
						        
						        
						         this.$http.get(config.content+'/asmx/UserManager.asmx/DeleteUserByID',{params:{id:this.addUserMsg.data.id,}}).then(response => {			
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                });
						                
						                this.LogName.removeLog(this.LogName,this.addUserMsg.LOGNAME);
						                
						                this.$Message.success('删除成功');
						                this.$Notice.success({
						                    title: '已成功删除该用户',
						               });
						        }, response => {
						            console.log("error");
						        });
							}
							this.treeDel=false;
					},
					removeOrg(node, data) {
						this.treeDel=true;
						this.addOrgMsg.node=node;
						this.addOrgMsg.data=data;
					},
					removeUser(node, data) {
						this.treeDel=true;
						this.addUserMsg.node=node;
						this.addUserMsg.data=data;
					
					},
					selectTree(a,b,c){
						
						this.level=b.level;
						this.SHANGJI_ID=a.id;
						this.addUserMsg.JIGOU_MC=a.lable;
						this.addUserMsg.JIGOU_ID=a.id;
						if(b.level<2){  
							//小于3 机构
							//取消选择角色
						    this.$refs.singleTable.clearSelection();
							this.titleMsg="机构";
							this.showForm="org";
							this.$http.get(config.content+'/asmx/OrganizationService.asmx/GetOrgInfoById',{params:{jgId:a.id}}).then(response => {			
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                obj.Result?this.detailOrgMsg=obj.Result[0]:
						                this.detailOrgMsg={};
										
										
										
						        }, response => {
						            console.log("error");
						        });
							
						}else{
							this.titleMsg="用户";
							this.showForm="user";
							this.$http.get(config.content+'/asmx/UserManager.asmx/GetUserDetail',{params:{userId:a.id,}}).then(response => {			
										let result = response.body;
						                
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                });
						                
						                obj.Result?this.detailUserMsg=obj.Result[0]:
						                
						               
						                this.detailUserMsg={};
						                
						                
										this.detailUserMsg.DATE_YQ=this.detailUserMsg.DATE_YQ+"";
										
						                this.$refs['detailUserMsg'].resetFields();
						                
						                
						                
						                console.log(obj.Result[0]);
						                
						        }, response => {
						            console.log("error");
						        });
						        
							//获取角色信息
							
							
							this.$http.get(config.content+'/asmx/UserRole.asmx/GetUserRoleById',{params:{orgaId:a.id}}).then(response => {			
										this.roleHas=0;
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                this.selectedId=[];
						               // this.$refs.singleTable.clearSelection();
						               this.$refs.singleTable.setCurrentRow();
						               if(obj.Result){
										 let index;	
							                for(let i=0;i<obj.Result.length;i++){
							                	
							                	if(obj.Result[i].ROLE_ID){ //排除无用项，脏数据
								                	this.roleHas++;
								                	obj.Result[i].ROLE_ID?this.selectedId.push(obj.Result[i].ROLE_ID):null;
								                	
								              //多选  	index=this.mapTableId.indexOf(obj.Result[i].ROLE_ID);   
								              //多选  	this.$refs.singleTable.toggleRowSelection(this.roleTable[index],true); //点亮对应的选择项
							                	}
							                }
							                index=this.mapTableId.indexOf(obj.Result[0].ROLE_ID); 
							                this.defalutAdd=false;
							                
							                this.$refs.singleTable.setCurrentRow(this.roleTable[index]);
							              
						               }  
						        }, response => {
						            console.log("error");
						        });
						}
					},
					renderContent(h, { node, data, store }) {
						
	
						
						let btn="";
						let span=<span>
					              <span> <i class="ivu-icon ivu-icon-ios-home" size="30px"></i>  {node.label}</span>
					            </span>;
						if(node.level==1){
							btn= <span style="float:right;margin-right:10px;">
						         	<i class="el-icon-plus el-icon--center" on-click={ () => this.appendUser(node,data) }></i>&#160;
					             	<i class="el-icon-delete el-icon--center"  on-click={ () => this.removeOrg(node, data) }></i>
					            </span>
						}else if(node.level==2){
							span = <span>
					                 <span> <i class="ivu-icon ivu-icon-ios-person" size="30px"></i>  {node.label}</span>
					              </span>
					        btn= <span style="float:right;margin-right:10px;">
					             	<i class="el-icon-delete el-icon--center" on-click={ () => this.removeUser(node, data) } ></i>
					            </span>
						}
					        return (
					          <span style="font-size: 14px; padding-right: 8px;">
					           {span}
					           {btn}
					          </span>);
					      },
					reloadMapList(){
		    			
		    			this.$http.get(config.content+'/asmx/RoleService.asmx/GetRoleDatataByPage',{params:{SYS_ID:this.$store.state.placeId,pageSize:104,pageIndex:0,keyword:null}}).then(response => {
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
						               this.roleTable=obj.Result.TableInfo;
						        }, response => {
						            console.log("error");
						        });
						        
		    		},
		    		reloadTree(){
		    			this.$http.get(config.content+'/asmx/OrganizationService.asmx/GetOrgInfoByParentId',{params:{sjId:this.$store.state.placeId}}).then(response => {			
										let result = response.body;
						                let father=[];
						                result = $.parseXML(result);
						                let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                 
						                 if(obj.Result){
						                 	
						                 	 this.orgList=obj.Result;
						                
								                for(let i=0;i<obj.Result.length;i++){
								                	
								                	for(let c=0;c<obj.Result[i].children.length;c++){
								                		this.LogName.push(obj.Result[i].children[c].loginName);
								                	}
								                	
								                }
						                 	
						                 }else{
						                 	
						                 	this.orgList = [];
						                 	this.LogName= [];
						                 	
						                 }
						               
						                
						        }, response => {
						            console.log("error");
						        });
						        
		    		},
		    		//文件上传
		    		handleFormatError(file){
		    			
		    			this.$Message.error('上传失败');
		    			
		    			this.$Notice.warning({
		                    title: '文件格式不正确',
		                    desc: '文件 ' + file.name + ' 格式不正确，请上传jpg,jpeg,gif,png格式的图片文件。'
		                });
		    		},
		    		UploadDetail( response, file, fileList){
		    			let res=$.parseXML(response);
		    			let obj;
		    			$(res).find("string").each(function(i){                     
							obj=$(this).text();                      
						})
		 				
		    			if(obj=="" || !obj ||obj==" "){
		        					 	swal({
				                            title: "提示",
				                            text: "文件上传失败!",
				                            type: "error",
				                            confirmButtonText: "确定",
				                        	});
		        					}else{
		        					 		this.$Message.success('上传成功');
		        					 	}
		        					
		        		this.detailUserMsg.TOUXIANG=config.content+"/"+obj;
		    			this.saveUser();			
		    		},
					UploadAdd( response, file, fileList){
		        					
		        		if(this.handleSubmitUser('addUserMsg')){
		        			
		        			let res=$.parseXML(response);
			    			let obj;
			    			$(res).find("string").each(function(i){                     
								obj=$(this).text();                      
							})
			    			this.addUserMsg.TOUXIANG=config.content+"/"+obj;
			    			
			    			console.log(obj);
		    			    if(obj=="" || !obj ||obj==" "){
		        					 	swal({
				                            title: "提示",
				                            text: "文件上传失败!",
				                            type: "error",
				                            confirmButtonText: "确定",
				                        	});
		        					}else{
		        					 		swal({
				                            title: "提示",
				                            text: "文件上传成功!",
				                            type: "success",
				                            confirmButtonText: "确定",
				                        	});
		        					 	}
		        			
		        			
		        		}else{
		        			
		        			swal({
				                            title: "提示",
				                            text: "请完善用户信息!",
				                            type: "error",
				                            confirmButtonText: "确定",
				             });
		        			
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
		    	}
	}
</script>

<style scoped="scoped">
	div.main div.listPanel .page_list{
		height:100%;
	}
	div.manageTree{
		min-width: 200px;
		background-color: #1c303a;
	}
	div.org{
		height:calc(100% - 36px);
		overflow:auto;
	}
    div.page_list{
		margin-left:20px;
		margin-top:20px;
		height:calc(100% - 30px);
	}
	div.main_con{
		height:100%;
	}
	div.local{
		height:60px;
	}
	div.table{
		margin-top:0px;
		background-color: #1c303a;
		height: calc(100% - 60px) !important;
	}
	div.table>div{
		height:100%;
	}

	div.detail{
		overflow-y: auto;
		height:calc(100% - 20px);
	}
	
	/*滚动条*/
	div.detail::-webkit-scrollbar-track
	{
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		background-color: #1C303A;
		
	}
	
	div.detail::-webkit-scrollbar
	{
		width: 10px;
		background-color: #F5F5F5;
	}
	
	div.detail::-webkit-scrollbar-thumb
	{
		background-color: rgb(41,73,95);
	}
	
	
	div.manageTree::-webkit-scrollbar-track
	{
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		background-color: #1C303A;
	}
	
	div.manageTree::-webkit-scrollbar
	{
		width: 10px;
		height:10px;
		background-color: #F5F5F5;
	}
	
	div.manageTree::-webkit-scrollbar-thumb
	{
		background-color: rgb(41,73,95);
	}
</style>
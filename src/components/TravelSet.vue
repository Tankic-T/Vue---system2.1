<template>
	<div class="main">
		
		<div class="local">
		    当前位置：<span class="pos1">{{Local}}</span> > <span class="pos2">{{ $route.name}}</span>
		</div>
	<div class="search">
		    <div class="del" @click="openDel"><span></span>删除</div>
		    <div class="update" @click="updateMap"><span></span>修改</div>
		    <div class="add" @click="addTravelSet"><span></span>增加</div>
		    
		    <div class="input">
			    <span>使用情况</span>
				<Select class="input" v-model="sta" @on-change="searchMsg" style="width:200px;background:none">
						<Option value="">所有</Option>
						<Option value="1">使用中</Option>
	                    <Option value="2">未使用</Option>
	    		</Select>
			</div>
			<div class="endDate">
				<label>选择结束时间</label>
				 <el-date-picker  
				   class="reset-el-26 maxw-120"  
				   v-model="endDate"  
				   align="right"  
				   type="datetime"  
				   placeholder="选择结束日期"  
				   ref="picker1"  
				   :editable="canEdit"  >  
				 </el-date-picker>  
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
         <Form ref="formInline" :model="travelSet" :rules="ruleInline" :label-width="80">
         	<FormItem prop="NAME" label="设备名称">
	            <Input type="text" v-model="travelSet.NAME" placeholder="请输入">
	            </Input>
	        </FormItem>
         	 <FormItem prop="SHEBEI_BH" label="设备编号">
	            <Input type="text" v-model="travelSet.SHEBEI_BH" placeholder="请输入">
	               <!-- <Icon type="ios-person-outline" slot="prepend"></Icon>-->
	            </Input>
	        </FormItem>
	        <FormItem prop="SHIYONGREN" label="使用人">
	            <Input type="text" v-model="travelSet.SHIYONGREN" placeholder="请输入">
	               <!-- <Icon type="ios-person-outline" slot="prepend"></Icon>-->
	            </Input>
	        </FormItem>
	        <FormItem prop="SHEBEI_ZT" label="使用情况">
	            <RadioGroup v-model="travelSet.SHEBEI_ZT">
	                <Radio value="1" label="1">设备使用中</Radio>
			        <Radio value="2" label="2">暂未使用</Radio>
	            </RadioGroup>
	        </FormItem>
	        <FormItem prop="STA_DATE" label="开始时间">
	            <el-date-picker  
	               id= "sDate"
				   class="reset-el-26 maxw-120"  
				   v-model="STA_DATE"  
				   align="left"  
				   type="datetime"  
				   placeholder="选择开始日期"  
				   ref="picker1"  
				   :editable="canEdit"  
				   :picker-options="pickerOptions1">  
				 </el-date-picker>  
	        </FormItem>
	        <FormItem  prop="END_DATE" label="结束时间">
	           
	           
	          <el-date-picker  
	           	  id = "eDate"
				  class="reset-el-26 maxw-120"  
				  v-model="END_DATE"  
				  align="left"  
				  type="datetime"  
				  placeholder="选择结束日期"  
				  ref="picker2"  
				  :editable="canEdit"  
				  :picker-options="pickerOptions0">   
				</el-date-picker>
				
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
			            					<ttboady @sendTodo="getTodo" class="TravelSet" v-on:change_AC="change_fAC" v-bind:isActive="isfA"  v-for="(item,index) in tr" v-bind:todo="item" v-bind:index="index" v-bind:key="item.id"></ttboady>
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
   let vueIns = null;
	export default{
  components:{ttboady},
	data (){
		    			return {
		    					thead:["设备名称","设备编号","设备使用人","是否正在使用","开始时间","结束时间"],
		    					tr:[],   
		    					pickerOptions0: {  
							        disabledDate(time) {  
							          // 最多只能选择一年的  
							          let ayearAgo = Date.now() - 31536000000  
							          return /*time.getTime() > Date.now() || */time.getTime() < ayearAgo  || (vueIns.sta1Date && vueIns.sta1Date.getTime && (time.getTime() < vueIns.sta1Date.getTime()))  
							        }  
							      },  
								pickerOptions1: {  
							        disabledDate(time) {  
							          // 最多只能选择一年的  
							          let ayearAgo = Date.now() - 31536000000  
							          return time.getTime() > Date.now() || time.getTime() < ayearAgo || (vueIns.end1Date && vueIns.end1Date.getTime && (time.getTime() > vueIns.end1Date.getTime()))  
							        }  
							    },
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
		    					sta:null, 	//查询的使用状态
		    					endDate:null,
		    					sta1Date:null,
		    					end1Date:null,
		    					canEdit:true,
		    					END_DATE:null,  //等同于travelSet.END_DATE  解决IE   不能显示的问题。
		    					STA_DATE:null,
		    					travelSet: {
				                    NAME:null,
				                    SHEBEI_BH:null,
				                    SHIYONGREN:null,
				                    SHEBEI_ZT:null,
				                    STA_DATE:null,
				                    END_DATE:null,
				               },
				               SHEBEI_ZT:{
				               	 1:"设备使用中",
				               	 2:"暂未使用"
				               },
				                updateMsg:{},
				                ruleInline: {
					                    NAME: [
					                        { required: true, message: '请填写设备名称', trigger: 'blur' }
					                    ],
					                     SHEBEI_BH: [
					                        { required: true, message: '请填写设备编号', trigger: 'blur' }
					                    ],
					                    SHIYONGREN: [
					                        { required: true, message: '请选择使用人', trigger: 'blur' },
					                    ],
					                    SHEBEI_ZT: [
					                        { required: true, message: '请选择设备使用状态', trigger: 'blur' },
					                    ],
					                    
					                    /* STA_DATE: [
					                        { required: true, message: '开始时间', trigger: 'blur' },
					                    ],
					                    END_DATE: [
					                        { required: true, message: '开始时间', trigger: 'blur' },
					                    ],*/
					                   
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
		    		//swal("失败", "删除失败", "error");
		    		/* layer.alert('偶吧深蓝style', {
						    skin: 'layui-layer-lan'
						    ,closeBtn: 0
						    ,anim: 0 //动画类型
						  });*/
		    	},
		    	created(){
		    		vueIns=this;
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
		    		openDel(){
		    			if(this.$store.state.tableselectCode.length<1){
		    				this.$Message.warning('您未选择数据');
		    			}else{
		    				this.modaldel = true;
		    			}
		    		},
		    		delMap(){
						this.modaldel = false;
		    			this.$http.get(config.content+'/asmx/PhoneSheBeiService.asmx/DeleteSheBeiID',{params:{key:this.$store.state.tableselectCode.join(",")}}).then(response => {				
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
		                    	let jsons=this.travelSet;
		                    	jsons.SYS_ID=this.$store.state.placeId;
								jsons.END_DATE=this.reizeDate(this.END_DATE);
								jsons.STA_DATE=this.reizeDate(this.STA_DATE);
		                    	jsons=JSON.stringify(jsons);
		                    	
		                    	if(this.submitType =="add"){
		                    		this.$http.get(config.content+'/asmx/PhoneSheBeiService.asmx/AddSheBei',{params:{
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
		                    		this.$http.get(config.content+'/asmx/PhoneSheBeiService.asmx/UpdateSheBei ',{params:{
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
		    		addTravelSet(){
		    			this.submitType ="add";
		    			
		    			this.travelSet={
				                    NAME:null,
				                    SHEBEI_BH:null,
				                    SHIYONGREN:null,
				                    SHEBEI_ZT:"2",
				                    STA_DATE:null,
				                    END_DATE:null,
				              },
		    			this.modalTotal=true;
		    		},
		    		updateMap(){
		    			if(this.$store.state.tableselectCode.length<1){
		    				this.$Message.warning('您未选择数据');
		    				//swal("警告", "您未选择任何数据", "warning");
		    			}else{
		    				this.submitType ="update";
		    				
		    				this.updateMsg.SHEBEI_ZT=="设备使用中"?this.updateMsg.SHEBEI_ZT=1:this.updateMsg.SHEBEI_ZT=2;
			    			this.travelSet=this.updateMsg;
			    			
			    			this.STA_DATE = this.updateMsg.STA_DATE;
			    			this.END_DATE=this.updateMsg.END_DATE;
			    			
			    			$("#sDate>input").attr("placeholder",this.updateMsg.STA_DATE);
			    			$("#eDate>input").attr("placeholder",this.updateMsg.END_DATE);
			    			
			    			this.modalTotal=true;
		    			}
		    			
		    		},
		    		reizeDate(data){
		    			const d=new Date(data);
		    			let h= d.getHours()<10? "0"+d.getHours() : d.getHours();
		    			let m= d.getMinutes()<10? "0"+d.getMinutes() : d.getMinutes();
		    			let s= d.getSeconds()<10? "0"+d.getSeconds() : d.getSeconds();
		    			return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + h + ':' + m + ':' + s;  
		    		},
		    		change_fAC(data){
		    			this.isfA = data;
		    		},
		    		reloadTable(){
		    			
		    			console.log(config.content);
		    			
		    			!this.endDate ? this.endDate=null:this.endDate=this.reizeDate(this.endDate);
		    			let Index=this.pageIndex-1;   
		    			this.$http.get(config.content+'/asmx/PhoneSheBeiService.asmx/GetSheBeiDataByPage',{params:{SYS_ID:this.$store.state.placeId,pageSize:this.pageSize,pageIndex:Index,staDate:null,endDate:this.endDate,sta:this.sta,keyword:this.keyword}}).then(response => {
						 								
										let result = response.body;
						                let father=[];
						                 result = $.parseXML(result);
						                 let obj;
						                 $(result).find("string").each(function(i){                     
						                 	obj=$.parseJSON($(this).text());                      
						                })
						                for(var i=0;i<obj.Result.TableInfo.length;i++){
						                 	obj.Result.TableInfo[i].SHEBEI_ZT=this.SHEBEI_ZT[obj.Result.TableInfo[i].SHEBEI_ZT];
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
.main div.search>div.endDate{
	width:19.1em;
	background: none;
	border:none;
}
.main div.search>div.endDate .el-input__inner{
	background: none;
	border:none;
	color:#fff;
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
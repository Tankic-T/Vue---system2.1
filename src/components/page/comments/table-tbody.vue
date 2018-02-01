<template>
	
	<tr  v-on:click="check_box(todo)" v-if="todo.cancel=='0'">
					            			<td>
					            				<div v-if="this.isActive" class="check_box active"   v-on:click="check_box(todo)">
					            				</div>
					            				<div v-else class="check_box"   v-on:click="check_box">
					            				</div>
					            			</td>
					            			<td v-for="c in todo"> 
					            				<div :title="c">{{c}}</div> 
					            			</td>
					         				<td class="role">
					            				<button class="menum" @click.stop="menuManage(todo)">菜单管理</button>
												<button class="maps" @click.stop="mapService(todo)">地图服务</button>
					         				</td>
					            	</tr>	
	<tr  v-on:click="check_box(todo)" v-else-if="todo.cancel=='doc'">
					            			<td>
					            				<div v-if="this.isActive" class="check_box active"   v-on:click="check_box(todo)">
					            				</div>
					            				<div v-else class="check_box"   v-on:click="check_box">
					            				</div>
					            			</td>
					            			<td v-for="c in todo"> 
					            				<div :title="c">{{c}}</div> 
					            			</td>
					         				<td class="role">
					            			
					            					<i @click.stop="editDoc(todo)" class="el-icon-edit el-icon--center"></i>
													<i  @click.stop="delDoc(todo)" class="el-icon-delete el-icon--center"></i>
												
					         				</td>
					            	</tr>	
	<tr  v-on:click="check_box(todo)" v-else>
					            			<td>
					            				<div v-if="this.isActive" class="check_box active"   v-on:click="check_box(todo)">
					            				</div>
					            				<div v-else class="check_box"   v-on:click="check_box">
					            				</div>
					            			</td>
					            			<td v-for="c in todo"> 
					            				<div :title="c">{{c}}</div> 
					            			</td>
					            	</tr>	
</template>
<script>
	export default{
		props:["todo","isActive","index"],
		data(){
				return {
					active:"active",
					num:-1,
					isA:this.isActive,
				}
			},
			/*mounted(){
				$(".msg_table tbody tr").click(function(){
					$(this).siblings().removeClass("ractive");
					$(this).addClass("ractive");
				
				})
			},*/
			
			methods:{
				check_box:function(todo){
					console.log(todo);
					this.isActive = !this.isActive;
					if(this.isActive){
						this.$store.state.tableselectCode.push(todo.ID);
					}else{
						this.$store.state.tableselectCode=this.$store.state.tableselectCode.filter(
							function(i){return i!=todo.ID}
						)
					}
					this.$emit("sendTodo",this.todo);
				},
				menuManage:function(todo){
					this.$emit("menuManage",todo.ID);
				},
				mapService:function(todo){
					this.$emit("mapService",todo.ID);
				},							
				delDoc:function(todo){
					this.$emit("delDoc",todo);
				},
				editDoc:function(todo){
					this.$emit("editDoc",todo);
				},
			},
	}
</script>

<style>

.main div.local{
	color:#b9cdd7;
	padding-left:1em;
}
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
	background-image: url(../../../assets/table/right.png);
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
	background-image: url(../../../assets/table/prev.png);
}
.main div.page_list .page li .top{
	background-image: url(../../../assets/table/tool_top.png);
}
.main div.page_list .page li .bottom{
	background-image: url(../../../assets/table/bottom.png);
}
.main div.page_list .page li .next{
	background-image: url(../../../assets/table/next.png);
}
</style>
<template>
	
	<tr  @click.stop="check_box(todo)" v-if="todo.cancel=='0'">
					            			<td>
					            				<div v-if="this.isActive" class="check_box active"   @click.stop="check_box(todo)">
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
									<tr  @click.stop="check_box(todo)" v-else-if="todo.cancel=='doc'">
					            			<td>
					            				<div v-if="this.isActive" class="check_box active"   @click.stop="check_box(todo)">
					            				</div>
					            				<div v-else class="check_box"   @click.stop="check_box">
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
									<tr  @click.stop="check_box(todo)" v-else>
					            			<td>
					            				<div v-if="this.isActive" class="check_box active"   @click.stop="check_box(todo)">
					            				</div>
					            				<div v-else class="check_box"   @click.stop="check_box">
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

</style>
<template>
	<div>
	<ul class="MagOrg" id="MagOrg">
		<li v-for="(i , index) in first">
			
			
			<p :class="{active : index == fnum}" @click="fClick(index)" >
				<span class="symbol"></span><span class="user"></span>{{i.text}}
			</p>
			
			<transition name="fade">
			   <ul class="childOrg" v-show="fnum==index" >
					<li  v-for="c in second" v-if="c.belongto==i.id">
						<span class="icon"></span>
						{{c.text}}
					</li>          	
				</ul>
			 </transition>

		</li>
	</ul>
	
	</div>

</template>

<script>
	import 'jquery'
	export default{
			data(){
				return {
					first:[
						/*{text:"格西沟保护局",id:"1"},
						{text:"格西沟保护局2",id:"2"},
						{text:"格西沟保护局3",id:"3"},
						{text:"格西沟保护局4",id:"4"},*/
					],
					second:[
					/*	{text:"格西沟管理站11",id:"22",belongto:"1"},
						{text:"格西沟管理站11",id:"22",belongto:"2"},
						{text:"格西沟管理站11",id:"22",belongto:"1"},
						{text:"格西沟管理站11",id:"22",belongto:"3"},
						{text:"格西沟管理站11",id:"22",belongto:"4"},*/
					],
					fnum:0,
					value2:"1",
					value3:"0",
					value4:"1.1",
					active:"active",
				}
			},
			mounted(){
				/*$("#MagOrg p").click(function(){
					if(!$(this).hasClass("active")){
						$("#MagOrg p").removeClass("active");
						$("#MagOrg p").next().slideUp();
						$(this).addClass("active");
						$(this).next().slideDown();
					}else{
						$(this).removeClass("active");
						$(this).next().slideUp();
					}
					
				})*/
			},
			methods:{
				fClick:function(index){
					
					this.fnum = index;
					
					/*$(this).addClass("active");
					if($(this).hasClass("active")){
						$(this).removeClass("active");
						if($(this).find("ul")){
							$(this).find("ul").slideUp();
							$(this).find(".active").removeClass("active");
						}
						
					}else{
						$(this).siblings().removeClass("active");
						$(this).addClass("active");
						if($(this).find("ul")){
							$(this).find("ul").slideDown();
						
						}
					}*/

				}
			},
	}
</script>

<style>
	/*次级选择列表*/
.main div.right_zero{
	height: 100%;
}
.main div.right_zero{
	height:100%;
}
.main .main_con div.table{
    margin-left: 10px;
    margin-bottom: 0px;
    height: calc(100% - 214px);
}
ul.MagOrg{
	list-style: none;
	margin:0px;
	padding:0px;
	color:#b9cdd7;
	width:95%;
	cursor:pointer;
	border-radius: 5px;
    overflow: hidden;
}
ul.MagOrg>li{
	background-color: #2a404e;
	margin-bottom:1px;
	line-height:2em;
}
ul.MagOrg>li p.active{
	background-color: #587081;
}
ul.childOrg{
/*	display: none;*/
	list-style: none;
	margin:0px;
	padding:0px;
	padding-left:32px;
	color:#b9cdd7;
	cursor:pointer;
	background-color:#223642;
}
ul.childOrg li{
	background-color:#223642;
}
ul.childOrg li.active{
	background-color:#587081;
}
ul.MagOrg li p {
	margin: 0px;
}
ul.MagOrg li span{
	display: block;
	float:left;
	height:16px;
	width:16px;
	margin-top:8px;
	background-size:contain;
	background-repeat: no-repeat;
	background-position: center;
}
ul.MagOrg li span.symbol{
	background-image: url(../../../assets/Manage/add.png);
	margin-left:1em;
}
ul.MagOrg li span.user{
	background-image: url(../../../assets/Manage/user.png);
}
ul.MagOrg li span.icon{
	background-image: url(../../../assets/Manage/to_right.png);
	height: 10px;
	width:10px;
	margin-top:12px;
}
.main .main_con div.table {
    padding: 10px;
    background-color: #1f2e3a;
}
.fade-enter-active, .fade-leave-active {
  transition: height 1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  height: 0.5s
}
</style>
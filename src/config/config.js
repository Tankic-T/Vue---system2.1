
const ServerUrl=function(){
	
	
	let obj={};
	let ip=window.location.hostname;
		let server;
		if(ip == '59.110.26.156'){
			
			obj.server="http://59.110.26.156:8091";
			obj.quit= "http://59.110.26.156:8090/html/platformCenter.html";
			
		}else if(ip == '101.200.232.210'){
			
			obj.server="http://101.200.232.210:8020";
			obj.quit= "http://101.200.232.210:8022/html/platformCenter.html";
			
		}else if(ip == '125.67.17.139'){
			
			obj.server = "http://125.67.17.139:8091";
			obj.quit = "http://125.67.17.139:8403/html/platformCenter.html";
		}
		else{
			
			obj.server="http://101.200.232.210:8020";
			obj.quit="http://101.200.232.210:8022/html/platformCenter.html";
			
		}
		return obj;
	
}();
export default{
	content:ServerUrl.server,
	quit:ServerUrl.quit,
}

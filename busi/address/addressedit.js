//获取页面传来的参数
		//页面初始化
		mui.init({
			swipeBack: true, //启用右滑关闭功能
		});
		init();
		
		//绑定事件
		document.getElementById("addressDefault").addEventListener('tap', function() {
			var requestJson = {
						data: {
							id: jQuery.url.param("addId")
						}
					};
					ajax.jsonpSyncRequest("address/setDefault.action", requestJson, function(json) {
						if(null == json || '' == json){
							return false;
						}
						
						ewing.toast("设置成功");
					});
		});
		
		document.getElementById("addAddress").addEventListener('tap', function() {
			//接收人
			if(null == $("#receiver").val() || '' == $("#receiver").val()){
				ewing.alert("提示", "接收人不能为空哦", null);
				return;
			}
			
			//电话
			if(null == $("#phone").val() || '' == $("#phone").val()){
				ewing.alert("提示", "电话不能为空哦", null);
				return;
			}
			
			//邮编
			if(null == $("#postCode").val() || '' == $("#postCode").val()){
				ewing.alert("提示", "邮编不能为空哦", null);
				return;
			}
			
			//省份
			if(null == $("#province").val() || '' == $("#province").val()){
				ewing.alert("提示", "省份不能为空哦", null);
				return;
			}
			
			//城市
			if(null == $("#city").val() || '' == $("#city").val()){
				ewing.alert("提示", "城市不能为空哦", null);
				return;
			}
			
			//地区
			if(null == $("#region").val() || '' == $("#region").val()){
				ewing.alert("提示", "地区不能为空哦", null);
				return;
			}
			
			//详细地址
			if(null == $("#address").val() || '' == $("#address").val()){
				ewing.alert("提示", "详细地址不能为空哦", null);
				return;
			}
			
			
			var requestJson = {
						data: {
							id: jQuery.url.param("addId"),
							receiver : $("#receiver").val(),
							phone : $("#phone").val(),
							postCode : $("#postCode").val(),
							province : $("#province").val(),
							city : $("#city").val(),
							region : $("#region").val(),
							address : $("#address").val()
						}
					};
					ajax.jsonpSyncRequest("address/save.action", requestJson, function(json) {
						if(null == json || '' == json){
							return false;
						}
						
						
						ewing.toast("保存成功");
					});
		});
		
			/**
			 * 页面拉新的具体操作
			 */
		function init(){
			var requestJson = {
				data: {
					id: jQuery.url.param("addId")
				}
			};
			ajax.jsonpSyncRequest("address/find.action", requestJson, function(json) {
				if(null == json || '' == json){
					return false;
				}
				
				$("#addressForm").loadTemplate($("#addressMsg"), json.result);
			});
			
			
			 //注意：若为ajax请求，则需将如下代码放在处理完ajax响应数据之后；
			mui.plusReady(function(){
			    //关闭等待框
			    plus.nativeUI.closeWaiting();
			    //显示当前页面
			    mui.currentWebview.show();
			});
			
			/**
			 * 省份处理选择
			 */
			var selects = $('select');
			for(var j=0; j<selects.length; j++){
				var provinceOpition = selects[j].find('option');
				for(var i=0; i<provinceOpition.length; i++){
					if(provinceOpition[i].val() == selects[j].val()){
						console.log("nna");
					}else{
						console.log("nnb");
					}
				}
			}
		}
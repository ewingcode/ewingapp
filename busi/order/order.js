//获取页面传来的参数
var orderId = jQuery.url.param("orderId");

var self = this;

//页面初始化
mui.init({
	swipeBack: true, //启用右滑关闭功能
});
init();


function init() {
	var requestJson = {
		data: {
			orderId: orderId
		}
	};
	ajax.jsonpSyncRequest("order/find.action", requestJson, function(json) {
		if (json.length == 0) {
			return false;
		}

		console.log(json.result.shopName);
		
		$("#payWayLi").loadTemplate($("#payWayLi"), json.result.payWay);
		$("#shopNameSpan").loadTemplate($("#shopNameFont"), json.result);
		$("#orderDiv").loadTemplate($("#orderLi"), json.result.list);
		
		
		self.analyseTotal();

		var minusPros = document.querySelectorAll('.minusProduct');
		for (var i = 0; i < minusPros.length; i++) {
			minusPros[i].addEventListener('tap', function() {
				var productNum = this.parentNode.querySelector(".productNum");
				if (productNum.value >= 1) {
					self.changeNum(this.parentNode, -1);
				} else {
					return;
				}
			});
		}
		
		var plusPros = document.querySelectorAll('.plusProduct');
		for (var i = 0; i < plusPros.length; i++) {
			plusPros[i].addEventListener('tap', function() {
				var productNum = this.parentNode.querySelector(".productNum");
				if (productNum.value >= 1) {
					self.changeNum(this.parentNode, 1);
				} else {
					return;
				}
			});
		}
		
		document.getElementById("confirmBtn").addEventListener('tap', function() {
		var pros = document.querySelectorAll('.product');
		var items = new Array();
		for(var i=0; i<pros.length ; i++){
			items.push({
				detailId : pros[i].getAttribute('detailId'),
				itemCount : pros[i].querySelector('.productNum').value
			});
		}
			
		var requestJson = {
			data: {
				list: items
			}
		};
		ajax.jsonpSyncRequest("order/confirm.action", requestJson, function(json) {
			if (json.length == 0) {
				return false;
			}
				
					
			
		});
	});	
	});

	
}

function analyseTotal(){
	var totalPrice = 0;
	var orderPrices = document.querySelectorAll('.orderPrice');
	for(var i=0; i<orderPrices.length; i++){
		totalPrice = totalPrice +  parseFloat(orderPrices[i].innerHTML);
	}
	document .getElementById("totalPrice").innerHTML = totalPrice.toFixed(2);
}

function changeNum(pNode, changeNum) {
	var productNum = pNode.querySelector(".productNum");
	productNum.value = parseInt(changeNum) + parseInt(productNum.value);
	var cargoFee = pNode.parentNode.parentNode.parentNode.querySelector(".cargoFee").innerHTML;
	var price = pNode.parentNode.parentNode.parentNode.querySelector(".price").innerHTML;
	var totalPrice = productNum.value * parseFloat(price);
	var orderPrice = totalPrice + parseFloat(cargoFee);
	pNode.parentNode.parentNode.parentNode.querySelector(".orderPrice").innerHTML = orderPrice.toFixed(2);
	self.analyseTotal();
}
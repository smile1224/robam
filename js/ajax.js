function ajaxGet(url,cb,data){
	data = data || {};
	var str = "";
	for(var i in data){
		str = str + i+"="+data[i]+"&";
	}
	var d = new Date();
	url = url + "?" + str + "__qft="+d.getTime();
	var xhr = new XMLHttpRequest();
	xhr.open("get",url,true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			cb(xhr.responseText);
		}
	}
	xhr.send();
}

function ajaxPost(url,cb,data){
	var str = "";
	for(var i in data){
		str += `${i}=${data[i]}&`;
	}
	str = str.slice(0,str.length-1)
	var ajax = new XMLHttpRequest();
	ajax.open("post",url,true);
	ajax.onreadystatechange = function(){
		if(ajax.readyState === 4 && ajax.status === 200){
			cb(ajax.responseText);
		}
	}
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax.send(str);



	
function jsonp(url,cb,data){
	data = data || {};
	var str = "";
	for(var i in data){
		str += `${i}=${data[i]}&`;
	}
	url = url + "?" + str;
	var script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
	window[data[data.colName]] = function(res){
		cb(res);
	}
}
}
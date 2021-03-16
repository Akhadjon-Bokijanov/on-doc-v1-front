var host = 'https://facturatest.yt.uz';
var username = 'onlinefactura';
var password = 'n;xw3CE(GDb$@|D*';

var timestamper = function (signature_hex, callback, fail) {
	$.ajax({
		url: host + '/provider/api/ru/utils/timestamp',
		method: 'GET',
		data: {
			signatureHex: signature_hex
		},
		xhrFields: {
			withCredentials: true
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(username+':'+password));
		},
		success: function (data) {
			if (data.success) {
				callback(data.data);
			} else {
				fail(data.reason);
			}
		},
		error: function (response) {
			fail(response);
		}
	});
};

var getId = function () {
	var id='';
	$.ajax({
		url: host + '/provider/api/ru/utils/guid',
		method: 'GET',
		async: false,
		xhrFields: {
			withCredentials: true
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(username+':'+password));
		},
		success: function (data) {
			id = data.data;
		}
	});
	return id;
};

var EIMZO_MAJOR = 3;
var EIMZO_MINOR = 37;

var errorCAPIWS = 'Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.';
var errorBrowserWS = 'Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.';
var errorUpdateApp = 'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>';
var errorWrongPassword = 'Пароль неверный.';


var AppLoad = function () {  
	EIMZOClient.API_KEYS = [
		'cabinet.onlinefactura.uz', 'F09A2CBE8EA25A5C065AF78D32F517B1DCF12E997575556CBD90B405A90420E6EB538FCCFFCBAA22C5D191CAB3803965621B023E8642F77F35DDA072FBA17914'
	];
	uiLoading();
	EIMZOClient.checkVersion(function(major, minor){
		var newVersion = EIMZO_MAJOR * 100 + EIMZO_MINOR;
		var installedVersion = parseInt(major) * 100 + parseInt(minor);
		if(installedVersion < newVersion) {
			uiUpdateApp();
		} else {
			EIMZOClient.installApiKeys(function(){
				uiLoadKeys();
			},function(e, r){
				if(r){
					uiShowMessage(r);
				} else {
					wsError(e);
				}
			});
		}
	}, function(e, r){
		if(r){
			uiShowMessage(r);
		} else {
			uiNotLoaded(e);
		}        
	});
}


var uiShowMessage = function(message){
	alert(message);
}

var uiLoading = function(){
	var l = document.getElementById('message');
	l.innerHTML = 'Загрузка ...';
	l.style.color = 'red';
}

var uiNotLoaded = function(e){    
	var l = document.getElementById('message');
	l.innerHTML = '';
	if (e) {
		wsError(e);
	} else {
		uiShowMessage(errorBrowserWS);
	}
}

var uiUpdateApp = function(){    
	var l = document.getElementById('message');
	l.innerHTML = errorUpdateApp;
}     

var uiLoadKeys = function(){
	uiClearCombo();
	EIMZOClient.listAllUserKeys(function(o, i){
		var itemId = "itm-" + o.serialNumber + "-" + i;
		return itemId;
	},function(itemId, v){
		return uiCreateItem(itemId, v);
	},function(items, firstId){        
		uiFillCombo(items);
		uiLoaded();
		uiComboSelect(firstId);
	},function(e, r){
		uiShowMessage(errorCAPIWS);
	});
}

var uiComboSelect = function(itm){
	if(itm){
		var id = document.getElementById(itm);   
		id.setAttribute('selected','true');
	}
}

var cbChanged = function(c){                
	document.getElementById('keyId').innerHTML = '';
}

var uiClearCombo = function(){    
	var combo = document.testform.key;
	combo.length = 0;
}

var uiFillCombo = function(items){    
	var combo = document.testform.key;
	for (var itm in items) {
		combo.append(items[itm]);
	}
}

var uiLoaded = function(){  
	var l = document.getElementById('message');
	l.innerHTML = '';
}

var uiCreateItem = function (itmkey, vo) {
	var now = new Date();
	vo.expired = dates.compare(now, vo.validTo) > 0;
	var itm = document.createElement("option");
	itm.value = itmkey;
	itm.text = vo.CN;
	if (!vo.expired) {
		
	} else {
		itm.style.color = 'gray';
		itm.text = itm.text + ' (срок истек)';
	}                
	itm.setAttribute('vo',JSON.stringify(vo));
	itm.setAttribute('id',itmkey);
	return itm;
}

var wsError = function (e) {    
	if (e) {
		uiShowMessage(errorCAPIWS + " : " + e);
	} else {
		uiShowMessage(errorBrowserWS);
	}
};

sign = function () {
	var itm = document.testform.key.value;
	if (itm) {                 
		var id = document.getElementById(itm);   
		var vo = JSON.parse(id.getAttribute('vo'));
		var data = document.testform.data.value;
		var keyId = document.getElementById('keyId').innerHTML;   
		if(keyId){
			EIMZOClient.createPkcs7(keyId, data, timestamper, function(pkcs7){
				document.testform.pkcs7.value = pkcs7;
			}, function(e, r){
				if(r){
					if (r.indexOf("BadPaddingException") != -1) {
						uiShowMessage(errorWrongPassword);
					} else {
						uiShowMessage(r);
					}
				} else {
					document.getElementById('keyId').innerHTML = '';
					uiShowMessage(errorBrowserWS);
				}
				if(e) wsError(e);
			});  
		} else {
			EIMZOClient.loadKey(vo, function(id){
				document.getElementById('keyId').innerHTML = id;
				EIMZOClient.createPkcs7(id, data, timestamper, function(pkcs7){
					document.testform.pkcs7.value = pkcs7;
				}, function(e, r){
					if(r){
						if (r.indexOf("BadPaddingException") != -1) {
							uiShowMessage(errorWrongPassword);
						} else {
							uiShowMessage(r);
						}
					} else {
						document.getElementById('keyId').innerHTML = '';
						uiShowMessage(errorBrowserWS);
					}
					if(e) wsError(e);
				});  
			}, function(e, r){
				if(r){
					if (r.indexOf("BadPaddingException") != -1) {
						uiShowMessage(errorWrongPassword);
					} else {
						uiShowMessage(r);
					}
				} else {
					uiShowMessage(errorBrowserWS);
				}
				if(e) wsError(e);
			});  
		}
	}
};

attachSign = function () {
	var itm = document.testform.key.value;
	if (itm) {                 
		var id = document.getElementById(itm);   
		var vo = JSON.parse(id.getAttribute('vo'));
		var data = document.testform.data.value;
		var keyId = document.getElementById('keyId').innerHTML;   
		if(keyId){
			EIMZOClient.appendPkcs7Attached(keyId, data, timestamper, function(pkcs7){
				document.testform.pkcs7.value = pkcs7;
			}, function(e, r){
				if(r){
					if (r.indexOf("BadPaddingException") != -1) {
						uiShowMessage(errorWrongPassword);
					} else {
						uiShowMessage(r);
					}
				} else {
					document.getElementById('keyId').innerHTML = '';
					uiShowMessage(errorBrowserWS);
				}
				if(e) wsError(e);
			});  
		} else {
			EIMZOClient.loadKey(vo, function(id){
				document.getElementById('keyId').innerHTML = id;
				EIMZOClient.appendPkcs7Attached(id, data, timestamper, function(pkcs7){
					document.testform.pkcs7.value = pkcs7;
				}, function(e, r){
					if(r){
						if (r.indexOf("BadPaddingException") != -1) {
							uiShowMessage(errorWrongPassword);
						} else {
							uiShowMessage(r);
						}
					} else {
						document.getElementById('keyId').innerHTML = '';
						uiShowMessage(errorBrowserWS);
					}
					if(e) wsError(e);
				});  
			}, function(e, r){
				if(r){
					if (r.indexOf("BadPaddingException") != -1) {
						uiShowMessage(errorWrongPassword);
					} else {
						uiShowMessage(r);
					}
				} else {
					uiShowMessage(errorBrowserWS);
				}
				if(e) wsError(e);
			});  
		}
	}
};

window.onload = AppLoad;
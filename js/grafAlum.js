var cv = document.getElementById('lienzo');
ctx = cv.getContext('2d');
var anio = document.getElementById('anio');

function miFuncion(ruta,fun,myArr2) {
	var xmlhttp = cargarXMLHttp();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			try {
				var myArr = JSON.parse(this.responseText);
				fun(myArr,myArr2);
			}catch(e) {
				console.error(e);
			}
		}else {
			console.warn('Hubo problemas');
		}
	};
	xmlhttp.open("GET", ruta, true);
	xmlhttp.send();
}
function carrera(carrera,myArr2) {
	miFuncion("json/grupo.json",desplegar,carrera);
}
function desplegar(alumn,carrera){
	var total = [];
	var tam = carrera.length;
	for (var i = 0; i < tam; i++) {
		total[i] = 0;
	}
	for (var i = 0; i < alumn.length; i++) {
		for (var j = 0; j < tam; j++) {
			if(alumn[i].carrera_id == carrera[j].id && alumn[i].anio == anio.value){
				total[j] += alumn[i].alumnos; 
			}
		}
	}
	
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,cv.width,cv.height);
    ctx.fillStyle = "black";
    ctx.moveTo(0,cv.height-20);
	ctx.lineTo(cv.width ,cv.height-20);
	ctx.stroke();
	num = 0;
	for (var i = 0; i < 33; i++) {
		ctx.fillText(num,29*i,cv.height-10);
		num+=20;
	}
	ctx.font = "12px Arial";
	ctx.fillText(carrera[0].nombre,10,10);
	for (var i = 1; i < total.length; i++) {
		ctx.fillText(carrera[i].nombre,10,(18.5*i)+10);
	}
	ctx.fillStyle = "rgba(0,0,255,0.4)";
	ctx.fillRect(0,0,total[0]*1.4,12);
	for (var i = 1; i < total.length; i++) {
		ctx.fillRect(0,(18.5*i),total[i]*1.4,12);
	}
	anio.addEventListener("change",function(){
		miFuncion("json/grupo.json",desplegar,carrera);
	});
}
window.addEventListener("load",function(){
	ctx.moveTo(0,cv.height-20);
	ctx.lineTo(cv.width ,cv.height-20);
	ctx.stroke();
	num = 0;
	for (var i = 0; i < 33; i++) {
		ctx.fillText(num,29*i,cv.height-10);
		num+=20;
	}
	miFuncion("json/carrera.json",carrera,0);


});
function cargarXMLHttp() {
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	try {
	xmlhttp.responseType="msxml-document"   //Microsoft XML Core Services 
	} 
	catch(err) {
	} // Helping IE
	return xmlhttp;
}
function e() {
	nArg = arguments.length;
	if(nArg > 0){
		var elemt = document.createElement(arguments[0]);
		for(var i = 1 ; i < nArg; i++){
			var argm = arguments[i];
			var tipo = typeof(argm);
			if(tipo == "string"){
				var texto = document.createTextNode(argm);
					elemt.appendChild(texto);
			}
			else if(argm != '[object HTMLUnknownElement]'){
				for (attr in argm) {
						if(typeof(argm[attr]) == "function"){
							elemt.addEventListener(attr, argm[attr]);
						}else{
    						elemt.setAttribute(attr,argm[attr]);
    					}
					}
			}
			else{
				elemt.appendChild(argm);	
			}	
		}
						
	}
		return elemt;
}

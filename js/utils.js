var inst = document.getElementById('inst');
var prof = document.getElementById('profes');
var inf = document.getElementById('datos');
var gra = ["Licenciado/Ingeniero", "Maestría"," Doctorado"]
var acti = ["Activo","Sabatico","licencia", "Ya no labora en la universidad"];
function miFuncion(ruta,fun,id) {
	var xmlhttp = cargarXMLHttp();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			try {
				var myArr = JSON.parse(this.responseText);
				fun(myArr,id);
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
function arreglo1(myArr,id) {
	for(var i = 0; i < myArr.length; i++){
		var elemt = e("option",myArr[i].nombre,{"value":myArr[i].id});
        inst.appendChild(elemt);	
    }
}
function arreglo2(myArr,id) {
	prof.innerHTML = "";
	for(var i = 0; i < myArr.length; i++){
        if(inst.value == myArr[i].instituto_id){
        	var elemt = e("li",myArr[i].nombres + " " + myArr[i].apellidos,{"value":myArr[i].id});
			prof.appendChild(elemt);
    	}
	}
}
function arreglo3(myArr,id) {
	inf.innerHTML = "";
	for(var i = 0; i < myArr.length; i++){
		if(id == myArr[i].id){
        		var elemt = e("li","ID : "+id);
        		inf.appendChild(elemt);
        		elemt = e("li","Nombre(s) : "+myArr[i].nombres);
        		inf.appendChild(elemt);
        		elemt =	e("li","Apellido(s): "+myArr[i].apellidos);
        		inf.appendChild(elemt);
        		elemt =	e("li","Insituto: "+inst.options[inst.selectedIndex].text);
        		inf.appendChild(elemt);
        		elemt =	e("li","Correo: "+myArr[i].correo);
        		inf.appendChild(elemt);
        		elemt =	e("li","Grado: "+gra[myArr[i].grado-1]);
        		inf.appendChild(elemt);
        		miFuncion("json/carrera.json",car,myArr[i].carrera_id);
        		elemt =	e("li","Estado: "+acti[myArr[i].activo-1]);
        		inf.appendChild(elemt);
        		break;
        }
    }
}
function car(myArr,id) {
	for(var i = 0; i < myArr.length; i++){
        if(id == myArr[i].id ) {
        	var elemt =	e("li","Carrera: "+myArr[i].nombre);
        	inf.appendChild(elemt);
        	break;
    	}
	}
}
window.addEventListener("load",function(){
		var ruta = "json/instituto.json";

		miFuncion(ruta,arreglo1,0);
		
        inst.addEventListener("change",function() {
        	ruta = "json/profesor.json";
        	miFuncion(ruta,arreglo2,0);
        });

        prof.addEventListener("click",function(event){
        	ruta = "json/profesor.json";
        	document.getElementById('inf').style.display = "block";
        	var target = event.target || event.srcElement;
        	var id = event.target.value;
        	miFuncion(ruta,arreglo3,id);
        });
    });

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
/*function $(id) {
	var r = null;
	if (typeof(id) == "array") {
		r = id.map($);
	}else{
		r.document.getElementById(id);
	}
	return r;
}*/

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

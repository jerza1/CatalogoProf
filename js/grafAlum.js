window.addEventListener("load",function() {
	var cv = document.getElementById('lienzo');
	ctx = cv.getContext('2d');
	var anio = document.getElementById('lista');

	miFuncion("json/carrera.json",carrera,0);

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

	function desplegar(alumn,carrera) {
		var total = [];	var nombres = []; var tam = carrera.length;

		for (var j = 0; j < tam; j++) {
			if( carrera[j].tipo == 1){
				nombres.push(carrera[j].nombre);
				for (var i = 0,cont = 0; i <  alumn.length; i++) {
					if(alumn[i].periodo == 'A' || alumn[i].periodo == 'B'){
						if(alumn[i].carrera_id == carrera[j].id && alumn[i].anio == anio.value){
							cont += alumn[i].alumnos; 
						}
					}
				}
				total.push(cont);
			}
		}

		cuadricula();

		ctx.font = "14px Arial";
		ctx.fillText(nombres[0],10,15);
		for (var i = 1; i < nombres.length; i++) {
			ctx.fillText(nombres[i],10,(32*i)+15);
		}

		ctx.fillStyle = "rgba(0,0,255,0.4)";
		ctx.fillRect(0,0,(total[0]/2)*2,20);
		for (var i = 1; i < total.length; i++) {
			ctx.fillRect(0,(32*i),(total[i]/2)*2,20);
		}

		anio.addEventListener("change",function() {
			miFuncion("json/grupo.json",desplegar,carrera);
		});
	}

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

	function cuadricula() {
		borrar();
		ctx.save();
		ctx.font = "12px Arial";
		ctx.moveTo(0,cv.height-20);
		ctx.lineTo(cv.width ,cv.height-20);
		ctx.stroke();
		var num = 20;
		ctx.fillText(0,1,cv.height-10);
		ctx.beginPath();
		for (var i = 1; i < 17; i++) {
			ctx.fillText(num,(40*i)-12,cv.height-10);
			ctx.moveTo(i*40,0);
			ctx.lineTo(i*40,cv.height-20);
			num+=20;
		}
		ctx.stroke();
		ctx.restore();
	}

	function borrar(argument) {
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,cv.width,cv.height);
		ctx.fillStyle = "black";
	}
});
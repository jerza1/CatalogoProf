window.addEventListener("load",function(){
	miFuncion("json/instituto.json",profes,0);
	var cv;
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
	function profes(inst,myArr2) {
		miFuncion("json/profesor.json",desplegar,inst);
	}
	function desplegar(profes,inst){
		var total = [];
		var tam = inst.length;
		for (var i = 0; i < tam; i++) {	total[i] = 0;	}

			for (var i = 0; i < profes.length; i++) {
				for (var j = 0; j < tam; j++) {
					if(profes[i].instituto_id == inst[j].id){
						total[j] += 1; 
					}
				}
			}
			cv = document.getElementById('lienzo');
			ctx = cv.getContext('2d');
			cuadricula();

			ctx.font = "15px Arial";
			ctx.fillText(inst[0].nombre,10,15);
			for (var i = 1; i < total.length; i++) {
				ctx.fillText(inst[i].nombre,10,(35*i)+15);
			}
			ctx.fillStyle = "rgba(0,0,255,0.4)";
			ctx.fillRect(0,0,total[0]*13,25);
			for (var i = 1; i < total.length; i++) {
				ctx.fillRect(0,(35*i),total[i]*13,25);
			}
	}
	function cargarXMLHttp() {
		if(window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		try {
		    xmlhttp.responseType="msxml-document"   //Microsoft XML Core Services 
	    } 
	    catch(err) {
		} // Helping IE
		return xmlhttp;
	}
	function cuadricula(){
		ctx.save();
		ctx.moveTo(0,cv.height-30);
		ctx.lineTo(cv.width ,cv.height-30);
		ctx.stroke();
		num = 0;
		ctx.beginPath();
		for (var i = 0; i < 10; i++) {
			ctx.fillText(num,65*i,cv.height-20);
			ctx.moveTo(i*65,0);
			ctx.lineTo(i*65,cv.height-30);
			num+=5;
		}
		ctx.stroke();
		ctx.restore();
	}
});
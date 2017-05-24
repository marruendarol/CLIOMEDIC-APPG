/**********************************************************
*	LIST CONTROLLER
***********************************************************/

var ctrl_personales = {
	data : {},
	pageDiv : "#personalesP",

	init : function(data,template){

		console.log(data,"PERSONALES")
		ctrl_personales.data = data;
		ctrl_personales.render();
	},
	render : function(){

		var data  = paramsSuc.data 

		var curp = data.info.curp;

		var anio = curp.substr(4,2);
        var mes = curp.substr(6,2);
        var dia = curp.substr(8,2);

		var sexoChar = curp.substr(10,1).toUpperCase();
        if(sexoChar=="H") { sexo="Hombre"} else { sexo="Mujer"}
        if (anio > 20) {anio = "19" + anio;}else{anio = "20" + anio;}
        var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var fecha1 = new Date( anio+ "-" + mes+ "-" + dia);

                var info = data.info;
                  info.id = data._id
                  info.uid = data.uid;
                  info.edad = calculaEdad(fecha1);
                  info.fechaNacimiento = dia+"-"+meses[parseInt(mes-1)]+"-"+anio;
                  info.sexo = sexo
                
                 console.log(info,"INFO")

		var mainObj = template.render('#personalesT',ctrl_personales.pageDiv,info)
		$(ctrl_personales.pageDiv).trigger("create");

		$("#table_personales tr:odd").css('background-color', 'rgb(223, 223, 223)'); 

		var  myScroll = new IScroll('#wrapperInfo',{  
		 	click:true,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })


		setTimeout(function(){ myScroll.refresh() }, 500);
		
	
	}
}



function calculaEdad(fecha) {
    fecha1 = new Date(fecha);
    hoy = new Date();
    ed = parseInt((hoy - fecha1) / 365 / 24 / 60 / 60 / 1000);
    return ed;
};

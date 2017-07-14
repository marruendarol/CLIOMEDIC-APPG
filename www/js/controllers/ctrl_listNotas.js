/**********************************************************
*	LIST CONTROLLER
***********************************************************/

distVis = false;
titleList = "Notas de evolución";
var spec = "";

var ctrl_listNotas = {
	data : {},
	pageDiv : "#listNotasP",
	init : function(data,template){
		console.log('EXPSEC')
		ctrl_listNotas.data = data;
		$(ctrl_listNotas.pageDiv).empty();

			 titleList="Sin datos";
			 distVis=true;

			 ctrl_listNotas.curp = paramsSuc.data.info.curp


			 ctrl_listNotas.render()
			

	},

	render : function(){

		$('#titleList').text("Notas de evolución")
		
		datosNotas = {};

		ctrl_listNotas.mainObj = template.render('#listNotasT',ctrl_listNotas.pageDiv,datosNotas)

		$(ctrl_listNotas.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		 myScroll = new IScroll('#wrapperList',{  
		 	click:true,useTransition:true,scrollbars:scrolls,
		 	disablePointer: true, 
			disableTouch: false, 
			disableMouse: false, 
		 	nmouseWheel:true,interactiveScrollbars: true })

		ctrl_listNotas.mainObj.on('clickSecc',function(e){
			//mainC.clickAnim(e.node)
			paramsNota = { data : e.context }
			$.mobile.changePage( "#notaDet");
			
		})	

		ctrl_listNotas.getData();	

	},
	getData : function(){
		dbC.query('paciente/getHistoriaNotas','POST', {curp:ctrl_listNotas.curp}, ctrl_listNotas.dataResponse);
	},
	dataResponse : function(response){
			ctrl_listNotas.mainObj.set('data', response);	
	}
}
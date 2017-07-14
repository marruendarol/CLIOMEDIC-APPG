/**********************************************************
*	LIST CONTROLLER
***********************************************************/

var ctrl_antecedentes = {
	data : {},
	pageDiv : "#antecedentesP",

	init : function(data,template){

		console.log(data,"PERSONALES")
		ctrl_antecedentes.data = data;
		ctrl_antecedentes.render();
	},
	render : function(){

		var data  = paramsSuc.data 

		 var info = data.info;
		 	info.antecedentes = data.antecedentes;

		var mainObj = template.render('#antecedentesT',ctrl_antecedentes.pageDiv,info)
		$(ctrl_antecedentes.pageDiv).trigger("create");

		var  myScroll = new IScroll('#wrapperInfo',{  
		 	click:true,scrollbars:scrolls,mouseWheel:true,
		 	disablePointer: true, // important to disable the pointer events that causes the issues
						disableTouch: false, // false if you want the slider to be usable with touch devices
						disableMouse: false, // false if you want the slider to be usable with a mouse (desktop)
					 interactiveScrollbars: true, 
		 	interactiveScrollbars: true })

		$("#table_antecedentes tr:odd").css('background-color', 'rgb(223, 223, 223)'); 

		setTimeout(function(){ myScroll.refresh() }, 500);
		
	
	}
}


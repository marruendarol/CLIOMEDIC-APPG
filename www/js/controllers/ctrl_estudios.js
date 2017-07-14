/**********************************************************
*	LIST CONTROLLER
***********************************************************/

var ctrl_estudios = {
	data : {},
	pageDiv : "#estudiosP",

	init : function(data){
		dbC.query('paciente/getEstudios','POST',{ curp:paramsSuc.data.info.curp }, ctrl_estudios.estudiosRet);
	},
	estudiosRet : function(response){
		

					var data  = paramsSuc.data 
	
					data.estudiosA = response || [];
					//data.estudiosE.sort(utils.sortobjkey('fecha'))
					data.estudiosA.reverse()

					console.log(data,"DATA")

					var mainObj = template.render('#estudiosT',ctrl_estudios.pageDiv,data)
					$(ctrl_estudios.pageDiv).trigger("create");

					var  myScroll = new IScroll('#wrapperInfo',{  
					 click:true,scrollbars:scrolls,mouseWheel:true,
					 	disablePointer: true, // important to disable the pointer events that causes the issues
						disableTouch: false, // false if you want the slider to be usable with touch devices
						disableMouse: false, // false if you want the slider to be usable with a mouse (desktop)
					 interactiveScrollbars: true })


					setTimeout(function(){ myScroll.refresh() }, 500);

					
				$( '.swipebox' ).swipebox();

			
	}

}


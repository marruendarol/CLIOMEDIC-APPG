/**********************************************************
*	LIST CONTROLLER
***********************************************************/

distVis = false;
titleList = "Expedientes Abiertos";
var spec = "";
var expInt;
var pacs = []
var currList = [];

var ctrl_list = {
	data : {},
	pageDiv : "#listPCont",
	init : function(data,template){
		console.log('LOGER')
		ctrl_list.data = data;
		$(ctrl_list.pageDiv).empty();
		

		console.log(paramsPage)

		switch(paramsPage.type){
			case "exp" : titleList="Expedientes";distVis=false;ctrl_list.exp(paramsPage.id);break;
			case "pacientes" : titleList="Pacientes";distVis=true;ctrl_list.getPacientes();break;
			
		}
	//--------------------------------------------ZONA
	},
	exp : function(id){

		currList = [];
		pacs = [];

	
		 
		socket.removeListener('opened'+userRoom,ctrl_list.expResponse);
        socket.on('opened'+userRoom, ctrl_list.expResponse);
        console.log("Regreso socket")
        expInt =  setInterval(function(){currList=[];pacs=[];ctrl_list.render(pacs)},15000)

        ctrl_list.render(pacs)
	},
	expResponse : function(response){
		if(currList.indexOf(response.curp)==-1){
		  			currList.push(response.curp)
		  			pacs.push(response)
		  		}else{
		  			pacs[currList.indexOf(response.curp)].time = response.time;
		  		}           
        
		// Check Time

		

        ctrl_list.render(pacs)
	},
	//------------------------------------------ESPECIALIDAD
	getPacientes : function(id){

		jqm.showLoader("Cargando pacientes...")
		clearInterval(expInt);
		expInt = null;
		socket.removeListener('opened'+userRoom,ctrl_list.expResponse);
		socket.removeListener('getPacientes');
        socket.on('getPacientes', function(response){
            
        	var pacs = response
            console.log(response,"respuesta de pacientes")

            var data = { pacientes : response };
            //ctrl_pacienteM.RS = Defiant.getSnapshot(response);
            //ctrl_pacienteM.rObj.set('pacientes', data);
            //createGrowl("App info","Registro Actualizado con éxito.",false,'bg_ok');
            jqm.hideLoader();
             ctrl_list.renderPacientes(pacs)

        });

        console.log("triendo pacientes")

        socket.emit('getPacientes',{room:userRoom});
	},
	//------------------------------------------LISTADO DE DESCUENTOS
	//-----------------------------------------------------------
	render : function(data){


		jqm.hideLoader();

		
		
		var datar = { 
			items  : data,
					distVis : distVis,
					empty 	: (data.length==0 ? true : false),
					img 		: "noimage.png",
			}

		$('#titleList').text(titleList)

		ctrl_list.mainObj = template.render('#listT',ctrl_list.pageDiv,datar)

		ctrl_list.mainObj.on('listDetail',function(event){
			
			mainC.clickAnim(event.node)
			paramsSuc = { data : event.context }
			$.mobile.changePage( "#infoSuc");
		});

		$(ctrl_list.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		 myScroll = new IScroll('#wrapperList',{  
		 	click:true,useTransition:true,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })

		 ctrl_list.mainObj.on('openLink',function(event){
				window.open(event.context.urlLink, '_system')
			});
		
	

	},
	renderPacientes : function(data){


		jqm.hideLoader();

		
		
		var datar = { 
			items  : data,
					distVis : distVis,
					empty 	: (data.length==0 ? true : false),
					img 		: "noimage.png",
			}

		$('#titleList').text(titleList)

		ctrl_list.mainObj = template.render('#listTP',ctrl_list.pageDiv,datar)

		ctrl_list.mainObj.on('listDetail',function(event){
			
			mainC.clickAnim(event.node)
			paramsSuc = { data : event.context }
			$.mobile.changePage( "#expedientSec");
			//ctrl_list.renderSeccs(event.context);
		});

		$(ctrl_list.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		 myScroll = new IScroll('#wrapperList',{  
		 	click:true,useTransition:true,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })

		 ctrl_list.mainObj.on('openLink',function(event){
				window.open(event.context.urlLink, '_system')
			});
		
	

	},
	renderSeccs : function(data){
		$('#titleList').text("Expediente")
		console.log("render Seccs ")
		var datar = {
			nombre : data.info.nombre,
			items: [{secname:"Datos personales",id:0},
					{secname:"Antecedentes",id:1},
					{secname:"Estudios",id:2},
					{secname:"Histórico de notas",id:3}
				]
		}





		ctrl_list.mainObj = template.render('#seccsExp',ctrl_list.pageDiv,datar)

		$(ctrl_list.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		 myScroll = new IScroll('#wrapperList',{  
		 	click:true,useTransition:true,scrollbars:scrolls,mouseWheel:true,interactiveScrollbars: true })

		ctrl_list.mainObj.on('clickSecc',function(e){
			console.log(e.context,"CONTEXTO")
		})		

	}
}
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
		pacs = [];
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
		clearInterval(expInt);
		expInt = null;
		 expInt =  setInterval(function(){
		 	currList = [];
		pacs = [];
		 	dbC.query('paciente/readOpen','POST', {}, ctrl_list.expResponse);
		 },10000)

		ctrl_list.render(pacs)
  		dbC.query('paciente/readOpen','POST', {}, ctrl_list.expResponse);
	},
	expResponse : function(response){
		console.log(response,"RESPONSE EXPS")
			for (var i = response.length - 1; i >= 0; i--) {
				pacs.push(response[i])
			}

        	ctrl_list.render(pacs)
	},
	//------------------------------------------ESPECIALIDAD
	getPacientes : function(id){

		jqm.showLoader("Cargando pacientes...")
		clearInterval(expInt);
		expInt = null;
		dbC.query('paciente/getPacientes','POST', {}, ctrl_list.pacientesRet);
	},
	pacientesRet : function(response){
        
         ctrl_list.renderPacientes(response)

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
			console.log(event.context,"context")
			mainC.clickAnim(event.node)
			paramsSuc = { data : event.context }
			$.mobile.changePage( "#infoSuc");
		});

		$(ctrl_list.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		 myScroll = new IScroll('#wrapperList',{  
		 	click:true,
		 	useTransition:true,
		 	scrollbars:scrolls,
		 	mouseWheel:true,
		 	disablePointer: true, // important to disable the pointer events that causes the issues
disableTouch: false, // false if you want the slider to be usable with touch devices
disableMouse: false, // false if you want the slider to be usable with a mouse (desktop)
		 	interactiveScrollbars: true })

		 ctrl_list.mainObj.on('openLink',function(event){
				window.open(event.context.urlLink, '_system')
			});
		
	

	},
	renderPacientes : function(data){

		clearInterval(expInt);

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
		 	click:true,useTransition:true,scrollbars:scrolls,mouseWheel:true,
		 	interactiveScrollbars: true,
		 		disablePointer: true, // important to disable the pointer events that causes the issues
disableTouch: false, // false if you want the slider to be usable with touch devices
disableMouse: false, // false if you want the slider to be usable with a mouse (desktop)

		 	 })

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
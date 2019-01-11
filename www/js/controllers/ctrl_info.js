/**********************************************************
*	LIST CONTROLLER
***********************************************************/

var ctrl_info = {
	data : {},
	pageDiv : "#infoSucP",

	init : function(data,template){
		ctrl_info.data = data;
		ctrl_info.getExp();
	},
	getExp : function(){
		dbC.query('paciente/getDetalleNota','POST', {data:paramsSuc.data.expId }, ctrl_info.retExp);
	},
	retExp : function(response){
		ctrl_info.expData = response[0];
		ctrl_info.render();
	},
	render : function(){


		data  = ctrl_info.expData
		data.cargas = [{nombre:"ESTDS",desc:"Archivos EST",folder:"estudios"}];
				
		console.log(data,"FCGH")		

		var mainObj = template.render('#infoT',ctrl_info.pageDiv,{data:data})
		$(ctrl_info.pageDiv).trigger("create");

		mainObj.on('genMap',function(event){
			console.log(event.context)
			mapaObj = event.context;
			$.mobile.changePage( "#mapa");
			//window.location = "#mapa"
		})

	

		mainObj.on('selectFileDoc',function(event){
			console.log(event.context.nombre)
            ctrl_uploadRack.callback = ctrl_info.uploadCallBack;

             navigator.camera.getPicture(uploadPhoto, function(message) {
			alert('get picture failed');
			},{
				quality: 50, 
				destinationType: navigator.camera.DestinationType.DATA_URI,
				sourceType: navigator.camera.PictureSourceType.CAMERA
			});


        });

        mainObj.on('removeEstudio',function(event){
	          var con = confirm('Quiere eliminar el documento  '+event.context.idDoc+' permanentemente?');
            if(con === true) {
				var num  = event.index.num;
				that.estudiosE.splice(num, 1);
				var dato = {};
				dato.estudiosE = that.estudiosE;

				dbC.query('paciente/updateExp','POST', {data : dato,_id:paramsSuc.data.expId }, null);

				
			}
		});

        ctrl_info.uploadCallBack = function(response){
           
           console.log(response,"responset",ctrl_info.data)
           profilePic =  response;
			
			var valor = parseInt(Math.random(1000000)*100000000);
			
		
			data.estudiosE.push({idDoc: 'CDOC-'+valor, documento: profilePic.response, fecha: new Date()});

			
			var dato = {};
			//dato.estudiosE = estudiosE;
			var datoW = {}
			datoW.estudiosE = data.estudiosE;
			mainObj.set('estudiosE',data.estudiosE);
			dbC.query('paciente/updateExp','POST',{data : datoW,_id:paramsSuc.data.expId }, ctrl_info.updRet);
			//dbC.query('paciente/getExpediente','POST', {curp:paramsSuc.data.curp }, ctrl_info.updRet);
			
			
        };


		var  myScroll = new IScroll('#wrapperInfo',{  
		 	click:true,scrollbars:scrolls,mouseWheel:true,
		 	 	disablePointer: true, // important to disable the pointer events that causes the issues
				disableTouch: false, 
				disableMouse: false, 
		 		interactiveScrollbars: true })


		
		
		$( '.swipebox' ).swipebox();


		setTimeout(function(){ myScroll.refresh() }, 500);
	},

	updRet : function(){
		console.log("pasando en regreso")
		try { jqm.hideLoader(); } catch (e){};
	}
}



function uploadPhoto(imageURI) {

			jqm.showLoader("Subiendo imagen...")
            var options = new FileUploadOptions();
            options.chunkedMode = false;
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            options.headers = {
				    Connection: "close"
				};

  
 
            var params = new Object();
            options.folder = "estudios";
            options.fileName = utils.generateUUID();
            options.fileExtension = "jpg";
 
            options.params = params;
           

            var ft = new FileTransfer();
            var params = "folder=" + 'estudios' + "&fileName=" +  options.fileName + "&fileExtension=." + options.fileExtension ;
            ft.upload(imageURI, 'https://plus.cliomedic.com:3030' + "/user/uploadRackspaceMobile?" + params, 
            	function(response){ctrl_info.uploadCallBack(response)}, 
            	function(response){console.log("fail",response)}, options,true);
        }


/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/
descVar = ""

var ctrl_home = {
	data : {},
	pageDiv : "#mainScreen",
	init : function(data,template){
		ctrl_home.data = data;
		ctrl_home.render();
	},
	render : function(){

		$(ctrl_home.pageDiv).empty();

		ctrl_home.data  = {
			userData : {
				nombre 		: window.localStorage.getItem("nombre"),
			},
			img 		: "noimage.png",
		}

		ctrl_home.mainObj = template.render('#mainT',ctrl_home.pageDiv,ctrl_home.data,null,{menuT : $('#menuT').html()})			

		$(ctrl_home.pageDiv).trigger("create");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		ctrl_home.mainObj.on('getExp',function(event){
			
			mainC.clickAnim(event.node)
			paramsPage = { id : event.context._id, type: "exp" }
			console.log("entro cercas")
			$.mobile.changePage("#list");
		})

		ctrl_home.mainObj.on('getPacientes',function(event){
			
			mainC.clickAnim(event.node)
			paramsPage = { id : event.context._id, type: "pacientes" }
			$.mobile.changePage("#list");
		})

		ctrl_home.mainObj.on('getCalendar',function(event){
			mainC.clickAnim(event.node)
			paramsPage = { id : event.context._id, type: "calendar" }
			$.mobile.changePage("#calendar");
		});

		ctrl_home.mainObj.on('cerrarsesion',function(event){
			mainC.clickAnim(event.node)
			localStorage.clear();
			$.mobile.changePage("#login");
		});


	}
}


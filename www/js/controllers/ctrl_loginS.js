/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/


var userRoom = "";


var ctrl_loginS = {
	data : {},
	pageDiv : "#loginP",
	init : function(data,template){
		ctrl_loginS.data = data;
		ctrl_loginS.render();
	},
	render : function(){


		$(ctrl_loginS.pageDiv).empty();
		var mainObj = template.render('#loginT',ctrl_loginS.pageDiv,{},null)

		$(document).on('focus', 'input, textarea', function() {
	  try {
		   $("#logoLoginB").hide(); } catch (e) {}
		});

		$(document).on('blur', 'input, textarea', function() {
			try {
		    $("#logoLoginB").show();
		    } catch (e) {}
		});

		mainObj.on('ingresar',function(){
			var user = $('#name').val();
			var pass = $('#password').val();
			jqm.showLoader("ingresando...");
			ctrl_loginS.checkLogin({username:user,password:md5(pass)})
		});

			mainObj.on('cancelar',function(){
			$.mobile.changePage("#login");
		});



		$(ctrl_loginS.pageDiv).trigger("create");

	},
	checkLogin : function(data){

		
        $.ajax({
            type: 'POST',
            data: data,
            url: serverURL + '/user/acceso',
            dataType: 'JSON'
            }).done(function( response ) {
              	
            	if(response.info!="-1"){
            		userdata = response.info
            		userRoom = response._id;
            		window.localStorage.setItem("username", response.info.username);
            		window.localStorage.setItem("password", response.info.passwordPlain);
            		window.localStorage.setItem("nombre", response.info.nombrecompleto);

            		$.mobile.changePage("#mainScreen")
            	}else{
            		jqm.popup( {text:"Usuario y/o contraseña inválido",title:"Ingreso"})
            		jqm.hideLoader();
            		//$.mobile.changePage( "#login", {});
            	}
            	
        }).fail(function( response, status ,a ) {
	       console.log(response,status,a)
	    });   

    },
	
}
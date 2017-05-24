/**********************************************************
*	MAIN SCREEN CONTROLLER
***********************************************************/

var socket; 
var userRoom = "";


var ctrl_loginS = {
	data : {},
	pageDiv : "#loginP",
	init : function(data,template){
		ctrl_loginS.data = data;

		var username= window.localStorage.getItem("username");
			if(username!=undefined){
				$.mobile.changePage("#mainScreen")
			}else{
				ctrl_loginS.render();
			}


		
	},
	render : function(){



		$(ctrl_loginS.pageDiv).empty();

		var mainObj = template.render('#loginT',ctrl_loginS.pageDiv,{},null)

		mainObj.on('ingresar',function(){
			var user = $('#name').val();
			var pass = $('#password').val();
			jqm.showLoader("ingresando...");
			ctrl_loginS.checkLogin({username:user,password:md5(pass)})
		});

			mainObj.on('cancelar',function(){
			$.mobile.changePage( "#mainScreen");
		});



		$(ctrl_loginS.pageDiv).trigger("create");

	},
	checkLogin : function(data){

		console.log(serverURL,"SERVER URL")
        $.ajax({
            type: 'POST',
            data: data,
            url: serverURL + '/user/acceso',
            dataType: 'JSON'
            }).done(function( response ) {
            	console.log(response,"RESPUESTA ACCESO")
              	jqm.hideLoader();
            	if(response.info!="-1"){
            		userdata = response.info
            		userRoom = response._id;
            		window.localStorage.setItem("username", response.info.username);
            		window.localStorage.setItem("password", response.info.passwordPlain);
            		window.localStorage.setItem("nombre", response.info.nombrecompleto);
    				ctrl_loginS.initSocket()
            		ctrl_loginS.changePage();	
            	}else{
            		jqm.popup( {text:"Usuario y/o contraseña inválido",title:"Error."})
            		$.mobile.changePage( "#firstP", {});
            	}
            	
        }).fail(function( response, status ,a ) {
	       console.log(response,status,a)
	    });   
	},
	initSocket : function(){
		console.log("iniciando socket")
		socket = io('https://cliomedic.com/cliomedic');
		//socket = io(serverURL + '/cliomedic');
    	socket.on('connect', function () { 
    		//console.log("connecting remote",userRoom)
    		socket.emit('create',userRoom);  

    		socket.on('joined', function(response){
    			//console.log("4- Socket join")
    			console.log("Group info","Conectado a cliomedic",false,'bg_ok','conn');
      		});

	        socket.on('reconnect_error', function(err) {  //Fired upon a reconnection attempt error.Parameters:
	        	console.log(err)
	        	console.log("App info","No se pudo reconectar al servidor.",false,'bg_error','errorreconexion');
	        });

	         socket.on('error', function(err) {  // Fired upon a connection error
	        	console.log("App info","Error de conección. intentando reconectar...",false,'bg_error',"errorconexion");
	        });

	        socket.on('reconnect', function(err) {  //Fired upon a reconnection 
	        	console.log("App info","Reconectado a servidor...",false,'bg_ok','reconectado');
	            
	        });
    	});
    },
	changePage : function(){
		$.mobile.changePage( "#mainScreen", {});
	}
}
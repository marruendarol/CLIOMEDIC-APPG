/**********************************************************
*	MAIN CONTROLLER
***********************************************************/
//keytool -genkey -v -keystore com.cliomedic.keystore -alias cliomedic -keyalg RSA -keysize 2048 -validity 1000000

 //jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore com.cliomedic.keystore android-release-unsigned.apk cliomedic

 // zipalign -v 4 android-release-unsigned.apk releaseCliomedic.apk 

var userLat = 20.6596
var userLng = -103.3496
var serverURL = "https://cliomedic.com/";
//var serverURL = "http://192.168.100.15:3030";
var paramsPage = {}
var scrolls = false;

var mainC = {
	init: function(callback){
		mainC.initFoundation();
		mainC.loadTemplateFile(callback)
	},
	initFoundation : function(){
		$(document).foundation();
		$(document).foundation('alert','events');

		// Abide Validation
		$(document).foundation('abide', {
	      patterns: {
	        short_field: /^.{,40}$/,
	        long_field: /^.{,72}$/
	      }
    	}); 
	},
	loadTemplateFile: function(callback){
		$("#templateLoader").load("./templates/views.html",function(){
			callback();
		}); 
	},
	comboArray : function(extra){
		$(extra.div).append('<option value="" disabled selected>'+extra.placeholder+'</option>')
		for (var a in extra.arr){
			$(extra.div).append('<option value="'+ extra.arr[a][extra.value] +'">' + extra.arr[a][extra.label] +'</option>')
		}
		if(extra.defaultVal!=null){
			$(extra.div).val(extra.defaultVal);
		}
	},
	clickAnim : function(el){
		$(el).animate({backgroundColor: '#666'},200, function(){ $(el).animate({backgroundColor: '#000'}, 'slow', function(){  }) })
	}
}

function showLoading( on, text ) {  // on: true|false
    setTimeout( function() {
      if ( on )
        $.mobile.loading( "show",  {
		  text: text || "",
		  textVisible: true,
		  theme: "z",
		  html: ""
		} );
      else {
        //$.mobile.loading( "hide" );  // does not seem to work (e.g. using with GWT and jQM 1.4.3)
        $.mobile.loading( "hide")
        $('.ui-loader').remove();  // removes the loader div from the body
      }       
    }, 1);
}

var jqm = {
	showLoader : function(text){
		showLoading(true,text)
	},
	hideLoader : function(){
		showLoading(false)
	},
	popup : function(params){
		$('#pop_Title').html(params.title)
		$('#pop_text').html(params.text)
		$( "#pop1" ).popup( "open" )
	}
}

/**********************************************************
*	FOUNDATION CONTROLLERS
***********************************************************/
var foundationJS = {
	createAlert : function(msg,div,tipo){
		template.render('#alertT',div,{msg:msg,tipo:tipo});
	}
}


/**********************************************************
*	TEMPLATE RENDERER
***********************************************************/
var template = {
	render: function(template,output,data,callback,partials){
		var options = {
		  el: output,
		  template:  template,
		  partials: partials,
		  data : data
		}
		// BIND HELPERS
		for (var a in rh){
			options.data[a] = rh[a];
		}
		var ractive = new Ractive(options);
		// IF CALLBACK
		if(callback) { callback()};
		return ractive;
	},
	setListeners : function(){

	},
	update: function(){

	},

}


/**********************************************************
*	DATABASE CONTROLLER
***********************************************************/
var dbC = {
	query : function(url,type,params,callback,errorCB,extra){
		 $.ajax({
	        type: type,
	        data: params,
	        crossDomain: true,
            url: serverURL + url,
	        dataType: 'JSON',
	        }).done(function( response ) {
        		if(callback) { callback(response,extra) }
	        }).fail(function( response ) {
	           	console.log("fail query",response,extra);
	           	if(errorCB) { errorCB(response,extra) }
	    }); 
	}
}


/**********************************************************
*	REACTIVE HANDLERS
***********************************************************/
var rh = {
	checked : function(lvalue,rvalue,defaultVal){
		if(lvalue==undefined && defaultVal){ lvalue = defaultVal; }
		if( lvalue==rvalue ) {
	       return ' checked="checked"'  } else { return "" };
	},
	timeConverter : function(value){
		return utils.timeConverter(value);
	},
	correctCase : function(str){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},
	roundDist : function(value){
		return value.toFixed(2);
	},
	maskTel : function(value){
		return value.replace(/(.{2})(.{4})(.{4})/,'$1 $2 $3 ');
	},
	restantes : function(value){
		var date1 = new Date(parseInt(value)*1000);
		var date2 = new Date();
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

		if(utils.generateTS()>parseInt(value)){
			return "TARJETA VENCIDA";
		}else{
			return diffDays;
		}

		
	},
	momentoCal : function(val){
	  moment.locale('es');
      var cal = moment.unix(val,'DD/MM/YYYY, h:mm:ss a','es')
      return  cal;
	}, 
    momentoFecha : function(val){
      moment.locale('es');
      var cal = rh.cCase(moment(val).format('DD MMM YYYY'));
      return  cal;
    },
     momentoHora : function(val){
      moment.locale('es');
      var cal = moment(val).format('h:mm:ss a');
      return  cal;
    },
    momentoDate : function(val){
        console.log(val,"VALE")
      moment.locale('es');
      var cal = moment(val).calendar();
      console.log(cal,"CAL")
      return  cal;
    },
	cCase  : function(str){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},
}





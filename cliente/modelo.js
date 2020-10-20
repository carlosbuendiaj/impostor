function Juego(){
	this.partidas={}; 

	this.crearPartida=function(num, owner){
		//comprobar limites de num
		let codigo=this.obtenerCodigo();
		if (!this.partidas[codigo]) {
			this.partidas[codigo]=new Partida(num,owner.nick);
			owner.partida=this.partidas[codigo];
		}
		return codigo;
		//comprobar que no esta en uso
		//crear el objeto partida:num owner
		//this.partidas[codigo]=nueva partida
	}
	this.unirAPartida=function(codigo,nick){
		if(this.partidas[codigo]){
			this.partidas[codigo].agregarUsuario(nick);
		}

	}

	this.obtenerCodigo=function(){
		let cadena="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let letras=cadena.split('');
		let maxCadena=cadena.length;
		let codigo=[];
		for (i = 0; i<6; i++) {
			codigo.push(letras[randomInt(1,maxCadena)-1]);
		}
		return codigo.join('');
	}
}

function Partida(num, owner){
	this.maximo=num;
	this.nickOwner=owner;
	this.fase=new Inicial();
	this.usuarios={};//el index 0 sera el owner
	
	this.agregarUsuario=function(nick){
		this.fase.agregarUsuario(nick,this)
	}


	this.puedeAgregarUsuario=function(nick){
		let nuevo = nick;
		let contador=1;

		while(this.usuarios[nuevo]){
			nuevo=nick+contador;
			contador=contador+1;
		}
			this.usuarios[nuevo]=new Usuario(nuevo);
			this.usuarios[nuevo].partida=this;
			if(Object.keys(this.usuarios).length=>this,maximo){
				this.fase = new Completado();
			}
	}

	this.comprobarMinimo=function(){
		return Object.keys(this.usuarios).lenght>=4
	}

	this.comprobarMaximo=function(){
		return Object.keys(this.usuarios).lenght<this.maximo
	}

	this.iniciarPartida=function(){
		this.fase.iniciarPartida(this);
	}

	this.abandonarPartida=function(nick){
		this.fase.abandonarPartida(nick,this);
	}

	this.eliminarUsuario=function(nick){
		delete this.usuarios[nick];
	}

	this.agregarUsuario(owner);
}

function Inicial(){
	this.nombre="inicial";

	this.agregarUsuario=function(nick,partida){
		partida.puedeAgregarUsuario(nick);
		if(partida.comprobarMinimo()){
			partida.fase= new Completado();
		}
	}

	this.iniciarPartida=function(partida){
		console.log("Faltan jugadores");
	}

	this.abandonarPartida=function(partida){
		partida.eliminarUsuario(nick);
		if(partida.jugadores==0){
			delete this.partida;
		}
	}
}

function Completado(){
	this.nombre="completado";
	this.iniciarPartida=function(partida){
		partida.fase=new Jugando();
		//llame puedeIniciarPartida();
		//partida.fase=new Jugando();
		//asignar tareas: secuencialmente a todos los usuarios
		//asignar impostor: dado el array usuarios(Object.keys)

	}
	this.agregarUsuario=function(nick, partida){
		if(partida.comprobarMaximo()){
			partida.puedeAgregarUsuario(nick);
		}
		else{
			console.log("Lo siento, numero maximo")
		}
	}
	this.abandonarPartida=function(nick,partida){
		partida.eliminarUsuario(nick);
		if(!partida.comprobarMinimo()){
			partida.fase=new Inicial();
		}
	}
}

function Jugando(){
	this.agregarUsuario=function(nick,partida){
		console.log("La partida ya ha comenzado");
		//this.puedeAgregarUsuario(nick);
	}
	this.iniciarPartida=function(partida){
		//falta algo
	}
	this.abandonarPartida=function(nick,partida){
		partida.eliminarUsuario(nick);
		//comprobar si termina la partida
		if(!partida.comprobarMinimo()){
			partida.fase=new Final();
		}
	}
}

function Final(){
	this.final="final";

	this.agregarUsuario=function(nick,partida){
		console.log("La partida ha terminado");
		
	}

	this.iniciarPartida=function(partida){
		//volver a jugar?
		if(comprobarMinimo){
			partida.fase= new Inicial();
		}
	}
	this.abandonarPartida=function(nick,partida){
		//no sirve para nada, eliminarlo
	}
}

function Usuario(nick,juego){

	this.nick=nick;
	this.juego=juego;
	this.partida;
	this.impostor=false;
	this.encargo="ninguno";
	this.crearPartida=function(num){
		return this.juego.crearPartida(num,this);
	}

	this.iniciarPartida=function(){
		this.partida.iniciarPartida();

	}

	this.abandonarPartida=function(){
		this.partida.abandonarPartida(this.nick);
	}

}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

function inicio(){
	juego=new Juego();
	var usr=new Usuario("pepe",juego);
	var codigo=usr.crearPartida(4);

	juego.unirAPartida(codigo,"luis");
	juego.unirAPartida(codigo,"luisa");
	juego.unirAPartida(codigo,"luisito");
	juego.unirAPartida(codigo,"pepe");

	usr.iniciarPartida();
}
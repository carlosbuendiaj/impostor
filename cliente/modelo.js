function Juego(){
	this.partidas={}; //que coleccion?

	this.crearPartida= function(num, owner){
		let codigo=this.obtenerCodigo();
		if (!this.partidas[codigo]) {
			this.partidas[codigo]=new Partida(num, owner);
		}

		//comprobar que no esta en uso
		//crear el objeto partida:num owner
		//this.partidas[codigo]=nueva partida
	}


	this.unirAPartida=function(codigo,nik){

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
	
	this.usuarios={};//el index 0 sera el owner
	
	this.agregarUsuario=function(nick){
		this.fase.agregarUsuario(nick,this)
	}

	this.puedeAgregarUsuario=function(nick){
		//comprobar nick es unico
		let nuevo = nick;
		let contador=1;
		let nuevosUsuarios=this.usuarios.length;

		while(this.usuarios[nuevo]){
			nuevo=nick+contador;
			contador=contador+1;
		}
		if(this.num!=nuevosUsuarios){
			nuevosUsuarios++;
			this.usuarios[nuevo]=new Usuario(nuevo);
		}
		else{
			Console.log("No te puedes unir, maximo numero de jugadores");
		}
		

		//comprobar si maximo numero de usuarios



	}

	this.agregarUsuario(owner);

}

function Inicial(){
	this.agregarUsuario=function(nick,partida){
		partida.puedeAgregarUsuario(nick);
	}
}

function Jugando(){
	this.agregarUsuario=function(nick,partida){
		//this.puedeAgregarUsuario(nick);
	}
}

function Final(){
	this.agregarUsuario=function(nick,partida){
		//this.puedeAgregarUsuario(nick);
	}
}

function Usuario(nick){

	this.nick=nick;

}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

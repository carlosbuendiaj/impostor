describe("El juego del impostor", function() {
  var juego;
  var usuario;

  beforeEach(function() {
   juego=new Juego(); 
   usuario= new Usuario("Pepe",juego);
  });

it("inicialmente...", function() {
	expect(Object.keys(juego.partidas).length).toEqual(0);
	expect(usr.nick).toEqual("Pepe");
	expect(usr.juego).not.toBe(undefined);
});

describe("el usuario Pepe crea una partida de 4 jugadores", function(){
	var codigo;
	beforeEach(function(){
		codigo=usuario.crearPartida(4);
	});

		it("se comprueba la partida", function()){
			expect(codigo).not.toBe(undefined);
			expect(juego.partidas[codigo].nickOwner).toEqual(usuario.nick);
			expect(juego.partidas[codigo]maximo).toEqual(4);
			expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
			var num = Object.keys(juego.partidas[codigo].usuarios).length;
			expect(num).toEqual(1);
		});

		it("varios usuarios se unen a la partida", function()){
			juego.unirAPartida(codigo, "ana");
			var num= Object.keys(juego.partidas[codigo].usuarios).length;
			expect(num).toEqual(2);
			expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
			juego.unirAPartida(codigo, "isa");
			var num= Object.keys(juego.partidas[codigo].usuarios).length;
			expect(num).toEqual(3);
			expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
			juego.unirAPartida(codigo, "pablo");
			var num= Object.keys(juego.partidas[codigo].usuarios).length;
			expect(num).toEqual(4);
			expect(juego.partidas[codigo].fase.nombre).toEqual("completado");
			
		});

		it("Pepe inicia la partida", function(){
			juego.unirAPartida(codigo,"ana");
			var num=Object.keys(juego.partidas[codigo].usuarios).length;
		  	expect(num).toEqual(2);
			expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
			juego.unirAPartida(codigo,"isa");
		  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
		  	expect(num).toEqual(3);
			expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
			juego.unirAPartida(codigo,"tomas");
		  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
		  	expect(num).toEqual(4);
			expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
			usr.iniciarPartida();
			expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		})
});

})


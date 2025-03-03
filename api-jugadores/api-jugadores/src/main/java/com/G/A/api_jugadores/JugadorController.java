package com.G.A.api_jugadores;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/jugadores") //URL:http://localhost:8080/api/jugadores
@CrossOrigin(origins = "*")
public class JugadorController {

    // Lista de jugadores (simulando una base de datos)
    private List<Jugador> jugadores = new ArrayList<>();

    public JugadorController() {
    // Inicializar la lista con los 10 principales goleadores y asistentes del FC Barcelona
    jugadores.add(new Jugador("Robert Lewandowski", 18, 2, 30));
    jugadores.add(new Jugador("Raphinha", 12, 3, 23));
    jugadores.add(new Jugador("Lamine Yamal", 5, 5, 11));
    jugadores.add(new Jugador("Dani Olmo", 5, 0, 6));
    jugadores.add(new Jugador("Pedri", 4, 2, 6));
    jugadores.add(new Jugador("Ferran Torres", 4, 1, 5));
    jugadores.add(new Jugador("Jules Koundé", 2, 1, 7));
    jugadores.add(new Jugador("Fermín López", 2, 1, 4));
    jugadores.add(new Jugador("Pau Víctor", 2, 0, 2));
    jugadores.add(new Jugador("Iñigo Martínez", 2, 0, 2));
}


    // Endpoint para obtener todos los jugadores
    @GetMapping
    public List<Jugador> obtenerJugadores() {
        return jugadores;
    }
}

package com.G.A.api_jugadores;

public class Jugador {

    private String nombre;
    private int dorsal;
    private int asistencias;
    private int goles;

    // Constructor
    public Jugador(String nombre, int dorsal, int asistencias, int goles) {
        this.nombre = nombre;
        this.dorsal = dorsal;
        this.asistencias = asistencias;
        this.goles = goles;
    }

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getDorsal() {
        return dorsal;
    }

    public void setDorsal(int dorsal) {
        this.dorsal = dorsal;
    }

    public int getAsistencias() {
        return asistencias;
    }

    public void setAsistencias(int asistencias) {
        this.asistencias = asistencias;
    }

    public int getGoles() {
        return goles;
    }

    public void setGoles(int goles) {
        this.goles = goles;
    }
}

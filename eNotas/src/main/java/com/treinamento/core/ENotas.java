package com.treinamento.core;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "enotas")
@NamedQueries({
    @NamedQuery(
        name = "eNotas.find",
        query = "SELECT n FROM ENotas n ORDER BY id"
    )
})
public class ENotas {

    @Id // primary key
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "titulo", length = 30, nullable = false)
    private String titulo;

    @Column(name = "texto", length = 100, nullable = false)
    private String texto;

    @Column(name = "data", nullable = false)
    private Timestamp data;

    public ENotas(){}
    public ENotas(int id, String titulo, String texto, Timestamp data){
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.data = data;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTexto() {
        return texto;
    }
    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Timestamp getData() {
        return data;
    }
    public void setData(Timestamp data){
        this.data = data;
    }
}

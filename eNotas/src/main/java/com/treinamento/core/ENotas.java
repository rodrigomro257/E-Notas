package com.treinamento.core;

import javax.persistence.*;

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

    @Column(name = "title", length = 30, nullable = false)
    private String title;

    @Column(name = "text", length = 100, nullable = false)
    private String text;

    @Column(name = "data", length = 10, nullable = false)
    private String data; // DD/MM/AAAA

    public ENotas(){}
    public ENotas(int id, String title, String text, String data){
        this.id = id;
        this.title = title;
        this.text = text;
        this.data = data;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }

    public String getData() {
        return data;
    }
    public void setData(String data){
        this.data = data;
    }
}

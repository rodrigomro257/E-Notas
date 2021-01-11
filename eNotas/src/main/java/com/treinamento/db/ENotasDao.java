package com.treinamento.db;

import com.treinamento.core.ENotas;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

public class ENotasDao extends AbstractDAO<ENotas>{

    public ENotasDao(SessionFactory factory){ super(factory); }

    // CONSULTA NO BANCO DE DADOS.

    // localhost:8080/eNotas
    public List<ENotas> getAll(){
        // FUNCIONA!
        CriteriaBuilder builder = currentSession().getCriteriaBuilder();
        CriteriaQuery<ENotas> query = builder.createQuery(ENotas.class);
        Root<ENotas> root = query.from(ENotas.class);
        query.select(root);
        query.orderBy(builder.asc(root.get("id")));
        return list(query);
    }

    // localhost:8080/eNotas/id
    public ENotas getENotaById(int id){
        // FUNCIONA!
        CriteriaBuilder builder = currentSession().getCriteriaBuilder();
        CriteriaQuery<ENotas> query = builder.createQuery(ENotas.class);
        Root<ENotas> root = query.from(ENotas.class);
        query.where(
                builder.equal(root.get("id"), id)
        );
        return currentSession().createQuery(query).getSingleResult();
    }

    // localhost:8080/eNotas/title
    public ENotas getENotaByTitle(int title){
        // FUNCIONA!
        CriteriaBuilder builder = currentSession().getCriteriaBuilder();
        CriteriaQuery<ENotas> query = builder.createQuery(ENotas.class);
        Root<ENotas> root = query.from(ENotas.class);
        query.where(
                builder.equal(root.get("title"), title)
        );
        return currentSession().createQuery(query).getSingleResult();
    }

    // localhost:8080/eNotas
    public ENotas insertENota(ENotas enota){
        // FUNCIONA! ATUALIZA A NOTA.
        return persist(enota);
    }

    // localhost:8080/eNotas/delete/id
    public void delete(ENotas enota){
        // FUNCIONA!
        currentSession().delete(enota);
    }
}

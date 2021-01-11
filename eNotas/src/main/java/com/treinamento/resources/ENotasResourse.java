package com.treinamento.resources;

import com.treinamento.core.ENotas;
import com.treinamento.db.ENotasDao;
import io.dropwizard.hibernate.UnitOfWork;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/eNotas")
//@Produces(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public class ENotasResourse {

    private ENotasDao enotasDao;

    public ENotasResourse(){}
    public ENotasResourse(ENotasDao enotasDao){ this.enotasDao = enotasDao; }

    @GET
    @UnitOfWork
    public Response getENotas() {
        // FUNCIONA!
        List<ENotas> allENotas = enotasDao.getAll();
        return Response.ok().entity(allENotas).build();
    }

    @GET
    @Path("/{id}")
    @UnitOfWork
    public Response getENota(@PathParam("id") int id){
        // FUNCIONA!
        ENotas enota = enotasDao.getENotaById(id);
        if (enota == null)
            throw new WebApplicationException("Product does not exist", Response.Status.NOT_FOUND);
        return Response.ok().entity(enota).build();
    }

    @POST
    @UnitOfWork
    public Response insertENota(ENotas enota){
        // FUNCIONA!
        enota = enotasDao.insertENota(enota);
        return Response.ok().entity(enota).build();
    }

    @DELETE
    @Path("/delete/{id}")
    @UnitOfWork
    public Response deleteENota(@PathParam("id") int id, ENotas enota){
        // FUNCIONA!
        enota = getENotaDelete(id);
        enotasDao.delete(enota);
        return Response.ok().entity(enota).build();
    }

    @GET
    @UnitOfWork
    public ENotas getENotaDelete(int id){
        // PEGA A NOTA PARA SER DELETADA.
        ENotas enota = enotasDao.getENotaById(id);
        if (enota == null)
            throw new WebApplicationException("Product does not exist", Response.Status.NOT_FOUND);
        return enota;
    }
}

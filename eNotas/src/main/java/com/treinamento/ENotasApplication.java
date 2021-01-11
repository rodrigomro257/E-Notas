package com.treinamento;

import com.treinamento.core.ENotas;
import com.treinamento.db.ENotasDao;
import com.treinamento.health.DatabaseHealthCheck;
import com.treinamento.resources.ENotasResourse;
import io.dropwizard.Application;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.servlets.CrossOriginFilter;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import java.util.EnumSet;

public class ENotasApplication extends Application<ENotasConfiguration>{

    private final HibernateBundle<ENotasConfiguration> hibernateBundle =
    new HibernateBundle<ENotasConfiguration>(ENotas.class){
        @Override
        public DataSourceFactory getDataSourceFactory(ENotasConfiguration configuration) {
            return configuration.getDataSourceFactory();
        }
    };

    public static void main(final String[] args) throws Exception {
        new ENotasApplication().run(args);
    }

    @Override
    public String getName(){ return "eNotas"; }

    @Override
    public void initialize(final Bootstrap<ENotasConfiguration> bootstrap) {
        bootstrap.addBundle(hibernateBundle);

        // MIGRATION
        bootstrap.addBundle(new MigrationsBundle<ENotasConfiguration>() {
            @Override
            public DataSourceFactory getDataSourceFactory(ENotasConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        });
    }

    @Override
    public void run(final ENotasConfiguration configuration, final Environment environment){

        // DATABASE
        final ENotasDao dao = new ENotasDao(hibernateBundle.getSessionFactory());
        environment.jersey().register(new ENotasResourse(dao));

        // DATABASE HEALTH CHECK
        environment.healthChecks().register("database", new DatabaseHealthCheck());

        // CORS
        final FilterRegistration.Dynamic cors = environment.servlets().addFilter("CORS", CrossOriginFilter.class);
        // Configure CORS parameters
        cors.setInitParameter("allowedOrigins", "*");
        cors.setInitParameter("allowedHeaders", "X-Requested-With,Content-Type,Accept,Origin");
        cors.setInitParameter("allowedMethods", "OPTIONS,GET,PUT,POST,DELETE,HEAD");
        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");
        // DO NOT pass a preflight request to down-stream auth filters
        // unauthenticated preflight requests should be permitted by spec
        cors.setInitParameter(CrossOriginFilter.CHAIN_PREFLIGHT_PARAM, Boolean.FALSE.toString());
    }
}
    
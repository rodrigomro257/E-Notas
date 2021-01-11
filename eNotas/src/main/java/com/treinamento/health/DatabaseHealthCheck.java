package com.treinamento.health;

import com.codahale.metrics.health.HealthCheck;
import org.hibernate.dialect.Database;

public class DatabaseHealthCheck extends HealthCheck{
    private final Database database;

    public DatabaseHealthCheck(Database database) {
        this.database = database;
    }

    public DatabaseHealthCheck() {
        database = null;
    }

    @Override
    protected Result check() throws Exception {
        //if (database.isConnected()) {
        //    return Result.healthy();
        //} else {
        //    return Result.unhealthy("Cannot connect to " + database.getUrl());
        //}
        return null;
    }
}

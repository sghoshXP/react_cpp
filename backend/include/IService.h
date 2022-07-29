#pragma once

#include "IResourceFactory.h"
#include "IServiceSettingsFactory.h"

class IService {
public:
    virtual void start() = 0;
};

class CalcService : public IService {
public:
    CalcService(shared_ptr<IResourceFactory> resource_factory, shared_ptr<IServiceSettingsFactory> settings_factory) {
        settings_factory_ = settings_factory;
        service_.publish(resource_factory->get_resource());
    }

    void start() override {
        service_.start(settings_factory_->get_settings());
    }

private:
    Service service_;
    shared_ptr<IServiceSettingsFactory> settings_factory_;
};
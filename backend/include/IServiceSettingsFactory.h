#pragma once

#include <memory>
#include <restbed>

using namespace std;
using namespace restbed;

class IServiceSettingsFactory {
public:
    virtual shared_ptr<Settings> get_settings() const = 0;
};

class CalcServiceSettingsFactory : public IServiceSettingsFactory {
public:
    CalcServiceSettingsFactory() {
        settings_ = make_shared<Settings>();
        settings_->set_port(8080);
        settings_->set_default_header("Connection", "close");
        settings_->set_default_header("Access-Control-Allow-Origin", "*");
    }

    shared_ptr<Settings> get_settings() const override {
        return settings_;
    }

private:
    shared_ptr<Settings> settings_;
};
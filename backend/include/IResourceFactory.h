#pragma once

#include <tuple>
#include <string>
#include <memory>
#include <restbed>

#include <sstream>
#include <iomanip>

#include "json.hpp"

using namespace std;
using namespace restbed;

class IResourceFactory {
public:
virtual shared_ptr<Resource> get_resource() const = 0;
};

class CalcResourceFactory : public IResourceFactory {
public:
    CalcResourceFactory() {
        resource_ = make_shared<Resource>();
        resource_->set_path(
            "/{operation: add|sub|mul|div}"
            "/{num1: [-+]?[0-9]*\\.?[0-9]*}"
            "/{num2: [-+]?[0-9]*\\.?[0-9]*}");
        resource_->set_method_handler("GET", [&](const shared_ptr<Session> session) {
            get_handler(session);
        });
    }

    float calculate(float num1, float num2, string operation) {
        if(operation == "add")
            return num1+num2;
        if(operation=="sub")
            return num1-num2;
        if(operation=="mul")
            return num1*num2;
        if(operation=="div")
            return num1/num2;
        return 0;
    }

    void get_handler(const shared_ptr<Session> session) {
        const auto [num1, num2, operation] = get_path_parameters(session);
        const auto result = calculate(num1, num2, operation);
        auto content = to_json(result);
        session->close(OK, content, {{"Content-Length", to_string(content.size())}});
    }

    shared_ptr<Resource> get_resource() const override {
        return resource_;
    };

    tuple<float, float, string> get_path_parameters(const shared_ptr<Session> session) {
        const auto& request = session->get_request();
        auto operation = request->get_path_parameter("operation");
        auto num1 = atof(request->get_path_parameter("num1").c_str());
        auto num2 = atof(request->get_path_parameter("num2").c_str());
        return make_tuple(num1, num2, operation);
    }

    string to_json(float result) {
        ostringstream ss;
        ss << result;
        nlohmann::json json_result = {
            {"result", ss.str()}
            };
        return json_result.dump();
    }

private:
    shared_ptr<Resource> resource_;
};
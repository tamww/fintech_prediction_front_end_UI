
import React from "react";
import { Route, Switch} from "react-router-dom";
import {Routesdata} from './routes.js';

/*function: mapping of page component and routing information */
export default function Routing() {
    return (
        <Switch>
             {Routesdata.map((item, index) =>
                <Route
                    exact path={item.path} 
                    component={item.component} 
                    key = {index}
                />
            )}
        </Switch>
    );
}

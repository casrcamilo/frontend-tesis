import React from 'react';
import {BrowserRouter, Switch, Route,} from 'react-router-dom';

import Layout from './Layout'
import Home from '../Pages/Home'

function App(){
    return (
        <BrowserRouter>
            <Layout>     
                <Switch>
                    {/*<Route exact path="/profesores" component={Profesores}/>*/}
                    <Route exact path="/" component={Home}/>
                    {/*<Route component={NotFound}/>*/}
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
import React, { Component } from 'react'
import { BrowserRouter} from 'react-router-dom'

import Wrapper from '../pages/Wrapper'
const Root = () =>(
    <BrowserRouter>
        <Wrapper/>
    </BrowserRouter>
);
export default Root;
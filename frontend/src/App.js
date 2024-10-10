import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

class App extends React.Component{

    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default App
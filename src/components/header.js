import React from 'react';
import '../css/header.less';

export default class Header extends React.Component{
    render(){
        return(
            <div className='components-header row'>
                <img src="/src/images/logo.png" width="40" alt="" className="-col-auto"/>
                <h1 className='caption'>React Music Player</h1>
            </div>
        );
    }
}
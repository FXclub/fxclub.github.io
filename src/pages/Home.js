import React, { Component } from 'react';
import { Button } from 'antd';
import {Link} from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            
            <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(https://i.imgur.com/rlqU6N8.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <p><h1 style={{color: 'white'}}>FXClub: intelligent asset management with Data Science</h1></p>
                <p>
                    <Button type="primary" size="large"><Link to="/rate/GBPUSD/20170217">Get Started</Link></Button>
                </p>
            </div>
        );
    }
}

HomePage.propTypes = {

};

export default HomePage;
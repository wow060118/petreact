/**
 * Created by Administrator on 2017/10/21.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {Carousel, Card} from 'antd';
export default class MySplash extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <center>
                    <Carousel autoplay>
                        <div><img style={{width: '50%', height: '45%'}}
                                  src="../images/cat.png" alt="Planets"/></div>
                        <div><img style={{width: '50%', height: '45%'}}
                                  src="../images/dog.png"/></div>
                        <div><img style={{width: '50%', height: '45%'}}
                                  src="../images/fish.png" alt="Planets"/></div>
                        <div><img style={{width: '50%', height: '45%'}}
                                  src="../images/bird.png"/></div>
                        <div><img style={{width: '50%', height: '45%'}}
                                  src="../images/reptile.png"/></div>

                    </Carousel>
                </center>
            </div>
        )
    }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Papa from 'papaparse';
import { buildURI } from '../utils/data';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { DatePicker, Radio, Spin } from 'antd';
import moment from 'moment';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class RatePage extends Component {

    state = {
        error: null,
        data: null,
        date: null,
    }

    render() {
        const { error, data, date, currency } = this.state;
        console.log('currency:', currency);

        return (
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                <h1>{currency}</h1>

                {error ? this.renderError() : null}
                {data ? this.renderGraph() : <Spin size="large" />}

                <div>
                    <div>Change a date:</div>
                    {date ? <DatePicker defaultValue={moment(date, 'YYYYMMDD')} format="YYYYMMDD" onChange={this.onDataPickerChange.bind(this)} /> : null}
                    <div>Pick a type:</div>
                    {currency ?
                        <div>
                            <RadioGroup onChange={this.onTypeChange.bind(this)} defaultValue={currency}>
                                <RadioButton value="EURGBP">EURGBP</RadioButton>
                                <RadioButton value="EURUSD">EURUSD</RadioButton>
                                <RadioButton value="GBPUSD">GBPUSD</RadioButton>
                            </RadioGroup>
                        </div>
                        : null}
                </div>
            </div>
        );
    }

    renderError() {
        return (
            <div style={{ color: 'red' }}>{this.state.error}</div>
        );
    }

    renderGraph() {
        const { data } = this.state;

        // Line colour: RURI 瑠璃
        return (
            <div>
                <LineChart width={600} height={400} data={data}>
                    <Legend />
                    <Tooltip />
                    <XAxis dataKey="name" hide={true} />
                    <YAxis domain={['dataMin', 'dataMax']} />
                    <Line type="monotone" dataKey="rate" stroke="#005CAF" activeDot={{ r: 0.5 }} dot={false} />
                </LineChart>
            </div>
        );
    }

    componentDidMount() {
        const { params } = this.props.match;
        this.handleDate(params);
        this.onLoad(params);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.match);
        const p = nextProps.match.params;
        this.handleDate(p);
        this.onLoad(p);
    }

    handleDate(params) {
        const { date, currency } = params;
        console.log('handleDate:', date, currency);

        this.setState({ date: date, currency: currency });
    }

    onLoad(params) {
        const { currency, date } = params;

        this.setState({ error: null });

        console.log(params);

        const uri = buildURI(currency, date);
        if (uri) {
            fetch(uri).then(res => {
                if (res.ok) {
                    return res.text();
                } else {
                    throw new Error();
                }
            }).then(text => {
                const csv = Papa.parse(text);


                const data = csv.data.map(row => {
                    return { rate: Number(row[1]), name: moment(row[0]).format('HH:mm') };
                })


                this.setState({ data: data });

            }).catch(error => {
                console.log('404 not found');
                this.setState({ error: '404 Not Found.' })
            })
        } else {
            this.setState({ error: 'Invalid request.' })
        }
    }

    onDataPickerChange(date, dateString) {

        const { params } = this.props.match;
        const { currency } = params;
        this.props.history.push(`/rate/${currency}/${dateString}`);
    }

    onTypeChange(e) {
        const value = e.target.value;
        const { params } = this.props.match;
        const { date } = params;
        this.props.history.push(`/rate/${value}/${date}`);
    }
}

RatePage.propTypes = {

};

export default RatePage;
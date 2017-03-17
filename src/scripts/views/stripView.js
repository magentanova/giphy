import React from 'react'

import Banner from './components/banner'
import {TrendingCollection} from '../models/giphyModels'
import ACTIONS from '../actions'
import STORE from '../store'


var StripView = React.createClass({
	componentWillMount : function() {
		ACTIONS.fetchTrending()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	// the state of this component will always be an exact copy of whatever is in STORE.data
	getInitialState : function() {
		return STORE.data
	},
	render : function() {
		console.log(this.state)
		return (
			<div className="strip-view">
				<Banner />	
				<Strip 
				gifCollection = {this.state.trendingColl}
				activeID = {this.state.activeID}
				/>
			</div>
			)
	}
})

var Strip = React.createClass({
	// input is an array element 
	_makeGif : function(singleModel) {
		console.log('a single model', singleModel)
		return (
			<GifComponent 
			gifData = {singleModel}
			activeID = {this.props.activeID}
			/>
			)
	},
	render : function() {
		console.log('console log props on strip', this.props)
		return (
			<div className="strip">
				{this.props.gifCollection.map(this._makeGif)}
			</div>
			)
	}
})

var GifComponent = React.createClass({
	_handleClick : function() {
		ACTIONS.setActiveID(this.props.gifData.get('id'))
	},
	render : function() {
		var gifClass = this.props.activeID === this.props.gifData.get('id') ? 'single-gif active' : 'single-gif'
		return (
			<div  onClick={this._handleClick} className={gifClass}>
				<img src={this.props.gifData.get('images').original.url}/>
			</div>
			)
	}
})


export default StripView
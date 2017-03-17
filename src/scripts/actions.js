import {TrendingCollection} from './models/giphyModels'
import STORE from './store'

var ACTIONS = {
	fetchTrending : function() {
		var trendingInstance = new TrendingCollection()
		var promise = trendingInstance.fetch()
		promise.then(() => {
			STORE.set({
				trendingColl : trendingInstance,
				activeID : trendingInstance.models[0].get('id')
			})
		})
	},
	setActiveID : function(gifID) {
		STORE.set({
			activeID : gifID
		})
	}
}

export default ACTIONS
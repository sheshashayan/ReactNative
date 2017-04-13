export default function createReducer (initialState, handlers){


	let state = initialState;
	return function reducer(state, action){

		if(handlers.hasOwnProperty(action.type)){

			return handlers(action.type, state, action)

		}
		else{

			return state;
		}


	}

}
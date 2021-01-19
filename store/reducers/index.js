const initialState = {
	movies: [],
	relatedMovies: [],
	isLoading: true,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case "START_FETCH":
			return { ...state, isLoading: true };
		case "FINISH_FETCH":
			return { ...state, isLoading: false };
		case "SET_MOVIES":
			return { ...state, movies: action.payload };
		case "SET_RELATED_MOVIES":
			return { ...state, relatedMovies: action.payload };
		case "EMPTY_RELATED_MOVIES":
			return { ...state, relatedMovies: [] };
		default:
			return state;
	}
}

import axios from "axios";
const apiURL = "https://api.themoviedb.org/3/movie";
const api_key = "028396ec7ab08b8fb521609b9c76dda5";

export function fetchMovies() {
	return (dispatch) => {
		dispatch({ type: "START_FETCH" });
		axios({
			method: "GET",
			url: apiURL + "/now_playing",
			params: { api_key },
		})
			.then(({ data }) => {
				return dispatch({ type: "SET_MOVIES", payload: data.results });
			})
			.catch((err) => console.log(err.response, `<<<<<<< ERROR CATCH`))
			.finally(() => dispatch({ type: "FINISH_FETCH" }));
	};
}

export function fetchRelatedMovies(id) {
	return (dispatch) => {
		dispatch({ type: "START_FETCH" });
		axios({
			method: "GET",
			url: `${apiURL}/${id}/similar`,
			params: { api_key },
		})
			.then(({ data }) => {
				return dispatch({ type: "SET_RELATED_MOVIES", payload: data.results });
			})
			.catch((err) => console.log(err.response))
			.finally(() => dispatch({ type: "FINISH_FETCH" }));
	};
}

import { createContext, useReducer } from 'react';

export const ContextFilm = createContext();

// Constant
export const SET_SLUG_MOVIE = 'set_slug_movie';
// Actions
export const setSlugMovie = (payload) => ({
    type: SET_SLUG_MOVIE,
    payload,
});
export function Provider({ children }) {
    const initState = {
        slug: '',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case SET_SLUG_MOVIE:
                return {
                    ...state,
                    slug: action.payload,
                };
            default:
                throw new Error(`Invalid action`);
        }
    };
    const [state, dispatch] = useReducer(reducer, initState);
    return <ContextFilm.Provider value={[state, dispatch]}>{children}</ContextFilm.Provider>;
}

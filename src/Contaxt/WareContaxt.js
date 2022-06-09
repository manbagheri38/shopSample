import React from "react";

var CounterStateContext = React.createContext();
var CounterDispatchContext = React.createContext();

function counterReducer(state, action) {
    switch (action.type) {
        case "INC":
            return { ...state, counter: state.counter + 1 };

        case "get-All-Ware":
            return { ...state, wareList:action.payload }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function ContactProvider({ children }) {
    var [state, dispatch] = React.useReducer(counterReducer, {
        counter: 5,
        wareList: [],
    });
    return (
        <CounterStateContext.Provider value={state}>
            <CounterDispatchContext.Provider value={dispatch}>
                {children}
            </CounterDispatchContext.Provider>
        </CounterStateContext.Provider>
    );
}

function useContactState() {
    var context = React.useContext(CounterStateContext);
    if (context === undefined) {
        throw new Error("useLayoutState must be used within a LayoutProvider");
    }
    return context;
}

function useContactDispatch() {
    var context = React.useContext(CounterDispatchContext);
    if (context === undefined) {
        throw new Error("useLayoutDispatch must be used within a LayoutProvider");
    }
    return context;
}

export { ContactProvider, useContactState, useContactDispatch, plusCounter, setAllWare };

// ###########################################################
function plusCounter(dispatch) {
    dispatch({
        type: "INC",
    });
}
function setAllWare(dispatch,data) {
    dispatch({
        type: "get-All-Ware",
        payload:data
    })
}






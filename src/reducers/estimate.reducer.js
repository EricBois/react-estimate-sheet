const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          ...action,
          measures: [],
        },
      ];
    case 'REMOVE':
      return state.filter((estimate) => estimate.id !== action.id);
    case 'DELMEASURE':
      return state.filter((estimate) => estimate.id === action.id ? estimate.measures.splice(action.index, 1) : estimate);
    case 'EDIT':
      return state.map((estimate) =>
        estimate.id === action.id
          ? {
              ...estimate,
              name: action.name,
              address: action.address,
              note: action.note,
              measures: [...estimate.measures, action.measures],
            }
          : estimate
      );
    default:
      return state;
  }
};

export default reducer;

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          address: action.address,
          note: action.note,
          measures: [],
          hours: [],
          material: [],
        },
      ];
    case 'REMOVE':
      return state.filter((estimate) => estimate.id !== action.id);
    case 'EDIT':
      return state.map((estimate) =>
        estimate.id === action.id
          ? {
              ...estimate,
              name: action.name,
              address: action.address,
              note: action.note,
            }
          : estimate
      );
    case 'EDITMEASURE':
      console.log(action.index)
      return state.map((estimate) =>
        estimate.id === action.id
          ? 
            {...estimate, 
            measures: estimate.measures.map((val, i) => i === action.index ? action.measures: val)
            }
          
          : estimate
      );
    case 'ADDMEASURE':
      return state.map((estimate) =>
        estimate.id === action.id
          ? {
              ...estimate,
              measures: [...estimate.measures, action.measures],
            }
          : estimate
      );
    case 'DELMEASURE':
      return state.filter((estimate) =>
        estimate.id === action.id
          ? estimate.measures.splice(action.index, 1)
          : estimate
      );
    case 'ADDHOURS':
      return state.map((estimate) =>
        estimate.id === action.id
          ? {
              ...estimate,
              hours: [...estimate.hours, action.hours],
            }
          : estimate
      );
    case 'DELHOURS':
      return state.filter((estimate) =>
        estimate.id === action.id
          ? estimate.hours.splice(action.index, 1)
          : estimate
      );
      case 'EDITHOURS':
      console.log(action.index)
      return state.map((estimate) =>
        estimate.id === action.id
          ? 
            {...estimate, 
            hours: estimate.hours.map((val, i) => i === action.index ? action.hours: val)
            }
          
          : estimate
      );
    case 'ADDMATERIAL':
      return state.map((estimate) =>
        estimate.id === action.id
          ? {
              ...estimate,
              material: [...estimate.material, action.material],
            }
          : estimate
      );
    case 'DELMATERIAL':
      return state.filter((estimate) =>
        estimate.id === action.id
          ? estimate.material.splice(action.index, 1)
          : estimate
      );
      case 'EDITMATERIAL':
      console.log(action.index)
      return state.map((estimate) =>
        estimate.id === action.id
          ? 
            {...estimate, 
            material: estimate.material.map((val, i) => i === action.index ? action.material: val)
            }
          
          : estimate
      );
    default:
      return state;
  }
};

export default reducer;

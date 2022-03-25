import React, {useEffect, useReducer} from "react";
import ActiveFilter from "./ActiveFilter";
import classes from "./TodoFilters.module.css";

interface StateInterface {
  searchValue: string,
  statusValue: string,
  dateValue: string,
}

enum FilterAction {
  SEARCH = 'SEARCH',
  STATUS = 'STATUS',
  DATE = 'DATE',
  CLEAR = 'CLEAR'
}

interface ActionInterface {
  type: FilterAction,
  payload?: string
}

export const initialState: StateInterface = {
  searchValue: '',
  statusValue: '',
  dateValue: ''
}

const filterReducer = (state: StateInterface, action: ActionInterface): StateInterface => {
  const {type, payload} = action;
  const value = payload !== undefined ? payload : '';
  
  switch (type) {
    case FilterAction.SEARCH:
      return {...state, searchValue: value};
    case FilterAction.STATUS:
      return {...state, statusValue: value};
    case FilterAction.DATE:
      return {...state, dateValue: value};
    case FilterAction.CLEAR:
      return initialState;
    default:
      return state;
  }
}

const TodoFilters: React.FC<{ onFilterChange: (activeFilters: StateInterface) => void }> = ({onFilterChange}) => {
  const [{searchValue, statusValue, dateValue}, dispatch] = useReducer(filterReducer, initialState);
  
  const filterValuesHandler = (type: FilterAction, value?: string): void => {
    dispatch({type, payload: value});
  }
  
  useEffect(() => {
    onFilterChange({searchValue, statusValue, dateValue});
  }, [searchValue, statusValue, dateValue, onFilterChange]);
  
  return (
    <div className={classes.filters}>
      <div className={classes.filterInputs}>
        <div className={classes.filter}>
          <label htmlFor='search'>Search:</label>
          <input
            id='search'
            type='search'
            value={searchValue}
            onChange={e => filterValuesHandler(FilterAction.SEARCH, e.target.value)}
          />
        </div>
        <div className={classes.filter}>
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            id="status"
            value={statusValue}
            onChange={e => filterValuesHandler(FilterAction.STATUS, e.target.value)}
          >
            <option value="">all</option>
            <option value="done">Done</option>
            <option value="created">Created</option>
          </select>
        </div>
        <div className={classes.filter}>
          <label htmlFor='date'>Date:</label>
          <input
            id='date'
            type='date'
            value={dateValue}
            onChange={e => filterValuesHandler(FilterAction.DATE, e.target.value)}
          />
        </div>
        <div className={`${classes.filter} ${classes.reset}`}>
          <button onClick={() => filterValuesHandler(FilterAction.CLEAR)}>Reset</button>
        </div>
      </div>
      <div className={classes.activeFilters}>
        {!searchValue && !statusValue && !dateValue && <div>empty filter</div>}
        {searchValue &&
          <ActiveFilter onRemoveFilter={() => filterValuesHandler(FilterAction.SEARCH)}>
            Search: {searchValue}
          </ActiveFilter>
        }
        {statusValue &&
          <ActiveFilter onRemoveFilter={() => filterValuesHandler(FilterAction.STATUS)}>
            Status: {statusValue}
          </ActiveFilter>
        }
        {dateValue &&
          <ActiveFilter onRemoveFilter={() => filterValuesHandler(FilterAction.DATE)}>
            Date: {dateValue}
          </ActiveFilter>
        }
      </div>
    </div>
  );
}

export default TodoFilters;

import React from 'react';
import {connect, useSelector,useDispatch} from'react-redux';
import classNames from 'classnames';
import {fetchCategoriesThunk, selectCategory} from '../actions/actionCreators';


function Categories(props){
    const {
        items = [], 
        isLoading = false,
        selectedCategory: {id:selectedCategoryId}
    } = useSelector(state => state.categories);

    const dispatch = useDispatch();

    React.useEffect( () => {
        dispatch(fetchCategoriesThunk());
        return () => {};
    },[]);

    const selectCatagory = (category) => {
        dispatch(selectCategory(category));
    }
    return (!isLoading && items.length > 0 ) && (
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
                <a 
                    className={classNames("nav-link", {
                        active: !selectedCategoryId
                    })}
                    onClick={ (e) => {e.preventDefault(); selectCatagory({id:null}) }}
                    href="#"
                >Все</a>
            </li>
            {
                items.map(({id:categoryId,title}, index) => {
                    return (
                        <li key={index} className="nav-item">
                            <a 
                                className={classNames("nav-link", {
                                    active: selectedCategoryId === categoryId
                                })} 
                                onClick={ (e) => {e.preventDefault(); selectCatagory({id:categoryId,title}) }}
                                href="#"
                            >
                            {title}</a>
                        </li>
                    );
                })
            }
        </ul>
    );
}

const mapStateToProps = (state,ownProps) => {
    const {items, selectedCategory} = state;
    return {...ownProps, items, selectedCategory};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Categories);
export {ConnectedComponent as Categories};




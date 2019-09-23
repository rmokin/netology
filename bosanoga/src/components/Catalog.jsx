import React from 'react';
import {connect} from'react-redux';
import {Categories} from './Categories';
import {getCatalogThunk} from '../actions/actionCreators';

import Search from './Search';
import {Store} from './Store';


export default function Catalog(props){
    const {
        noSearch
    } = props;
    const search = (props.location && props.location.state && props.location.state.search) || undefined;


    
    return (
        (
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                {
                    !noSearch && (
                        <Search value={search} className="catalog-search-form form-inline"/>
                    )
                }
                
                <Categories />
                <Store 
                    canMore={true}
                    
                    reducers={[
                        {
                            search:{
                                search: 'search'
                            }
                        },
                        {
                            categories: {
                                isLoading: 'isCategoriesLoading',
                                hasError: 'hasCategoriesError',
                                selectedCategory: 'selectedCategory',
                            }
                        },
                        {
                            catalog: {
                                isLoading: 'isCatalogLoading',
                                hasError: 'hasCatalogError',
                                items: 'items',
                            }
                        },
                        {
                            loadmore: {
                                items: 'newItems',
                            }
                        },
                    ]}
                    dispatcher={ ({selectedCategory:{id:categoryId}, search}) => async (dispatch) => {
                        dispatch(getCatalogThunk(categoryId, search));
                    }}
                    stater={ (state) => {
                        return {
                            ...state, 
                            isLoading: state['isCategoriesLoading'] || state['isCatalogLoading'],
                            hasError: (state['hasCategoriesError'] != null && state['hasCategoriesError']) || 
                                      (state['hasCatalogError'] != null && state['hasCatalogError']),
                            search: noSearch ? '' : state['search']
                        };
                    }} 
                    />
            </section>
        )
    );

}

const mapStateToProps = (state,ownProps) => {
    const {items} = state;
    return {...ownProps, items};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Catalog);
export {ConnectedComponent as Catalog};
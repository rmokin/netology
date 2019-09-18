import React from 'react';
import {connect, useSelector,useDispatch} from'react-redux';
import {Categories} from './Categories';
import {getCatalogThunk} from '../actions/actionCreators';
import Preloader from './Preloader';
import Error from './Error';
import Numeric from './Numeric';
import {Link} from 'react-router-dom';

export default function Catalog(props){

    const {
        isLoading: catagoriesIsLoading,
        hasError: catagoriesHasError,
        selectedCategory: {id: selectedCategoryId}
    } = useSelector(state => state.categories);
    const {
        isLoading: catalogIsLoading,
        hasError: catalogHasError,
        items = [],
    } = useSelector(state => state.catalog);
    const search = '';


    const dispatch = useDispatch();

    React.useEffect( () => {
        dispatch(getCatalogThunk(selectedCategoryId,search));
        return () => {};
    },[]);

    const handleRepeate = () => {
        //dispatch(getCatalogThunk(selectedCategoryId,search));
    }


    return (
        ((catagoriesIsLoading || catalogIsLoading) && <Preloader />) || 
        ((catagoriesHasError || catalogHasError)  && <Error message={catagoriesHasError || catalogHasError} handleRepeate={handleRepeate} autoRepeateAfter={7} />) || 
        (
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                <form className="catalog-search-form form-inline">
                    <input className="form-control" placeholder="Поиск" />
                </form>
                <Categories />
                {
                    items
                        .reduce((rows, key, index) => (index % 3 == 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, [])
                        .map((row, index) => {
                            return (
                                <div key={index} className="row">
                                    {
                                        row.map((item) => {
                                            const {id, title, images, price} = item;
                                            return (
                                                <div key={id} className="col-4">
                                                    <div className="card">
                                                        <img src={images[0]} className="card-img-top img-fluid" alt={title} />
                                                        <div className="card-body">
                                                            <p className="card-text">{title}</p>
                                                            <p className="card-text"><Numeric value={price} format={'0,0[.]00 $'} /></p>
                                                            
                                                        </div>
                                                        <div className="card-footer text-muted">
                                                            <Link to={`/catalog/${id}`} className="btn btn-outline-primary">Заказать</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            );
                        }) 
                }
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
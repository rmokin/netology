import React from "react";
import Preloader from './Preloader';
import Error from './Error';



export default function Section(props){

  const {template, className, children} = props;

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setError] = React.useState(null);
  const [hadTemlate, setTemplate] = React.useState(null);

  React.useEffect( () => {
    if (template && typeof(template) == 'string'){
      setIsLoading(true);
      setTemplate(template);
      setIsLoading(false);
    }
    if (template && typeof(template) == 'function'){
      setIsLoading(true);
      setTemplate(template());
      setIsLoading(false);
    }
    if (template instanceof Promise){
      
      setIsLoading(true);
      template
        .then(({default: html}) => {
          setTemplate(html);
        })
        .catch( ({message}) => {
          setError(`Can't load template. Error: ${message}`);
        })
        .finally( () => {
          setIsLoading(false);
        });
    }
  }, [template]);
  return( 
    (isLoading && <Preloader />) || 
    (hasError && <Error message={hasError} />) ||
    (hadTemlate && <section className={className} dangerouslySetInnerHTML={{__html:hadTemlate}}></section>) ||
    (!hadTemlate && <section className={className}>{children}</section>)
  );
}

/*
export default class Section extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      module: null
    };
  }
 
  // after the initial render, wait for module to load
  componentDidMount() {
    const { resolve } = this.props;
    import('../html/test.html').then((result) => {debugger;});
    
    //const test = 'test.html';
    //resolve.then((data) => {debugger;});
    //import html from `${test}`;
    //const { default: module } = await resolve();
    //const { default: module } = await async () => {import 'sdf'; };
    //this.setState({ module });
  }

  render() {
    debugger;
    const { module } = this.state;
    return (
      <div>fsdf</div>
    );
    //if (!module) return <div>Loading module...</div>;
    //if (module.view) return React.createElement(module.view);

  }
}
*/
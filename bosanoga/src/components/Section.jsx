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


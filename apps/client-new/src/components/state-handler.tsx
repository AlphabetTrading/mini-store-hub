import React from "react";

type Props = {
  loading: boolean;
  error: any;
  empty: boolean;
  children: React.ReactNode;
};

const StateHandler = (props: Props) => {
  if (props.loading) {
    return <div>Loading...</div>;
  }
  if(props.error){
    return <div>Error</div>;
  }
  if(props.empty){
    return <div>Empty</div>;
  }
  return <>{props.children}</>;
};

export default StateHandler;

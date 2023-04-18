import React from 'react'
import { useRouteError } from 'react-router-dom';

type Props = {}

const ErrorPage = (props: Props) => {
    const error: unknown | any = useRouteError();
    console.error(error);
  return (
    <div>erorr{error?.message}</div>
  )
}

export default ErrorPage;
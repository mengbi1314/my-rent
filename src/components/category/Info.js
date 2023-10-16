import React from 'react';

const Info = () => {

    const [searchParams] = React.Router.useSearchParams();

    console.log(searchParams.get('id'))

    const [id, setID] = React.useState(searchParams.get('id'));

    console.log(id);

    return (
        <>

        </>
    )
}

export default Info;
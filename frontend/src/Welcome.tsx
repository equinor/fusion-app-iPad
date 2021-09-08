import { FC } from 'react';
import { Button } from '@equinor/fusion-components'


const Welcome: FC = () => {
    return (
        <div>
            <Button relativeUrl='/order'> Order </Button>
            <Button relativeUrl='/support'> Support </Button>
            <Button relativeUrl='/return'> Return </Button>
        </div>
    );
}

export default Welcome;

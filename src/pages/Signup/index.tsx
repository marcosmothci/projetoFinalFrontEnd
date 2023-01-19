import React from 'react';
import { ContainerForm } from '../../components/ContainerForm';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperContent';

function Signup() {
    return (
        <WrapperContent>
            <ContainerForm>
                <Form mode='signup'/>
            </ContainerForm>
        </WrapperContent>
    )
}

export { Signup }
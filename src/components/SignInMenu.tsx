import React, { ReactElement } from 'react';
import { combine } from '../utils/combine';
import { signInWithGoogle } from '../actions/signInWithGoogle';
import { SignInWithGoogleButton } from './SignInWithGoogleButton';

interface IProps {
    onClose: () => void;
}

export const SignInMenu = ({ onClose }: IProps): ReactElement => (
    <SignInWithGoogleButton onClick={combine(onClose, () => signInWithGoogle())} />
);

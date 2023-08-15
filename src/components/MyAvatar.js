import React from 'react';
// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();
  return (
    <MAvatar
      src={user.photoURL}
      alt={user.fullName}
      color={user.photoURL ? 'default' : createAvatar(user.fullName).color}
      {...other}
    >
      {createAvatar(user.fullName).name}
    </MAvatar>
  );
}

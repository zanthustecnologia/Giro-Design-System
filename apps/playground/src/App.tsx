import Button from '../../../packages/components-react/src/Button';
import Avatar from '../../../packages/components-react/src/Avatar';
import { Icon } from '../../../packages/icons/src/Icon';
import { UsbStick20Regular } from '@fluentui/react-icons';
import { useState } from 'react';
import './App.css';

function App() {

  return (
    <>
      <Button >teste</Button>
      <Avatar icon={<UsbStick20Regular />} size='large'/>
    </>
  )
}

export default App

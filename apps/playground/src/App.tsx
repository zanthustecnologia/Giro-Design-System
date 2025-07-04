import { UsbStick20Regular } from '@fluentui/react-icons';
import Avatar from '../../../packages/components-react/src/Avatar';
import Button from '../../../packages/components-react/src/Button';
import './App.css';

function App() {

  return (
    <div className="App">
      <Button >teste</Button>
      <Avatar icon={<UsbStick20Regular />} size='large'/>
    </div>
  )
}

export default App

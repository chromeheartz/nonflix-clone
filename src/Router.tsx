import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRouterProps {
  // function이 어떻게 생겼는지 명시해주어야한다
  // argument를 받지않고 return값이 없다는뜻.
  // toggleDark : () => void;
  // isDark : boolean;
}
function Router({ } : IRouterProps) {
  return <BrowserRouter>
    <Switch>
      <Route path="/:coinUrl">
        <Coin />
      </Route>
      <Route path="/">
        <Coins />
      </Route>
    </Switch>
  </BrowserRouter>
}

export default Router;
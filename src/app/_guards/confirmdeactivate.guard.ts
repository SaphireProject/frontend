import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {GameComponent} from '../game/game.component';
import {Observable} from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export class ConfirmDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {

  canDeactivate(component: ComponentCanDeactivate, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState: RouterStateSnapshot) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

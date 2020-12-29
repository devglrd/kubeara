import {animate, style, transition, trigger} from '@angular/animations';

export default trigger('fade', [
  transition('void => *', [ // void <=> *
    animate(300, style({opacity: 0}))
  ])
]);

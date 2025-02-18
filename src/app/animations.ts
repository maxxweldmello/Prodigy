import { trigger, transition, style, animate } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('HomePage <=> ProductsPage', [
    style({ position: 'relative' }),
    animate('600ms ease-out', style({ transform: 'translateX(0)' })),
  ]),
  transition('AboutPage <=> ContactPage', [
    style({ position: 'relative' }),
    animate('800ms ease-in-out', style({ opacity: 1 })),
  ])
]);


//DO ON 18 12 2024
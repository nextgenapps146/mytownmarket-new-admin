import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomePageModule)
    },
    {
        path: 'location',
        loadChildren: () =>
            import('./location/location.module').then((m) => m.LocationPageModule),
    },
    {
        path: 'sign-in',
        loadChildren: () =>
            import('./sign-in/sign-in.module').then((m) => m.SignInPageModule)
    },
    {
        path: 'sign-up',
        loadChildren: () =>
            import('./sign-up/sign-up.module').then((m) => m.SignUpPageModule)
    },
    {
        path: 'verification',
        loadChildren: () =>
            import('./verification/verification.module').then(
                (m) => m.VerificationPageModule
            ),
        canActivate: [AuthGuardService],
    },
    {
        path: 'shop',
        loadChildren: () =>
            import('./shop/shop.module').then((m) => m.ShopPageModule),
        canActivate: [AuthGuardService],
    },
    {
        path: 'leader/:id',
        loadChildren: () =>
            import('./leader/leader.module').then((m) => m.LeaderPageModule),
        canActivate: [AuthGuardService],
    },
    {
        path: 'party/:id',
        loadChildren: () =>
            import('./party/party.module').then((m) => m.PartyPageModule),
        canActivate: [AuthGuardService],
    },
    {
        path: 'scheme/:id',
        loadChildren: () =>
            import('./scheme/scheme.module').then((m) => m.SchemePageModule),
        canActivate: [AuthGuardService],
    },
    {
        path: 'reviews',
        loadChildren: () =>
            import('./reviews/reviews.module').then((m) => m.ReviewsPageModule),
        canActivate: [AuthGuardService],
    },
    {
        path: 'my-profile',
        loadChildren: () =>
            import('./my-profile/my-profile.module').then(
                (m) => m.MyProfilePageModule
            )
    },
    {
        path: 'title',
        loadChildren: () =>
            import('./title/title.module').then((m) => m.TitlePageModule),
        canActivate: [AuthGuardService],
    },
    {
        path: 'add-review',
        loadChildren: () =>
            import('./add-review/add-review.module').then(
                (m) => m.AddReviewPageModule
            ),
        canActivate: [AuthGuardService],
    },
    {
        path: 'about-us',
        loadChildren: () =>
            import('./about-us/about-us.module').then((m) => m.AboutUsPageModule),
        canActivate: [AuthGuardService],
    },
    {
        path: 'contact-us',
        loadChildren: () =>
            import('./contact-us/contact-us.module').then(
                (m) => m.ContactUsPageModule
            ),
        canActivate: [AuthGuardService],
    },
    {
        path: 'filter',
        loadChildren: () =>
            import('./filter/filter.module').then((m) => m.FilterPageModule),
        canActivate: [AuthGuardService],
    },
    {
        path: 'notifications',
        loadChildren: () =>
            import('./notifications/notifications.module').then(
                (m) => m.NotificationsPageModule
            ),
    },
    {
        path: 'faq',
        loadChildren: () => import('./faq/faq.module').then(m => m.FaqPageModule)
    },
    {
        path: 'terms',
        loadChildren: () => import('./terms/terms.module').then(m => m.TermsPageModule)
    },
    {
        path: 'list',
        loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
    },
    {
        path: 'add-location',
        loadChildren: () => import('./add-location/add-location.module').then(m => m.AddLocationPageModule)
    },
    {
        path: 'scheme',
        loadChildren: () => import('./scheme/scheme.module').then(m => m.SchemePageModule)
    },
  {
    path: 'requested-locations',
    loadChildren: () => import('./requested-locations/requested-locations.module').then( m => m.RequestedLocationsPageModule)
  },
  {
    path: 'add-leader',
    loadChildren: () => import('./add-leader/add-leader.module').then( m => m.AddLeaderPageModule)
  },
  {
    path: 'add-store',
    loadChildren: () => import('./add-store/add-store.module').then( m => m.AddStorePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'my-store',
    loadChildren: () => import('./my-store/my-store.module').then( m => m.MyStorePageModule),
    canActivate: [AuthGuardService]
 
},
  {
    path: 'add-promotion',
    loadChildren: () => import('./add-promotion/add-promotion.module').then( m => m.AddPromotionPageModule)
  },
  {
    path: 'deals',
    loadChildren: () => import('./deals/deals.module').then( m => m.DealsPageModule)
},
  {
    path: 'search-promotion',
    loadChildren: () => import('./search-promotion/search-promotion.module').then( m => m.SearchPromotionPageModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./stores/stores.module').then( m => m.StoresPageModule)
  },  {
    path: 'add-locality',
    loadChildren: () => import('./add-locality/add-locality.module').then( m => m.AddLocalityPageModule)
  },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { LoginComponent } from './views/login/login.component';
import { OtpVerificationComponent } from './views/otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { ProfileComponent } from './views/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'otp-verification/:hashValue',
    component: OtpVerificationComponent
  },
  {
    path: 'reset-password/:hashValue',
    component: ResetPasswordComponent
  },


  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },

    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'upload-document',
        loadChildren: () => import('./views/upload-documents/upload-documents.module').then(m => m.UploadDocumentsModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'album',
        loadChildren: () => import('./views/albums/albums.module').then(m => m.AlbumsModule),
        canActivate: [AuthGuardService]
      },
       {
        path: 'albums-category',
        loadChildren: () => import('./views/albums-category/albums-category.module').then(m => m.AlbumsCategoryModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'song',
        loadChildren: () => import('./views/songs/songs.module').then(m => m.SongsModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'songs-category',
        loadChildren: () => import('./views/songs-category/songs-category.module').then(m => m.SongsCategoryModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'podcast',
        loadChildren: () => import('./views/podcast/podcast.module').then(m => m.PodcastModule),
        canActivate: [AuthGuardService]
      },
      {

        path: 'podcast-category',
        loadChildren: () => import('./views/podcast-category/podcast-category.module').then(m => m.PodcastCategoryModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'artist',
        loadChildren: () => import('./views/artist/artist.module').then(m => m.ArtistModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'country',
        loadChildren: () => import('./views/country/country.module').then(m => m.CountryModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'playlist',
        loadChildren: () => import('./views/playlist/playlist.module').then(m => m.PlaylistModule),
        canActivate: [AuthGuardService]
      }
     
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

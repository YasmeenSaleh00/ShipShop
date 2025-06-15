import { Routes } from '@angular/router';
import { CategoryComponent } from './Components/category/category.component';
import { AdminPortalComponent } from './Components/admin-portal/admin-portal.component';
import { CategoryFormComponent } from './Components/category-form/category-form.component';
import { BrandComponent } from './Components/brand/brand.component';
import { BrandFormComponent } from './Components/brand-form/brand-form.component';
import { RolesComponent } from './Components/roles/roles.component';
import { RoleFormComponent } from './Components/role-form/role-form.component';
import { UserComponent } from './Components/user/user.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { EditUserPasswordComponent } from './Components/edit-user-password/edit-user-password.component';
import { CustomerTableComponent } from './Components/customer-table/customer-table.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { LoginComponent } from './Components/login/login.component';
import { SingupComponent } from './Components/singup/singup.component';
import { ProductTableComponent } from './Components/product-table/product-table.component';
import { ProductFormComponent } from './Components/product-form/product-form.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { PrivacyandpolicyComponent } from './Components/privacyandpolicy/privacyandpolicy.component';
import { TermsAndConditionComponent } from './Components/terms-and-condition/terms-and-condition.component';
import { FaqsComponent } from './Components/faqs/faqs.component';
import { MyaccountComponent } from './Components/myaccount/myaccount.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { CartComponent } from './Components/cart/cart.component';
import { AuthGuard } from './AuthGuard';
import { HomeComponent } from './Components/home/home.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { OrderFormComponent } from './Components/order-form/order-form.component';
import { OrderTableComponent } from './Components/order-table/order-table.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { EditOrderComponent } from './Components/edit-order/edit-order.component';
import { BrandPageComponent } from './Components/brand-page/brand-page.component';
import { SubcategoryTableComponent } from './Components/subcategory-table/subcategory-table.component';
import { SubcategoryFormComponent } from './Components/subcategory-form/subcategory-form.component';
import { SubcategoryPageComponent } from './Components/subcategory-page/subcategory-page.component';
import { CategoryCardComponent } from './Components/category-card/category-card.component';
import { ForgotPasswordFormComponent } from './Components/forgot-password-form/forgot-password-form.component';
import { ProductCardDeatilsComponent } from './Components/product-card-deatils/product-card-deatils.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TestimonialTableComponent } from './Components/testimonial-table/testimonial-table.component';
import { TestimonialFormComponent } from './Components/testimonial-form/testimonial-form.component';
import { MessagesTableComponent } from './Components/messages-table/messages-table.component';

export const routes: Routes = [
{path:'',component:HomeComponent,pathMatch:'full'},
{ path:'home',component:HomeComponent  },
{path:'category',component:CategoryComponent,canActivate:[AuthGuard]},
{path:'category/add' , component:CategoryFormComponent,canActivate:[AuthGuard]},
{path:'category/edit/:id' , component:CategoryFormComponent,canActivate:[AuthGuard]},
{path:'brand',component:BrandComponent,canActivate:[AuthGuard]},
{path:'brands/add',component:BrandFormComponent,canActivate:[AuthGuard]},
{path:'brands/edit/:id',component:BrandFormComponent,canActivate:[AuthGuard]},
{path:'role',component:RolesComponent,canActivate:[AuthGuard]},
{path:'role/add',component:RoleFormComponent,canActivate:[AuthGuard]},
{path:'role/edit/:id',component:RoleFormComponent,canActivate:[AuthGuard]},
{path:'user',component:UserComponent,canActivate:[AuthGuard]},
{path:'user/add',component:AddUserComponent,canActivate:[AuthGuard]},
{path:'user/edit/:id',component:EditUserPasswordComponent,canActivate:[AuthGuard]},
{path:'customer',component:CustomerTableComponent,canActivate:[AuthGuard]},
{path:'admin',component:AdminPortalComponent,canActivate:[AuthGuard]},
{path:'login',component:LoginComponent},
{path:'singup',component:SingupComponent},
{path:'aboutus',component:AboutUsComponent},
{path:'product',component:ProductTableComponent},
{path:'product/add',component:ProductFormComponent,canActivate:[AuthGuard]},
{path:'product/edit/:id',component:ProductFormComponent,canActivate:[AuthGuard]},
{path:'contactus',component:ContactusComponent},
{path:'privacy',component:PrivacyandpolicyComponent},
{path:'terms',component:TermsAndConditionComponent},
{path:'faqs',component:FaqsComponent},
{path:'account',component:MyaccountComponent},
{path:'wishlist',component:WishlistComponent,canActivate:[AuthGuard]},
{path:'cart',component:CartComponent,canActivate:[AuthGuard]},
{path:'product-card',component:ProductCardComponent},
{path:'product-card-details/:id',component:ProductCardDeatilsComponent},
{path:'product-card/product/:categoryName',component:ProductCardComponent},
{path:'product-card/brand/:brandName',component:ProductCardComponent},
{path:'order-form',component:OrderFormComponent,canActivate:[AuthGuard]},
{path:'order-table',component:OrderTableComponent,canActivate:[AuthGuard]},
{path:'order-details/:id',component:OrderDetailsComponent,canActivate:[AuthGuard]},
{path: 'edit-order/:orderId/:lookupTypeId',component:EditOrderComponent,canActivate:[AuthGuard]},
{path:'brand-page',component:BrandPageComponent},
{path:'subcategory',component:SubcategoryTableComponent},
{path:'subcategory/add',component:SubcategoryFormComponent},
{path:'subcategory/edit/:id',component:SubcategoryFormComponent},
{path:'subcategory-page/:id',component:SubcategoryPageComponent},
{path:'category-page',component:CategoryCardComponent},
{path:'forgot-password',component:ForgotPasswordFormComponent},
{path:'dashboard',component:DashboardComponent},
{path:'testimonial-table',component:TestimonialTableComponent},
{path:'testimonial-form',component:TestimonialFormComponent},

{path:'message-table',component:MessagesTableComponent}

];

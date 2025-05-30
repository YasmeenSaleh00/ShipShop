import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./Services/auth.service";

export const AuthGuard:CanActivateFn=()=>{
    //عملنا حقن ل service
    const authService = inject(AuthService);
    const router = inject(Router);
//نشييك اذا فيه token
    if(authService.getToken()){
        return true;
    }
    else{
        router.navigate(['/login']);
        return false;
    }
}
import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  // debugger;
  const token =localStorage.getItem('mytoken');
  console.log(token);
  const clonereq = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
      
    
  })


  // console.log()
  return next(clonereq);
};

export function alphaOnly(event: any) {
    const key = event.charCode;
    if(key>= 48 && key <= 58) event.preventDefault();
}

export function numOnly(event: any) {
  const key = event.charCode;
  if(key<48 || key>58 ) event.preventDefault();
}

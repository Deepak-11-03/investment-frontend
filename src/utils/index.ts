export function alphaOnly(event: any) {
    const key = event.charCode;
    if(key>= 48 && key <= 58) event.preventDefault();
}

export function numOnly(event: any) {
  const key = event.charCode;
  if(key<48 || key>58 ) event.preventDefault();
}

export function getTitleCase(val: string) {
    return val.slice(0,1).toUpperCase()+val.slice(1)
}
export function getAmountType(val: string,type:string) {
  return type === 'credit' ? `+${val}` : `-${val}`
}

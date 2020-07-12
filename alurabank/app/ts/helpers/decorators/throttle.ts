export function throttle(milisegundos: number = 500){

    //target:  instancia do metodo no qual o decorator foi colocado 
    // propertykey: nome do método onde o decorator foi colocado
    // descriptor: sabe tudo sobre o meotod colocadom sobrescrita e etc
    return function(target: any, propertyKey: string, descriptor:PropertyDescriptor){
        
        const metodoOriginal = descriptor.value;

        let timer = 0;
        descriptor.value = function(...args: any[]){
            
            if(event) event.preventDefault();
            
            clearTimeout(timer);
            timer = setTimeout(() =>{
                metodoOriginal.apply(this,args);        
            },milisegundos)

        }

        return descriptor;
    }
}
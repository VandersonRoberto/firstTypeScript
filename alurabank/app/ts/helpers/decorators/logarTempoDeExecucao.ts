export function logarTempoDeExecucao(emSegundos: boolean = false){

    //target:  instancia do metodo no qual o decorator foi colocado 
    // propertykey: nome do método onde o decorator foi colocado
    // descriptor: sabe tudo sobre o meotod colocadom sobrescrita e etc
    return function(target: any, propertyKey: string, descriptor:PropertyDescriptor){
        
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]){
            
            let unidade = 'ms';
            let divisor = 1;

            if(emSegundos){
                unidade = 's';
                divisor = 1000;
            }

            console.log('-------------');
            console.log(`parâmetros recebidos pelo metodo passado ${propertyKey} : ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this,args);
            const t2 = performance.now();
            console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`O método ${propertyKey} demorou ${(t2-t1) / divisor} ${unidade}`);
            return retorno;
        }

        return descriptor;
    }
}
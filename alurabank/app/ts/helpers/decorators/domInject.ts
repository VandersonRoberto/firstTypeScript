export function domInject(seletor: string) {

    //target objeto no qual tem a propriedade onde ta o decorator
    //key propriedade onde foi colocado o decorator
    return function (target: any, key: string) {

        let elemento: JQuery;

        const getter = function () {

            if (!elemento) {
                console.log(`buscando ${seletor} para injetar em ${key}`);
                elemento = $(seletor);
            }

            return elemento;

        }

        Object.defineProperty(target, key, {
            get: getter
        });
    }
}
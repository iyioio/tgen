import { TGenCallback, TGenPipeline } from "./tgen-types";

export const executeTGenPipelineAsync=async ({
    context,
    readers,
    parsers,
    generators,
    writers,
}:TGenPipeline):Promise<void>=>{

    const log=context.log;

    const runPluginsAsync=async (type:keyof TGenPipeline,ary:TGenCallback[])=>{
        log(`Execute ${type}, count = ${ary.length}`);
        for(let i=0;i<ary.length;i++){
            const c=ary[i];
            log(`${i+1} of ${ary.length}`)
            await c(context);
        }
    }

    await runPluginsAsync('readers',readers);
    await runPluginsAsync('parsers',parsers);
    await runPluginsAsync('generators',generators);
    await runPluginsAsync('writers',writers);

}

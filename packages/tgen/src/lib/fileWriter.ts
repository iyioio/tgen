import { writeFile } from "fs/promises";
import { TGenContext } from "./tgen-types";
import { protoReg } from "./utils";

export const fileWriter=async ({
    log,
    outputArgs,
    outputs,
}:TGenContext)=>{

    for(const _dest of outputArgs){
        const proto=protoReg.exec(_dest);
        if(proto && proto[1]?.toLowerCase()!=='file'){
            continue;
        }
        const dest=proto?_dest.substring("file://".length):_dest;
        log(`fileWriter - dest ${dest}`);

        for(const output of outputs){
            const name=output.name??_dest;

            log(`fileWriter - dest ${dest}, name ${name}`);
            await writeFile(name,output.content);
        }

    }
}

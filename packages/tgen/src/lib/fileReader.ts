import { readFile } from "fs/promises";
import { TGenContext } from "./tgen-types";
import { getFileExt, protoReg } from "./utils";

export const fileReader=async ({
    log,
    inputArgs,
    sources
}:TGenContext)=>{
    for(const _input of inputArgs){
        const proto=protoReg.exec(_input);
        if(proto && proto[1]?.toLowerCase()!=='file'){
            continue;
        }
        const input=proto?_input.substring("file://".length):_input;
        log(`fileReader - read ${input}`);

        const content=(await readFile(input)).toString();

        log(`${input} length - ${content.length}`);

        sources.push({
            input,
            ext:getFileExt(input,false),
            content,
        })

    }
}

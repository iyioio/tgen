import { parseCsv } from "./csv";
import { parseNodeLine } from "./node-utils";
import { TGenContext } from "./tgen-types";

const shapeKey='Shape Library';
const entityShape='Entity Relationship';
const typeKey='Text Area 1';
const propPrefix='Text Area ';

export const lucidCsvParser=async ({
    sources,
    log,
    nodes
}:TGenContext)=>{


    for(const source of sources){

        if(source.ext!=='csv' && source.contentType!=='text/css'){
            continue;
        }

        const csv=parseCsv(source.content);

        log(`lucidCsvParser parse source - ${source.input}`);

        for(const row of csv){

            if(row[shapeKey]!==entityShape){
                continue;
            }

            const type=row[typeKey];
            if(!type || type.startsWith('#')){
                continue;
            }
            const typeNode=parseNodeLine(type,0,false)[0];
            nodes.push(typeNode);
            log('typeNode',typeNode);
            if(!typeNode.children){
                typeNode.children=[];
            }


            for(const e in row){
                if(!e.startsWith(propPrefix) || e===typeKey){
                    continue;
                }
                const propLine=row[e];
                if(!propLine || propLine.startsWith('#')){
                    continue;
                }
                for(const propNode of parseNodeLine(row[e],1,true)){
                    log('propNode',propNode);
                    typeNode.children.push(propNode)
                }
            }


        }

    }
}

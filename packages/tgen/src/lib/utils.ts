export const getFileExt=(path:string,includeDot:boolean):string|undefined=>{
    const di=path.lastIndexOf('.');
    const si=Math.max(path.lastIndexOf('/'),path.lastIndexOf('\\'));
    if(di===-1 || si>di){
        return undefined;
    }
    return path.substring(di+(includeDot?0:1)).toLowerCase();
}

export const protoReg=/^(w+):\/\//;

export interface TGenAttribute
{
    name:string;
    value:string;
    props:{[name:string]:string};
}

export interface TGenTypeInfo
{
    type:string;
    isArray:boolean;
}

export interface TGenNode extends TGenTypeInfo{
    name:string;

    /**
     * The reference or secondary type of the node. The second type in types.
     */
    refType?:TGenTypeInfo;

    optional:boolean;

    /**
     * All types the node implements
     */
    types:TGenTypeInfo[];

    comment?:string;

    attributes:{[name:string]:TGenAttribute};

    children?:TGenNode[];
}

export interface TGenOutput
{
    name?:string;
    ext:string;
    content:string;
}

export interface TGenSource
{
    input?:string;
    ext?:string;
    contentType?:string;
    content:string;
}

export interface TGenContext
{
    /**
     * Args passed from the command line
     */
    args:{[name:string]:string[]};
    inputArgs:string[];
    outputArgs:string[];
    sources:TGenSource[];
    nodes:TGenNode[];
    outputs:TGenOutput[];
    verbose:boolean;
    tab:string;
    log:(...values:any[])=>void;
}

export type TGenCallback=(ctx:TGenContext)=>Promise<void>|void;

/**
 * Reads sources in to the context.
 */
export type TGenReader=TGenCallback;

/**
 * Parses the sources of the context and adds parsed nodes to the context.
 */
export type TGenParser=TGenCallback;

/**
 * Generates outputs from the nodes of the given context.
 */
export type TGenGenerator=TGenCallback;

/**
 * Writes the outputs of the context.
 */
export type TGenWriter=TGenCallback;

export interface TGenPipeline
{
    context:TGenContext;
    readers:TGenReader[];
    parsers:TGenParser[];
    generators:TGenGenerator[];
    writers:TGenWriter[];
    plugins:{[name:string]:TGenCallback};
}

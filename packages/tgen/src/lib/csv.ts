export const parseCsv=(content:string):{[col:string]:string}[]=>{
    const rows:{[col:string]:string}[]=[];

    const lines=content.trim().split('\n');

    const head=splitCsvLine(lines[0]??'').map(h=>h.trim())??[];
    for(let i=1;i<lines.length;i++){
        const line=splitCsvLine(lines[i]);
        if(!line[0]){
            continue;
        }
        const row:{[col:string]:string}={}
        rows.push(row);
        for(let c=0;c<line.length;c++){
            const col=head[c]??'_'+i;
            row[col]=line[c];
        }
        for(const h of head){
            if(!row[h]){
                row[h]='';
            }
        }
    }

    return rows;
}

const splitCsvLine=(line:string):string[]=>{
    const row:string[]=[];

    let i=0;
    let value='';
    let firstChar=true;
    let inEscape=false;
    for(;i<line.length;i++){
        const ch=line.charAt(i);

        if(firstChar){
            inEscape=ch==='"';
            firstChar=false;
            if(inEscape){
                continue;
            }
        }

        if(inEscape){
            if(ch==='"'){
                if(line.charAt(i+1)==='"'){
                    value+='"';
                    i++
                }else{
                    inEscape=false;
                }
            }else{
                value+=ch;
            }
        }else if(ch===','){
            row.push(value.trim());
            value='';
            firstChar=true;
        }else{
            value+=ch;
        }

    }

    row.push(value.trim());

    return row;
}

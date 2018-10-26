class MLSQLTreeNodeBuilder {
    /**
     *
     * Usage:
     *
     * convert flat array to tree structure
     *
     * input data：
     * [{"id":1,"icon":null,"label":null,"parentId":0},
     * {"id":2,"icon":"document","label":"jack","parentId":0},
     * {"id":3,"icon":"document","label":"dafe","parentId":0}
     * ]
     *
     * output:
     *
     * @param {[{id:number,icon:string,label:string,parentId:number,childNodes:[]}]} list
     */
    build = (list) => {
        const ROOT = {"id": 0, "icon": "folder-close", "label": "scripts", "parentId": 0}
        let tempMap = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            tempMap[list[i].id] = i;
            list[i].childNodes = [];
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parentId !== 0) {
                list[tempMap[node.parentId]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        roots.push(ROOT)
        return roots;
    }


}

export default MLSQLTreeNodeBuilder
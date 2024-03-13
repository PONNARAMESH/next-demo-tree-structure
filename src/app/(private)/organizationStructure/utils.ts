export interface IRawOrganizationInfo {
    name: string;
    relationWithCompany: {
        name: string;
        value: string;
    };
    belongsTo: {
        name: string;
        value: string;
        level: number;
    },
    percentage: string;
    signatory: string | null;
    accountServing: {
        name: string;
        value: string;
    }[];
    id: number;
};

function getProperty(json: IRawOrganizationInfo, path: string) {
    let tokens = path.split(".");
    let data: any = json;
    for (let token of tokens) {
        data = data[token];
    }
    return data;
};

export function prepareJsonForNestedRelation(items: IRawOrganizationInfo[] | [], id: string, link = 'belongsTo.name'): any {
    if(!items || !Array.isArray(items) || !items.length) return [];
    return items
        .filter(item => {
            const val: any = getProperty(item, link);
            return val === id;
        })
        .map((item, index) => {
            return {
                name: item.name,
                attributes: item,
                children: prepareJsonForNestedRelation(items, item.name)
            }
        });
};

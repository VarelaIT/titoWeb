export class PRESETS_STORAGE {
    static get(storageName: string): IStoragePreset[] | undefined {
        if (typeof window === "undefined") return undefined;
        const json = localStorage.getItem(storageName);
        if (!json) return undefined;
        try {
            const parsed = JSON.parse(json);
            return Array.isArray(parsed) ? parsed as IStoragePreset[] : undefined;
        } catch {
            return undefined;
        }
    }

    static save(storageName: string, storageObject: IStoragePreset[]){
        if (typeof window === "undefined") return;
        localStorage.setItem(storageName, JSON.stringify(storageObject));
    }

    static find(storageName: string, key:string): unknown{
        const presetList = this.get(storageName);
        if(presetList)
            return presetList.find((preset)=> preset.key === key)?.value;
        else
            return undefined;
    }

    static insert(storageName: string, key:string, value: unknown): boolean{
        const preset: IStoragePreset = {
            key: key,
            value: value,
        };
        let presetList: IStoragePreset[] | undefined = PRESETS_STORAGE.get(storageName);
        if(presetList){
            //compare name
            const foundPreset = presetList.find((preset)=> preset.key === key);
            if(foundPreset){
                //prompt if you want to overwrite
                console.warn("overwriting preset...");
                //overright
                foundPreset.value = value;
            }else{
                presetList.push(preset);
            }
        }else{
            presetList = [preset];
        }

        this.save(storageName, presetList);
        return true;
    }

    static remove(storageName: string, key:string): boolean{
        let storage = this.get(storageName);
        if(storage){
            storage = storage.filter((preset)=> preset.key !== key);
            this.save(storageName, storage);
            return true;
        }
        return false;
    }

    static list(storageName: string){
        return this.get(storageName);
    }

    static clear(storageName: string){
        localStorage.removeItem(storageName);
    }
}

export interface IStoragePreset {
    key: string;
    value: unknown;
}

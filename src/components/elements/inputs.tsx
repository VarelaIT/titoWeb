import type { ChangeEventHandler } from "react";
import type { IBaseInput } from "../../scripts/types";

export interface IInputProps extends IBaseInput{
    className?: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
}

export function Input(props: IInputProps) {
    const baseStyle = getStyles();

    function getStyles(){
        const result = "p-2 rounded-md w-full "
            + "text-stone-800 dark:text-stone-400 "
            + "border-2 border-stone-800 dark:border-stone-400 "
        ;

        return result;
    }

    return (
        <input 
            type="text"
            className={baseStyle + props.className}
            inputMode={props.inputMode} 
            placeholder={props.placeHolder} 
            required={props.required} 
            pattern={props.pattern} 
            disabled={props.disable}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

export function CheckBox(props: IInputProps) {

    return (
        <input 
            type="checkbox"
            inputMode={props.inputMode} 
            placeholder={props.placeHolder} 
            required={props.required} 
            pattern={props.pattern} 
            disabled={props.disable}
            value={props.value}
            onChange={props.onChange}
        />
    );
}